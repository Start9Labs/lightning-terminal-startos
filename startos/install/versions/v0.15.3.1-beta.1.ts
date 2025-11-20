import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v0_15_3_1_beta1 = VersionInfo.of({
  version: '0.15.3-alpha:1-beta.1',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
