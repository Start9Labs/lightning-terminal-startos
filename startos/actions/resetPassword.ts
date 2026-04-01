import { utils } from '@start9labs/start-sdk'
import { litConfig } from '../fileModels/lit.conf'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const resetPassword = sdk.Action.withoutInput(
  // id
  'reset-password',

  // metadata
  async ({ effects }) => {
    const hasPass =
      (await litConfig.read((c) => c.uipassword).const(effects)) !== 'null'

    return {
      name: hasPass ? i18n('Reset Password') : i18n('Create Password'),
      description: hasPass
        ? i18n('Reset your user interface password')
        : i18n('Create your user interface password'),
      warning: null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const uipassword = utils.getDefaultString({
      charset: 'a-z,A-Z,1-9,!,@,$,%,&,*',
      len: 22,
    })

    await litConfig.merge(effects, { uipassword })

    return {
      version: '1',
      title: i18n('Success'),
      message: i18n('Your new password is below'),
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
