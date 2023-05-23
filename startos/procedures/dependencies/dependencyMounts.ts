import { sdk } from '../../sdk'
import { manifest as lndManifest } from 'lnd-startos/startos/manifest'

export const dependencyMounts = sdk
  .setupDependencyMounts()
  .addPath({
    name: 'rootDir',
    manifest: lndManifest,
    volume: 'main',
    path: '/',
    readonly: true,
  })
  .build()
