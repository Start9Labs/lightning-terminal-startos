import { matches, FileHelper } from '@start9labs/start-sdk'
import { litDir } from '../../../utils'

const { object, string } = matches

const shape = object({
  remote: object({
    lnd: object({
      rpcserver: string,
      macaroonpath: string,
      tlscertpath: string,
    }),
  }),
})

export const litConfig = FileHelper.json(`${litDir}/lit.conf`, shape)
