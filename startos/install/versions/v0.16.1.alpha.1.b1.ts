import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { litConfig } from '../../fileModels/lit.conf'

export const v_0_16_1_alpha_1_b1 = VersionInfo.of({
  version: '0.16.1-alpha:1-beta.1',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml:
        | {
            password: string
          }
        | undefined = await readFile(
        '/media/startos/volumes/main/start9/config.yaml',
        'utf-8',
      ).then(YAML.parse, () => undefined)

      if (configYaml) {
        await litConfig.merge(effects, {
          uipassword: configYaml.password,
        })

        // remove old start9 dir
        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        })
      }
    },
    down: IMPOSSIBLE,
  },
})
