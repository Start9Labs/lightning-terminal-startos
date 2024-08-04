import { VersionRange } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const setDependencies = sdk.setupDependencies(
  async ({ effects, input }) => {
    return {
      lnd: sdk.Dependency.of({
        type: 'running',
        versionRange: VersionRange.parse('>=0.17.0 <0.19.0'),
        registryUrl: '',
        healthChecks: ['grpc'],
      }),
    }
  },
)
