import { litConfig } from '../fileModels/lit.conf'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  await litConfig.merge(effects, {})
})
