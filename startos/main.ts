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

  // Watchdog cooldown: past a slow litd shutdown (sigterm escalation, 30s)
  // plus the supervisor's max restart backoff (30s) plus start slack, and far
  // beyond checkLit's 5s status staleness — one park event gets one signal,
  // and a check that raced the restart can never shoot the replacement
  // process. Failing states are polled at 1s, so the latch, not the trigger,
  // is what bounds the kill rate.
  const KILL_COOLDOWN_MS = 90_000
  let lastKillAt = 0
  let sigtermSent = false

  return sdk.Daemons.of(effects).addDaemon('lit', {
    subcontainer: litSub,
    exec: { command: ['/bin/litd'] },
    ready: {
      display: i18n('Web Interface'),
      // Doubles as litd's watchdog: litd never exits once `g.start()` has
      // failed (see PARKED_PREFIX in healthCheck.ts), and the supervisor only
      // heals a process that exits — so on the parked state, stop litd and
      // let the restart loop bring it back. A fresh litd re-enters its LND
      // wait and reconnects once LND answers.
      fn: async () => {
        // `parked` is package-internal — destructured off so it never rides
        // the setHealth RPC to the OS.
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
          // A parked litd is blocked on its own shutdown channel, so SIGTERM
          // is what it is waiting for; still parked a cooldown later means it
          // absorbed the signal, so escalate. pidof, because busybox pkill
          // matches argv rather than comm — `pkill -x litd` can never match a
          // process started as /bin/litd. An empty pidof leaves kill with no
          // args, whose non-zero exit the log below surfaces.
          const kill = sigtermSent
            ? ['sh', '-c', 'kill -9 $(pidof litd)']
            : ['sh', '-c', 'kill $(pidof litd)']
          sigtermSent = true
          const res = await litSub.exec(kill, undefined, 10_000).catch((e) => {
            console.error(e)
            return null
          })
          // exec resolves with the exit code rather than throwing — a missing
          // pkill or an unmatched process must be loud, or the watchdog dies
          // silently.
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
