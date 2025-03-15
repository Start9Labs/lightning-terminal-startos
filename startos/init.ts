import { setInterfaces } from './interfaces'
import { exposedStore } from './store'
import { sdk } from './sdk'
import { versions } from './versions'
import { actions } from './actions'
import { setDependencies } from './dependencies'
import { litConfig } from './file-models/lit.conf'
import { configDefaults } from './utils'
import { resetPassword } from './actions/resetPassword'

const install = sdk.setupInstall(async ({ effects }) => {
  await litConfig.write(effects, configDefaults)

  await sdk.action.requestOwn(effects, resetPassword, 'critical')
})

const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  install,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  exposedStore,
)
