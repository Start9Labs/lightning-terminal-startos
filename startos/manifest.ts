import { setupManifest } from '@start9labs/start-sdk'
import { SDKImageInputSpec } from '@start9labs/start-sdk/base/lib/types/ManifestTypes'

const BUILD = process.env.BUILD || ''

const architectures =
  BUILD === 'x86_64' || BUILD === 'aarch64' ? [BUILD] : ['x86_64', 'aarch64']

export const manifest = setupManifest({
  id: 'lightning-terminal',
  title: 'Lightning Terminal',
  license: 'mit',
  wrapperRepo: 'https://github.com/Start9Labs/lightning-terminal-wrapper',
  upstreamRepo: 'https://github.com/lightninglabs/lightning-terminal',
  supportSite: 'https://github.com/lightninglabs/lightning-terminal/issues',
  marketingSite: 'https://lightning.engineering/',
  donationUrl: 'https://donate.start9.com/',
  docsUrl:
    'https://github.com/Start9Labs/lightning-terminal-startos/blob/update/040/instructions.md',
  description: {
    short: 'Your home for Lightning liquidity',
    long: "A browser-based interface for managing channel liquidity on your self-hosted LND node. Visualize your channels and balances, perform submarine swaps via the Lightning Loop service, classify channels according to your node's operating mode, use Pool to earn sats by opening channels to those needing inbound liquidity.",
  },
  volumes: ['main'],
  images: {
    'lightning-terminal': {
      source: {
        dockerTag: 'lightninglabs/lightning-terminal:v0.15.2-alpha',
      },
      arch: architectures,
    } as SDKImageInputSpec,
  },
  hardwareRequirements: {
    arch: architectures,
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {
    lnd: {
      description: 'Needed to communicate with the Lightning Network',
      optional: false,
      s9pk: 'https://github.com/Start9Labs/lnd-startos/releases/download/v0.19.2-beta.1-beta.1/lnd.s9pk',
    },
  },
})
