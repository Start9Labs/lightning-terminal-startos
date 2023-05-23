import { setupManifest } from '@start9labs/start-sdk/lib/manifest/setupManifest'

export const manifest = setupManifest({
  id: 'lightning-terminal',
  title: 'Lightning Terminal',
  version: '0.10.0',
  releaseNotes: `
        * Update to v0.10.0 [Release Notes](https://github.com/lightninglabs/lightning-terminal/releases/tag/v0.10.0-alpha)
        * Revamped for StartOS 0.4.0 `,
  license: 'mit',
  replaces: Array<string>(
    'Lightning Terminal (hosted)',
    'Amboss',
    'Liquidity Pools',
    'Voltage Flow',
  ),
  wrapperRepo: 'https://github.com/Start9Labs/lightning-terminal-wrapper',
  upstreamRepo: 'https://github.com/lightninglabs/lightning-terminal',
  supportSite: 'https://github.com/lightninglabs/lightning-terminal/issues',
  marketingSite: 'https://lightning.engineering/',
  donationUrl: 'https://donate.start9.com/',
  description: {
    short: 'Your Home for Lightning Liquidity',
    long: "A browser-based interface for managing channel liquidity on your self-hosted LND node, Visualize your channels and balances, Perform submarine swaps via the Lightning Loop service, Classify channels according to your node's operating mode, Run a single binary that integrates loopd, poold and faraday daemons all in one, Access a preview release of the Pool UI, Use Pool to earn sats by opening channels to those needing inbound liquidity.",
  },
  assets: {
    license: 'LICENSE',
    icon: 'assets/icon.png',
    instructions: 'assets/instructions.md',
  },
  volumes: {
    main: 'data',
  },
  containers: {
    main: {
      image: 'main',
      mounts: {
        main: '/data',
        lnd: '/mnt/lnd',
      },
    },
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
      version: '>=0.13.4 <0.17.0',
      description: 'Used to communicate with the Lightning Network',
      requirement: {
        type: 'required',
      },
    },
  },
})

export type Manifest = typeof manifest
