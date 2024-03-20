import { setInterfaces } from './interfaces'
import { sdk } from '../sdk'
import { migrations } from './migrations'
import { utils } from '@start9labs/start-sdk'
import { randomPassword } from '../utils'

const install = sdk.setupInstall(async ({ effects }) => {
  // generate random password
  const password = utils.getDefaultString(randomPassword)
  // Save password to store
  await sdk.store.setOwn(effects, '/password', password)
})

const uninstall = sdk.setupUninstall(async ({ effects }) => {})

const exportedValues = sdk.setupExports(({ effects }) => {
  return {
    ui: {
      'Password': {
        type: 'string',
        path: '/password',
        copyable: true,
        qr: false,
        masked: true,
      }
    },
    services: []
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
