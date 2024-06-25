import { sdk } from './sdk'
import { uiPort } from './interfaces'
import { litDir } from './utils'
import { T } from '@start9labs/start-sdk'
import { litConfig } from './file-models/lit.conf'
import { manifest as lndManifest } from 'lnd-startos/startos/manifest'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup ========================
   */
  console.info('Starting Lightning Terminal...')

  const depResult = sdk.checkAllDependencies(effects)
  await depResult.throwIfNotValid()

  const lndMountPoint = '/lnd'

  const config = (await litConfig.read(effects))!
  config.remote.lnd.rpcserver = 'lnd.embassy:10009'
  config.remote.lnd.macaroonpath = `${lndMountPoint}/admin.macaroon`
  config.remote.lnd.tlscertpath = `${lndMountPoint}/tls.cert`
  await litConfig.merge(config, effects)

  /**
   * ======================== Additional Health Checks (optional) ========================
   */
  const healthReceipts: T.HealthReceipt[] = []

  /**
   * ======================== Daemons ========================
   */
  const password = sdk.store.getOwn(effects, sdk.StorePath.password)

  return sdk.Daemons.of({
    effects,
    started,
    healthReceipts,
  }).addDaemon('primary', {
    image: { id: 'main' },
    command: [
      '/bin/litd',
      `--uipassword=${password}`,
      `--macaroonpath=${litDir}/mainnet/lit.macaroon`,
      `--lit-dir=${litDir}`,
      `--tlscertpath=${litDir}/tls.cert`,
      `--tlskeypath=${litDir}/tls.key`,
      `--insecure-httplisten=lightning-terminal.embassy:${uiPort}`,
    ],
    mounts: sdk.Mounts.of()
      .addVolume('main', null, '/data', false)
      .addDependency<typeof lndManifest>(
        'lnd',
        'main',
        null,
        lndMountPoint,
        true,
      ),
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
