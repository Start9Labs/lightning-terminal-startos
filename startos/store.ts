import { exposeStore } from '@start9labs/start-sdk'

export type Store = {
  password: string
}

export const exposedStore = exposeStore<Store>([])
