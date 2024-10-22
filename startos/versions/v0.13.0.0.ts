import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { readFile, rmdir } from 'fs/promises'
import { load } from 'js-yaml'
import { defaultConfig, litConfig } from '../file-models/lit.conf'

export const v0_13_3 = VersionInfo.of({
  version: '0.13.3:0',
  releaseNotes: 'Revamped for StartOS 0.3.6',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml = load(
        await readFile('/root/start9/config.yaml', 'utf-8'),
      ) as { password: string }

      // Create lit.conf with existing password
      await litConfig.write({
        ...defaultConfig,
        uipassword: configYaml.password,
      })

      // remove old start9 dir
      await rmdir('/root/start9')
    },
    down: IMPOSSIBLE,
  },
})
