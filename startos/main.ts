import { manifest as lndManifest } from 'lnd-startos/startos/manifest'
import { gRPCHostId, gRPCInterfaceId } from 'lnd-startos/startos/interfaces'
import { litConfig } from './fileModels/lit.conf'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { litDir, lndMount, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Lightning Terminal...'))

  // LND's gRPC endpoint reached over the LXC bridge (replaces `lnd.startos:10009`).
  // litd connects with the mounted tls.cert, whose SANs cover LND's bridge IP.
  const rpcserver = await sdk.host
    .get(effects, { hostId: gRPCHostId, packageId: 'lnd' }, (host) => {
      const iface =
        host &&
        Object.values(host.bindings)
          .flatMap((b) => Object.values(b.interfaces))
          .find((i) => i.id === gRPCInterfaceId)
      const h = iface?.addressInfo
        .filter({
          kind: 'bridge',
          predicate: (hn) => hn.ssl && hn.metadata.kind === 'ipv4',
        })
        .hostnames[0]
      return h && `${h.hostname}:${h.port}`
    })
    .const()
  if (!rpcserver) {
    throw new Error(
      i18n('LND is not yet reachable on the internal network. Please wait for it to finish starting.'),
    )
  }
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
