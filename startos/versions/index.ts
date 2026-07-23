import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_0_17_0_alpha_2 } from './v0.17.0-alpha_2'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_0_17_0_alpha_2],
})
