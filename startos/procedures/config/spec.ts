import { sdk } from '../../sdk'
const { Config, Value } = sdk

/**
 * Here you define the config spec that will ultimately present to the user as validated form inputs
 *
 * Most form controls are available, including text, textarea, number, toggle, select, multiselect, list, color, datetime, object (aka a "sub form"), and union (aka a conditional "sub form")
 */
export const configSpec = Config.of({
    password: Value.text({
        name: 'Lightning Terminal Password',
        description: 'Administrator password for Lightning Terminal',
        masked: true,
        copyable: true,
        required: { default: {
            charset: 'a-z,A-Z,0-9',
            len: 22
            } 
        },
    }),
})
/**
 * This line is necessary to satisfy Typescript typings. Do not touch it
 */
export const matchConfigSpec = configSpec.validator
export type ConfigSpec = typeof configSpec.validator._TYPE