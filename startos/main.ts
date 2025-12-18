import { resetPassword } from './actions/resetPassword'
import { litConfig } from './fileModels/lit.conf'
import { sdk } from './sdk'
import { uiPort, lndMount, litDir } from './utils'
import { T } from '@start9labs/start-sdk'
import { manifest as lndManifest } from 'lnd-startos/startos/manifest'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup ========================
   */
  console.info('Starting Lightning Terminal...')

  const depResult = await sdk.checkDependencies(effects)
  depResult.throwIfNotSatisfied()

  const password = await litConfig.read((e) => e.uipassword).const(effects)
  console.log('password', password)

  if (!password || password === 'null') {
    await sdk.action.createOwnTask(effects, resetPassword, 'critical', {
      reason: 'Create your LiT admin password',
    })
  }

  /**
   * ======================== Daemons ========================
   */
  return sdk.Daemons.of(effects).addDaemon('primary', {
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
      display: 'Web Interface',
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: 'The web interface is ready',
          errorMessage: 'The web interface is not ready',
        }),
    },
    requires: [],
  })
})
