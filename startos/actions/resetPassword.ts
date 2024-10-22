import { utils } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { randomPassword } from '../utils'
import { litConfig } from '../file-models/lit.conf'

export const resetPassword = sdk.Action.withoutInput(
  // id
  'reset-password',

  // metadata
  async ({ effects }) => ({
    name: 'Reset password',
    description: 'Reset your user interface password',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // the execution function
  async ({ effects }) => {
    const password = utils.getDefaultString(randomPassword)

    await litConfig.merge({ uipassword: password })

    return {
      version: '1',
      title: 'Success',
      message: 'Your new password is below',
      result: {
        type: 'single',
        value: password,
        masked: true,
        copyable: true,
        qr: false,
      },
    }
  },
)
