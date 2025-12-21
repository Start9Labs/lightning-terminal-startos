import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { litConfig } from '../../fileModels/lit.conf'
import { configDefaults } from '../../utils'
import { load } from 'js-yaml'

export const v0_16_0_1_beta_1 = VersionInfo.of({
  version: '0.16.0-alpha:1-beta.1',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      const oldConfigFile = await readFile(
        '/media/startos/volumes/main/start9/config.yaml',
        'utf-8',
      )

      if (oldConfigFile) {
        const uipassword = (
          load(oldConfigFile) as {
            password: string
          }
        ).password

        await litConfig.write(effects, {
          ...configDefaults,
          uipassword,
        })
      }

      // remove old start9 dir
      await rm('/media/startos/volumes/main/start9', {
        recursive: true,
      }).catch(console.log)
    },
    down: IMPOSSIBLE,
  },
})
