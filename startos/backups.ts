import { sdk } from './sdk'

export const { createBackup, restoreBackup } = sdk.setupBackups(
  sdk.Backups.volumes('main').setOptions({
    exclude: ['.lnd'], // @TODO is this necessary?
  }),
)
