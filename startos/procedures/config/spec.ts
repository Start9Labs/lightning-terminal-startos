import { sdk } from '../../sdk'
const { Config } = sdk

export const configSpec = Config.of({})

export type ConfigSpec = typeof configSpec.validator._TYPE
