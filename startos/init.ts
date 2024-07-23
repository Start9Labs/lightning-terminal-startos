import { setInterfaces } from './interfaces'
import { exposedStore } from './store'
import { sdk } from './sdk'
import { migrations } from './migrations'
import { utils } from '@start9labs/start-sdk'
import { randomPassword } from './utils'
import { setDependencies } from './dependencies/dependencies'
import { defaultConfig, litConfig } from './file-models/lit.conf'

const install = sdk.setupInstall(async ({ effects }) => {
  // generate random password
  const password = utils.getDefaultString(randomPassword)
  // Save password to store
  await sdk.store.setOwn(effects, sdk.StorePath.password, password)

  // Set default LiT config values for LND
  await litConfig.write(defaultConfig, effects)
})

const uninstall = sdk.setupUninstall(async ({ effects }) => {})

export const { init, uninit } = sdk.setupInit(
  migrations,
  install,
  uninstall,
  setInterfaces,
  setDependencies,
  exposedStore,
)
