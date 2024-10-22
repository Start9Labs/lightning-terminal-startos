import { litConfig } from '../file-models/lit.conf'
import { sdk } from '../sdk'

export const viewPassword = sdk.Action.withoutInput(
  // id
  'view-password',

  // metadata
  async ({ effects }) => ({
    name: 'View Password',
    description:
      'Use this password to access your Lightning Terminal user interface',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // the execution function
  async ({ effects }) => ({
    version: '1',
    title: 'Password',
    message: 'Below is your Lightning Terminal password.',
    result: {
      type: 'single',
      value: (await litConfig.read.const(effects))!.uipassword,
      copyable: true,
      qr: false,
      masked: true,
    },
  }),
)
