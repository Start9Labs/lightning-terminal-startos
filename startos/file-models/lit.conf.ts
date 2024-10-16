import { matches, FileHelper } from '@start9labs/start-sdk'
import { litDir, lndMount, uiPort } from '../utils'

const { object, string, literal } = matches

const shape = object({
  'lnd-mode': literal('remote'),
  uipassword: string,
  'lit-dir': literal(litDir),
  'tlskeypath': literal(`${litDir}/tls.key`),
  'httpslisten': literal(`0.0.0.0:${uiPort}`),
  remote: object({
    lnd: object({
      rpcserver: string,
      macaroonpath: string,
      tlscertpath: string,
    }),
  }),
})

export const defaultConfig: typeof shape._TYPE = {
  'lnd-mode': 'remote',
  uipassword: '',
  'lit-dir': litDir,
  'tlskeypath': `${litDir}/tls.key`,
  'httpslisten': `0.0.0.0:${uiPort}`,
  remote: {
    lnd: {
      rpcserver: 'lnd.startos:10009',
      macaroonpath: `${lndMount}/admin/macaroon`,
      tlscertpath: `${lndMount}/tls.cert`,
    }
  }
}

export const litConfig = FileHelper.json(`${litDir}/lit.conf`, shape)
