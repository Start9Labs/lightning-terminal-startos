import FileHelper from '@start9labs/start-sdk/lib/util/fileHelper'
import { matches } from '@start9labs/start-sdk/lib'
import { litDir } from '../../../utils'

const { object, string, natural } = matches

const shape = object({
  remote: object({
    lnd: object({
      rpcserver: string,
      macaroonpath: string,
      tlscertpath: string,
    }),
  }),
})

export type LitConfig = typeof shape._TYPE
export const litConfig = FileHelper.json(`${litDir}/lit.conf`, shape)
