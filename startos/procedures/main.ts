import { sdk } from '../sdk'
import { ExpectedExports } from '@start9labs/start-sdk/lib/types'
import { HealthReceipt } from '@start9labs/start-sdk/lib/health/HealthReceipt'
import { Daemons } from '@start9labs/start-sdk/lib/mainFn/Daemons'
import { uiPort } from './interfaces'
import { litDir } from '../utils'
import { dependencyMounts } from './dependencies/dependencyMounts'
import { litConfig } from './config/file-models/lit.conf'
import { getDefaultString } from '@start9labs/start-sdk/lib/util/getDefaultString'
import { randomPassword } from '../utils'

export const main: ExpectedExports.main = sdk.setupMain(
  async ({ effects, utils, started }) => {
    /**
     * ======================== Setup ========================
     *
     * In this section, you will fetch any resources or run any commands necessary to run the service
     */
    console.info('Starting Lightning Terminal...')
    const lndMountPoint = await utils.mountDependencies(
      dependencyMounts.lnd.main.rootDir,
    )
    const config = (await litConfig.read(effects))!
    config.remote.lnd.rpcserver = 'lnd.embassy:10009'
    config.remote.lnd.macaroonpath = `${lndMountPoint}/admin.macaroon`
    config.remote.lnd.tlscertpath = `${lndMountPoint}/tls.cert`
    const macaroonHeader = `Grpc-Metadata-macaroon: $(xxd -ps -u -c 1000 ${config.remote.lnd.macaroonpath})`
    const lndCommand: [string, ...string[]] = [
      'curl',
      '-s',
      '-X',
      'GET',
      '--cacert',
      `${lndMountPoint}/tls.cert`,
      '--header',
      `${macaroonHeader}`,
      'https://lnd.embassy:10009/v1/getinfo',
    ]
    const lndHealthCheck = sdk.healthCheck.runHealthScript(
      effects,
      lndCommand.join(' '),
      {
        timeout: 10000,
        errorMessage: 'LND is not ready',
      },
    )
    await lndHealthCheck // Wait for LND to be ready
    await litConfig.write(config, effects)

    /**
     * ======================== Additional Health Checks (optional) ========================
     *
     * In this section, you will define *additional* health checks beyond those associated with daemons
     */

    const healthReceipts: HealthReceipt[] = []

    /**
     * ======================== Daemons ========================
     *
     * In this section, you will create one or more daemons that define the service runtime
     *
     * Each daemon defines its own health check, which can optionally be exposed to the user
     */

    // generate random password
    const password = getDefaultString(randomPassword)
    // Save password to vault	  // Save password to vault
    await utils.store.setOwn('/password', password)

    return Daemons.of({
      effects,
      started,
      healthReceipts, // Provide the healthReceipts or [] to prove they were at least considered
    }).addDaemon('webui', {
      command: [
        '/bin/litd',
        `--uipassword=${password}`,
        `--macaroonpath=${litDir}/mainnet/lit.macaroon`,
        `--lit-dir=${litDir}`,
        `--tlscertpath=${litDir}/tls.cert`,
        `--tlskeypath=${litDir}/tls.key`,
        `--insecure-httplisten=lightning-terminal.embassy:${uiPort}`,
      ], // The command to start the daemon
      ready: {
        // If display is null, it will not be displayed to the user in the UI
        display: 'Web Interface',
        // The function to run to determine the health status of the daemon
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: 'The web interface is ready',
            errorMessage: 'The web interface is not ready',
          }),
      },
      requires: [],
    })
  },
)
