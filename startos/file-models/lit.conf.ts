import { matches, FileHelper } from '@start9labs/start-sdk'
import { litDir, lndMount } from '../utils'

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

export const defaultConfig = {
  remote: {
    lnd: {
      rpcserver: 'lnd.startos:10009',
      macaroonpath: `${lndMount}/admin/macaroon`,
      tlscertpath: `${lndMount}/tls.cert`,
    }
  }
}

export const litConfig = FileHelper.json(`${litDir}/lit.conf`, shape)
