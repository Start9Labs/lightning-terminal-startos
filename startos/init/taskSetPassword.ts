import { resetPassword } from '../actions/resetPassword'
import { litConfig } from '../fileModels/lit.conf'
import { sdk } from '../sdk'
import { configDefaults } from '../utils'

export const taskSetPassword = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await sdk.action.createOwnTask(effects, resetPassword, 'critical', {
      reason: 'Create your LiT admin password',
    })
  }
})
