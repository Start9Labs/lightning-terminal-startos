import { setupManifest } from '@start9labs/start-sdk'
import { depLndDescription, depLndTitle, long, short } from './i18n'

export const manifest = setupManifest({
  id: 'lightning-terminal',
  title: 'Lightning Terminal',
  license: 'mit',
  packageRepo:
    'https://github.com/Start9Labs/lightning-terminal-startos/tree/update/040',
  upstreamRepo: 'https://github.com/lightninglabs/lightning-terminal',
  marketingUrl: 'https://lightning.engineering/',
  donationUrl: null,
  docsUrls: [
    'https://docs.lightning.engineering/lightning-network-tools/lightning-terminal',
  ],
  description: { short, long },
  volumes: ['main'],
  images: {
    'lightning-terminal': {
      source: {
        dockerTag: 'lightninglabs/lightning-terminal:v0.16.1-alpha',
      },
      arch: ['aarch64', 'x86_64'],
    },
  },
  dependencies: {
    lnd: {
      description: depLndDescription,
      optional: false,
      metadata: {
        title: depLndTitle,
        icon: 'https://raw.githubusercontent.com/Start9Labs/lnd-startos/6a24e93761aa9046d427d0e62021defcaf9b47f3/icon.svg',
      },
    },
  },
})
