import { setInterfaces } from './interfaces'
import { sdk } from './sdk'
import { versions } from './versions'
import { actions } from './actions'
import { setDependencies } from './dependencies'
import { litConfig } from './file-models/lit.conf'
import { configDefaults } from './utils'
import { resetPassword } from './actions/resetPassword'

const preInstall = sdk.setupPreInstall(async ({ effects }) => {
  await litConfig.write(effects, configDefaults)
})

const postInstall = sdk.setupPostInstall(async ({ effects }) => {
  await sdk.action.requestOwn(effects, resetPassword, 'critical')
})

const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  preInstall,
  postInstall,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
)
