import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'lightning-terminal',
  title: 'Lightning Terminal',
  license: 'mit',
  packageRepo: 'https://github.com/Start9Labs/lightning-terminal-startos',
  upstreamRepo: 'https://github.com/lightninglabs/lightning-terminal',
  marketingUrl: 'https://lightning.engineering/',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    'lightning-terminal': {
      source: {
        dockerTag: 'lightninglabs/lightning-terminal:v0.17.6',
      },
      arch: ['aarch64', 'x86_64'],
      emulateMissing: false,
    },
  },
})
