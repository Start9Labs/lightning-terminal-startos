import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { litConfig } from '../../fileModels/lit.conf'
import { configDefaults } from '../../utils'
import { load } from 'js-yaml'

export const v0_15_2_1_alpha_0 = VersionInfo.of({
  version: '0.15.2-alpha:1-alpha.0',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      const oldConfigFile = await readFile(
        '/media/startos/volumes/main/start9/config.yaml',
        'utf-8',
      ).catch(console.error)

      await litConfig.write(effects, configDefaults)

      if (oldConfigFile) {
        const uipassword = (
          load(oldConfigFile) as {
            password: string
          }
        ).password
        await litConfig.merge(effects, {
          uipassword: uipassword,
        })
      }

      // remove old start9 dir
      await rm('/media/startos/volumes/main/start9', { recursive: true }).catch(
        console.error,
      )
    },
    down: IMPOSSIBLE,
  },
})
