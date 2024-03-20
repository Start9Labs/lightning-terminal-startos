import { sdk } from '../../sdk'

/**
 * ======================== Dependencies ========================
 *
 * Here we determine our package dependencies.
 *
 * This function runs on install, update, and config save.
 */
export const setDependencies = sdk.setupDependencies(
  async ({ effects, input }) => {
    return {
      lnd: sdk.Dependency.of({
        type: 'running',
        versionSpec: '>=0.13.4 <0.17.0',
        url: '',
        healthChecks: ['grpc'],
      }),
    }
  },
)
