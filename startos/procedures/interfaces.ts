import { sdk } from '../sdk'
import { configSpec } from './config/spec'

export const uiPort = 8443

/**
 * ======================== Interfaces ========================
 */
export const setInterfaces = sdk.setupInterfaces(
  configSpec,
  async ({ effects, input }) => {
    const multi = sdk.host.multi(effects, 'multi')
    const multiOrigin = await multi.bindPort(uiPort, { protocol: 'http' })
    const ui = sdk.createInterface(effects, {
      name: 'Web UI',
      id: 'webui',
      description: 'Web user interface for Lightning Terminal',
      hasPrimary: false,
      disabled: false,
      type: 'ui',
      schemeOverride: null,
      masked: false,
      username: null,
      path: '',
      search: {},
    })

    const multiReceipt = await multiOrigin.export([ui])

    return [multiReceipt]
  },
)
