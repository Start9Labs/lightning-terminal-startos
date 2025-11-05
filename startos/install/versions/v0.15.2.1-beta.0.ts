import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v0_15_2_1_beta0 = VersionInfo.of({
  version: '0.15.2-alpha:1-beta.0',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
