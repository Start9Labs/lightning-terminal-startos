import { VersionGraph } from '@start9labs/start-sdk'
import { v_0_16_1_alpha_2 } from './v0.16.1.alpha.2'
import { v_0_16_1_alpha_3 } from './v0.16.1.alpha.3'

export const versionGraph = VersionGraph.of({
  current: v_0_16_1_alpha_3,
  other: [v_0_16_1_alpha_2],
})
