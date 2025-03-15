import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { readFile, rmdir } from 'fs/promises'
import { load } from 'js-yaml'
import { litConfig } from '../file-models/lit.conf'
import { configDefaults } from '../utils'

export const v0_13_3_0 = VersionInfo.of({
  version: '0.13.3:0',
  releaseNotes: 'Revamped for StartOS 0.3.6',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml = load(
        await readFile('/root/start9/config.yaml', 'utf-8'),
      ) as { password: string }

      await litConfig.merge(effects, {
        ...configDefaults,
        uipassword: configYaml.password,
      })

      // remove old start9 dir
      await rmdir('/root/start9')
    },
    down: IMPOSSIBLE,
  },
})
