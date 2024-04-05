import { sdk } from '../sdk'
import { randomPassword } from '../utils'

const { Config, Value } = sdk

const input = Config.of({
  password: Value.text({
    name: 'New Password',
    required: {
      default: randomPassword,
    },
    generate: randomPassword,
    masked: true,
  }),
})

export const resetPassword = sdk.createDynamicAction(
  'resetPassword',
  async ({ effects }) => {
    return {
      name: 'Reset Password',
      description: 'Resets your password to the one provided',
      warning: null,
      disabled: false,
      input,
      allowedStatuses: 'onlyStopped',
      group: null,
    }
  },
  async ({ effects, input }) => {
    const password = input.password

    // Save password to store
    await sdk.store.setOwn(effects, sdk.StorePath.password, password)

    return {
      message: 'Password successfully updated.',
      value: {
        value: password,
        copyable: true,
        qr: false,
      },
    }
  },
  input,
)
