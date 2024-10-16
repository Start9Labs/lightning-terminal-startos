import { matches, FileHelper } from '@start9labs/start-sdk'
import { litDir, lndMount, uiPort } from '../utils'

const { object, string, literal } = matches

const shape = object({
  'lnd-mode': literal('integrated'),
  uipassword: string,
  macaroonpath: literal(`${litDir}/mainnet/lit.macaroon`),
  'lit-dir': literal(litDir),
  'tlscertpath': literal(`${litDir}/tls.cert`),
  'tlskeypath': literal(`${litDir}/tls.key`),
  'insecure-httplisten': literal(`lightning-terminal.embassy:${uiPort}`),
  remote: object({
    lnd: object({
      rpcserver: string,
      macaroonpath: string,
      tlscertpath: string,
    }),
  }),
})

export const defaultConfig: typeof shape._TYPE = {
  'lnd-mode': 'integrated',
  uipassword: '',
  macaroonpath: `${litDir}/mainnet/lit.macaroon`,
  'lit-dir': litDir,
  'tlscertpath': `${litDir}/tls.cert`,
  'tlskeypath': `${litDir}/tls.key`,
  'insecure-httplisten': `lightning-terminal.embassy:${uiPort}`,
  remote: {
    lnd: {
      rpcserver: 'lnd.startos:10009',
      macaroonpath: `${lndMount}/admin/macaroon`,
      tlscertpath: `${lndMount}/tls.cert`,
    }
  }
}

export const litConfig = FileHelper.json(`${litDir}/lit.conf`, shape)
