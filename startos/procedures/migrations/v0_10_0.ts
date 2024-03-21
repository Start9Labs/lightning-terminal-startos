import { sdk } from '../../sdk'
import { readFile, rmdir } from 'fs/promises'
import { load } from 'js-yaml'

type ConfigYaml = {
  password: string
}
export const v0_10_0 = sdk.Migration.of({
  version: '0.10.0',
  up: async ({ effects }) => {
    // get old config.yaml
    const configYaml = load(
      await readFile('/root/start9/config.yaml', 'utf-8'),
    ) as ConfigYaml

    // Save password to vault
    await sdk.store.setOwn(effects, '/password', configYaml.password)

    // remove old start9 dir
    await rmdir('/root/start9')
  },
  down: async ({ effects }) => {
    throw new Error('Downgrade not permitted')
  },
})