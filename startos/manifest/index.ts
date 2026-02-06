import { setupManifest } from '@start9labs/start-sdk'
import { short, long, depLndTitle } from './i18n'

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
  description: { short, long },
  volumes: ['main'],
  images: {
    'lightning-terminal': {
      source: {
        dockerTag: 'lightninglabs/lightning-terminal:v0.16.0-alpha',
      },
      arch: ['aarch64', 'x86_64'],
      emulateMissingAs: 'aarch64'
    },
  },
  dependencies: {
    lnd: {
      description: 'Needed to communicate with the Lightning Network',
      optional: false,
      metadata: {
        title: depLndTitle,
        icon: 'https://github.com/Start9Labs/lnd-startos/blob/master/icon.png?raw=true',
      },
    },
  },
})
