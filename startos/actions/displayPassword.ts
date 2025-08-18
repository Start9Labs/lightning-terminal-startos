import { sdk } from '../sdk'
import { litConfig } from '../fileModels/lit.conf'

export const displayPassword = sdk.Action.withoutInput(
  // id
  'display-password',

  // metadata
  async ({ effects }) => {
    const password = (await litConfig.read((c) => c.uipassword).const(effects))

    return {
      name: 'Display Password',
      description: 'Display UI password for Lightning Terminal',
      warning: null,
      allowedStatuses: 'any',
      group: null,
      visibility: password && password !== 'null'
        ? 'enabled'
        : { disabled: 'A password must be set before it can be displayed!' },
    }
  },

  // the execution function
  async ({ effects }) => {
    const uipassword = (await litConfig.read((e) => e.uipassword).once())!

    return {
      version: '1',
      title: 'Success',
      message: 'Your password is below',
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
