import { manifest as lndManifest } from 'lnd-startos/startos/manifest'
import { litConfig } from './fileModels/lit.conf'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { litDir, lndMount, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Lightning Terminal...'))
  // Restart litd whenever lit.conf changes so config edits take effect (litd reads it only at startup).
  await litConfig.read().const(effects)
  return sdk.Daemons.of(effects).addDaemon('lit', {
    subcontainer: await sdk.SubContainer.of(
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
