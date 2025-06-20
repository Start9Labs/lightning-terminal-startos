import {
  VersionInfo,
  IMPOSSIBLE,
  FileHelper,
  matches,
} from '@start9labs/start-sdk'
import { rm } from 'fs/promises'
import { litConfig } from '../../fileModels/lit.conf'
import { configDefaults } from '../../utils'

export const v0_15_0_1 = VersionInfo.of({
  version: '0.15.0:1',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // get old password if exists
      const uipassword = await FileHelper.yaml(
        {
          volumeId: 'main',
          subpath: '/media/startos/volumes/main/start9/config.yaml',
        },
        matches.object({ password: matches.string.optional() }),
      )
        .read((c) => c.password)
        .once()

      await litConfig.write(effects, configDefaults)

      if (uipassword) {
        await litConfig.merge(effects, {
          uipassword,
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
