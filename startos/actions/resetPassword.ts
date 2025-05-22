import { utils } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { randomPassword } from '../utils'
import { litConfig } from '../fileModels/lit.conf'

export const resetPassword = sdk.Action.withoutInput(
  // id
  'reset-password',

  // metadata
  async ({ effects }) => {
    const hasPass = !!(await litConfig.read((c) => c.uipassword).const(effects))
    const desc = 'your user interface password'

    return {
      name: hasPass ? 'Reset Password' : 'Create Password',
      description: hasPass ? `Reset ${desc}` : `Create ${desc}`,
      warning: null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const uipassword = utils.getDefaultString(randomPassword)

    await litConfig.merge(effects, { uipassword })

    return {
      version: '1',
      title: 'Success',
      message: 'Your new password is below',
      result: {
        type: 'single',
        value: uipassword,
        masked: true,
        copyable: true,
        qr: false,
      },
    }
  },
)
