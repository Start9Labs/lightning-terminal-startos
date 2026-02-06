import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { litConfig } from '../fileModels/lit.conf'
import { configDefaults } from '../utils'
import { sdk } from '../sdk'
import { resetPassword } from '../actions/resetPassword'
import { i18n } from '../i18n'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await litConfig.write(effects, configDefaults)
    await sdk.action.createOwnTask(effects, resetPassword, 'critical', {
      reason: i18n('Create your LiT admin password'),
    })
  },
})
