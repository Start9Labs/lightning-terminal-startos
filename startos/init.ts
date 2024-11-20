import { setInterfaces } from './interfaces'
import { exposedStore } from './store'
import { sdk } from './sdk'
import { versions } from './versions'
import { actions } from './actions'
import { setDependencies } from './dependencies'
import { litConfig } from './file-models/lit.conf'

const install = sdk.setupInstall(async ({ effects }) => {
  // create lit.conf using defaults provided in file model
  await litConfig.merge({})
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
