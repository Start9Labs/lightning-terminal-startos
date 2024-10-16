import { viewPassword } from './viewPassword'
import { resetPassword } from './resetPassword'
import { sdk } from '../sdk'

export const actions = sdk.Actions.of()
  .addAction(viewPassword)
  .addAction(resetPassword)
