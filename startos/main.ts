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
  // assigned port survive a disable. Until it appears litd dials the loopback
  // placeholder and retries; connection-refused is harmless. litd pins the
  // mounted tls.cert, whose SANs cover LND's bridge IP.
  const rpcserver =
    (await bridgeAddress(effects, {
      packageId: 'lnd',
      hostId: gRPCHostId,
      internalPort: gRPCPort,
    }).const()) ?? `127.0.0.1:${gRPCPort}`

  await litConfig.merge(
    effects,
    { 'remote.lnd.rpcserver': rpcserver },
    { allowWriteAfterConst: true },
  )

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
