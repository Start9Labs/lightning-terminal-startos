import { sdk } from '../sdk'

export const setDependencies = sdk.setupDependencies(
  async ({ effects, input }) => {
    return {
      lnd: sdk.Dependency.of({
        type: 'running',
        versionSpec: sdk.Checker.parse('>=0.13.4 <0.17.0'),
        registryUrl: '',
        healthChecks: ['grpc'],
      }),
    }
  },
)
