import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  lnd: {
    kind: 'running',
    versionRange: '>=0.19.2-beta:1-beta.1',
    healthChecks: [],
  },
}))
