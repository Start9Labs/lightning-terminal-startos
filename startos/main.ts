import { manifest as lndManifest } from 'lnd-startos/startos/manifest'
import { gRPCHostId, gRPCPort } from 'lnd-startos/startos/interfaces'
import { litConfig } from './fileModels/lit.conf'
import { checkLit } from './healthCheck'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { litDir, lndMount } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Lightning Terminal...'))

  // LND's gRPC endpoint reached over the LXC bridge. This resolves null until
  // LND's gRPC binding first appears at wallet unlock (one healing restart),
  // then stays stable across lock/unlock cycles — the binding entry and its
  // assigned port survive a disable. While it is null we leave
  // remote.lnd.rpcserver unwritten rather than seed a fabricated address, and
  // the health check reports `waiting` on that same null. litd pins the mounted
  // tls.cert, whose SANs cover LND's bridge IP.
  const rpcserver = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'lnd',
      hostId: gRPCHostId,
      internalPort: gRPCPort,
    })
    .const()

  if (rpcserver) {
    await litConfig.merge(
      effects,
      { 'remote.lnd.rpcserver': rpcserver },
      { allowWriteAfterConst: true },
    )
  }

  // Restart litd whenever lit.conf changes so config edits take effect (litd reads it only at
  // startup). Registered after the rpcserver merge above so main's own write doesn't self-trigger.
  await litConfig.read().const(effects)

  const litSub = sdk.SubContainer.of(
    effects,
    { imageId: 'lightning-terminal' },
    sdk.Mounts.of()
      .mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: litDir,
        readonly: false,
      })
      .mountDependency<typeof lndManifest>({
        dependencyId: 'lnd',
        volumeId: 'main',
        subpath: null,
        mountpoint: lndMount,
        readonly: true,
      }),
    'lit-sub',
  )

  // Exceeds SIGTERM escalation (30s) plus the max restart backoff (30s).
  const KILL_COOLDOWN_MS = 90_000
  let lastKillAt = 0
  let sigtermSent = false

  return sdk.Daemons.of(effects).addDaemon('lit', {
    subcontainer: litSub,
    exec: { command: ['/bin/litd'] },
    ready: {
      display: i18n('Web Interface'),
      // Also litd's watchdog: a parked litd never exits, so nothing else
      // restarts it.
      fn: async () => {
        // setHealth spreads its result into the RPC; strip internal fields.
        const { parked, ...health } = await checkLit(rpcserver)
        if (!parked) {
          sigtermSent = false
        } else if (Date.now() - lastKillAt >= KILL_COOLDOWN_MS) {
          lastKillAt = Date.now()
          console.warn(
            i18n(
              'Restarting litd — it parked after a fatal error and cannot recover on its own',
            ),
          )
          // A parked litd is blocked on exactly its SIGTERM shutdown path.
          const kill = sigtermSent
            ? ['sh', '-c', 'kill -9 $(pidof litd)']
            : ['sh', '-c', 'kill $(pidof litd)']
          sigtermSent = true
          const res = await litSub.exec(kill, undefined, 10_000).catch((e) => {
            console.error(e)
            return null
          })
          // exec reports failure via exitCode rather than throwing.
          if (res && res.exitCode !== 0)
            console.error(
              `watchdog ${kill.join(' ')} exited ${String(res.exitCode)}: ${res.stderr.toString()}`,
            )
        }
        return health
      },
    },
    requires: [],
  })
})
