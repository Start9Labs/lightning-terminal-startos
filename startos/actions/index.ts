import { sdk } from '../sdk'
import { resetPassword } from './resetPassword'
import { subServers } from './subServers'

export const actions = sdk.Actions.of()
  .addAction(resetPassword)
  .addAction(subServers)
