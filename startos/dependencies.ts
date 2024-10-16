import { sdk } from './sdk'
import { VersionRange } from '@start9labs/start-sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  return {
    lnd: sdk.Dependency.of({
      type: 'running',
      versionRange: VersionRange.parse('>=0.17.1 <0.19.0'),
      healthChecks: [],
    }),
  }
})
