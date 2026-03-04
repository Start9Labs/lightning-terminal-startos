import { resetPassword } from '../actions/resetPassword'
import { litConfig } from '../fileModels/lit.conf'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const taskSetPassword = sdk.setupOnInit(async (effects) => {
  if (!(await litConfig.read((e) => e.uipassword).const(effects))) {
    await sdk.action.createOwnTask(effects, resetPassword, 'critical', {
      reason: i18n('Create your LiT admin password'),
    })
  }
})
