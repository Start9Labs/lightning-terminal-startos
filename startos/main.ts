import { sdk } from './sdk'
import { uiPort, lndMount } from './utils'
import { T } from '@start9labs/start-sdk'
import { manifest as lndManifest } from 'lnd-startos/startos/manifest'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup ========================
   */
  console.info('Starting Lightning Terminal...')

  const depResult = await sdk.checkDependencies(effects)
  depResult.throwIfNotSatisfied()

  /**
   * ======================== Additional Health Checks (optional) ========================
   */
  const healthReceipts: T.HealthCheck[] = []

  /**
   * ======================== Daemons ========================
   */
  return sdk.Daemons.of(effects, started, healthReceipts).addDaemon('primary', {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'lightning-terminal' },
      sdk.Mounts.of()
        .mountVolume({
          volumeId: 'main',
          subpath: null,
          mountpoint: '/data',
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
    command: ['/bin/litd'],
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
