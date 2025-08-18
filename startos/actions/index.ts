import { sdk } from '../sdk'
import { displayPassword } from './displayPassword'
import { resetPassword } from './resetPassword'

export const actions = sdk.Actions.of()
  .addAction(resetPassword)
  .addAction(displayPassword)
