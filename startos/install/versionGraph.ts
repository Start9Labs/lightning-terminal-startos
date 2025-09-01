import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { litConfig } from '../fileModels/lit.conf'
import { configDefaults } from '../utils'
import { sdk } from '../sdk'
import { resetPassword } from '../actions/resetPassword'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await litConfig.write(effects, configDefaults)
    await sdk.action.createOwnTask(effects, resetPassword, 'critical', {
      reason: 'Create your LiT admin password',
    })
  },
})
