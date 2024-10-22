import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  lnd: {
    kind: 'running',
    versionRange: '>=0.17.1 <0.19.0',
    healthChecks: [],
  },
}))
