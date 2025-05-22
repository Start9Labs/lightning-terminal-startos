import { resetPassword } from '../actions/resetPassword'
import { litConfig } from '../fileModels/lit.conf'
import { sdk } from '../sdk'

export const taskSetPassword = sdk.setupOnInit(async (effects, kind) => {
  if (!(await litConfig.read((c) => c.uipassword).const(effects))) {
    await sdk.action.createOwnTask(effects, resetPassword, 'critical', {
      reason: 'Create your LiT admin password',
    })
  }
})
