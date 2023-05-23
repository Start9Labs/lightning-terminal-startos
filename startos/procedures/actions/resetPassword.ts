import { sdk } from '../../sdk'
import { randomPassword } from '../../utils'

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

export const resetPassword = sdk.createAction(
  {
    name: 'Reset Password',
    description: 'Resets your password to the one provided',
    id: 'resetPassword',
    input,
    allowedStatuses: 'only-stopped',
  },
  async ({ effects, utils, input }) => {
    const password = input.password

    // Save password to vault
    await utils.vault.set('password', password)

    return {
      message: 'Password changed successfully and saved to your Vault.',
      value: {
        value: password,
        copyable: true,
        qr: false,
      },
    }
  },
)