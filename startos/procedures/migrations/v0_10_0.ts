import { sdk } from '../../sdk'

/**
 * This is an example migration file
 *
 * By convention, each version service requiring a migration receives its own file
 *
 * The resulting migration (e.g. v0_10_0) is exported, then imported into migrations/index.ts
 */
export const v0_10_0 = sdk.Migration.of({
  version: '0.10.0',
  up: async ({ effects, utils }) => await effects.setConfigured(false),
  down: async ({ effects, utils }) => {},
})