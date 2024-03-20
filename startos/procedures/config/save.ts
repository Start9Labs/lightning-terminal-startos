import { sdk } from '../../sdk'
import { setInterfaces } from '../interfaces'

import { configSpec } from './spec'

export const save = sdk.setupConfigSave(
  configSpec,
  async ({ effects, input, dependencies }) => {
    const dependenciesReceipt = await effects.setDependencies({dependencies:[]})

    return {
      interfacesReceipt: await setInterfaces({ effects, input }),
      dependenciesReceipt,
      restart: true,
    }
  },
)
