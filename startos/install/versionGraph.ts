import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { litConfig } from '../fileModels/lit.conf'
import { configDefaults } from '../utils'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await litConfig.write(effects, configDefaults)
  },
})
