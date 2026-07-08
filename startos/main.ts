import { manifest as lndManifest } from 'lnd-startos/startos/manifest'
import { gRPCHostId, gRPCPort } from 'lnd-startos/startos/interfaces'
import { litConfig } from './fileModels/lit.conf'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { bridgeAddress, litDir, lndMount, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Lightning Terminal...'))

  // LND's gRPC endpoint reached over the LXC bridge. This resolves null until
  // LND's gRPC binding first appears at wallet unlock (one healing restart),
  // then stays stable across lock/unlock cycles — the binding entry and its
  // assigned port survive a disable. While it is null we leave
  // remote.lnd.rpcserver unwritten rather than seed a fabricated address; litd
  // retries and its health check stays red until the const() heal writes the
  // real address. litd pins the mounted tls.cert, whose SANs cover LND's bridge IP.
  const rpcserver = await bridgeAddress(effects, {
    packageId: 'lnd',
    hostId: gRPCHostId,
    internalPort: gRPCPort,
  }).const()

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

  return sdk.Daemons.of(effects).addDaemon('lit', {
    subcontainer: sdk.SubContainer.of(
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
    ),
    exec: { command: ['/bin/litd'] },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
