import { litConfig } from '../fileModels/lit.conf'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  loop: Value.toggle({
    name: i18n('Loop'),
    description: i18n(
      'Submarine swaps (Loop In and Loop Out). Turn it off only with no swap in progress: an unfinished swap needs Loop running to complete or to reclaim its funds.',
    ),
    default: true,
  }),
  pool: Value.toggle({
    name: i18n('Pool'),
    description: i18n(
      'The Lightning Pool liquidity marketplace. While it is off, an existing Pool account cannot be managed.',
    ),
    default: true,
  }),
  faraday: Value.toggle({
    name: i18n('Faraday'),
    description: i18n('Channel insights and reports in the web interface.'),
    default: true,
  }),
  taprootAssets: Value.toggle({
    name: i18n('Taproot Assets'),
    description: i18n(
      'Holding and transferring Taproot Assets. Turning it off leaves its data in place.',
    ),
    default: true,
  }),
  autopilot: Value.toggle({
    name: i18n('Autopilot'),
    description: i18n(
      "The Autopilot client, which connects to Lightning Labs' Autopilot server.",
    ),
    default: true,
  }),
})

const mode = (on: boolean): 'integrated' | 'disable' =>
  on ? 'integrated' : 'disable'

export const subServers = sdk.Action.withInput(
  'sub-servers',

  {
    name: i18n('Sub-servers'),
    description: i18n(
      'Turn off the parts of Lightning Terminal you do not use. Saving restarts Lightning Terminal.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },

  inputSpec,

  async ({ effects }) => {
    const c = await litConfig.read().once()
    return {
      loop: c?.['loop-mode'] !== 'disable',
      pool: c?.['pool-mode'] !== 'disable',
      faraday: c?.['faraday-mode'] !== 'disable',
      taprootAssets: c?.['taproot-assets-mode'] !== 'disable',
      autopilot: c?.['autopilot.disable'] !== true,
    }
  },

  async ({ effects, input }) => {
    await litConfig.merge(effects, {
      'loop-mode': mode(input.loop),
      'pool-mode': mode(input.pool),
      'faraday-mode': mode(input.faraday),
      'taproot-assets-mode': mode(input.taprootAssets),
      'autopilot.disable': !input.autopilot,
    })
  },
)
