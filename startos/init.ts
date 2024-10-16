import { setInterfaces } from './interfaces'
import { exposedStore } from './store'
import { sdk } from './sdk'
import { versions } from './versions'
import { actions } from './actions'
import { utils } from '@start9labs/start-sdk'
import { randomPassword } from './utils'
import { setDependencies } from './dependencies/dependencies'
import { defaultConfig, litConfig } from './file-models/lit.conf'

const install = sdk.setupInstall(async ({ effects }) => {
  // Create lit.conf with random password
  await litConfig.write({
    ...defaultConfig,
    uipassword: utils.getDefaultString(randomPassword),
  })
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
