import { sdk } from './sdk'

export const properties = sdk.setupProperties(async ({ effects }) => {
  const store = await sdk.store.getOwn(effects, sdk.StorePath).once()

  return {
    'UI Password': {
      type: 'string',
      value: store.password,
      copyable: true,
      qr: false,
      masked: true,
    },
  }
})
