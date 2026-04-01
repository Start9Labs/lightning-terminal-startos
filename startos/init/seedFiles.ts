import { litConfig } from '../fileModels/lit.conf'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await litConfig.merge(effects, {})
})
