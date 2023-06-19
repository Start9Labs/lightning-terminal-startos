import { setInterfaces } from './interfaces'
import { sdk } from '../sdk'
import { migrations } from './migrations'
import { getDefaultString } from '@start9labs/start-sdk/lib/util/getDefaultString'
import { randomPassword } from '../utils'

const install = sdk.setupInstall(async ({ effects, utils }) => {
  // generate random password
  const password = getDefaultString(randomPassword)
  // Save password to vault
  await utils.store.setOwn('/password', password)
})

const uninstall = sdk.setupUninstall(async ({ effects, utils }) => {})

const exportedValues = sdk.setupExports(({ effects, utils }) => {
  return {
    ui: [
      {
        title: 'Password',
        path: '/password',
      },
    ],
    services: [],
  }
})

/**
 * This is a static function. There is no need to make changes here
 */
export const { init, uninit } = sdk.setupInit(
  migrations,
  install,
  uninstall,
  setInterfaces,
  exportedValues,
)
