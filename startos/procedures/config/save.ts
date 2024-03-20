import { sdk } from '../../sdk'
import { setDependencies } from '../dependencies/dependencies'
import { setInterfaces } from '../interfaces'
import { configSpec } from './spec'

export const save = sdk.setupConfigSave(
  configSpec,
  async ({ effects, input }) => {
    return {
      interfacesReceipt: await setInterfaces({ effects, input }),
      dependenciesReceipt: await setDependencies({ effects, input }),
      restart: true,
    }
  },
)
