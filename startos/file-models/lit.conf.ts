import { matches, FileHelper } from '@start9labs/start-sdk'
import { litDir, lndMount, uiPort } from '../utils'

const { object, string, literal } = matches

const shape = object({
  uipassword: string,
  'lit-dir': literal(litDir),
  'insecure-httplisten': literal(`lightning-terminal.startos:${uiPort}`),
  remote: object({
    lnd: object({
      rpcserver: string,
      macaroonpath: string,
      tlscertpath: string,
    }),
  }),
})

export const defaultConfig: typeof shape._TYPE = {
  uipassword: '',
  'lit-dir': litDir,
  'insecure-httplisten': `lightning-terminal.startos:${uiPort}`,
  remote: {
    lnd: {
      rpcserver: 'lnd.startos:10009',
      macaroonpath: `${lndMount}/admin/macaroon`,
      tlscertpath: `${lndMount}/tls.cert`,
    }
  }
}

export const litConfig = FileHelper.json(`${litDir}/lit.conf`, shape)
