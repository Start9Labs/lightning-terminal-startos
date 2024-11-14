import { matches, FileHelper } from '@start9labs/start-sdk'
import { litDir, lndMount, uiPort } from '../utils'

const { object, string, literal } = matches

const shape = object({
  uipassword: string,
  'lit-dir': literal(litDir),
  'insecure-httplisten': literal(`lightning-terminal.startos:${uiPort}`),
  'remote.lnd.rpcserver': literal('lnd.startos:10009'),
  'remote.lnd.macaroonpath': literal(`${lndMount}/admin/macaroon`),
  'remote.lnd.tlscertpath': literal(`${lndMount}/tls.cert`),
})

export const defaultConfig: typeof shape._TYPE = {
  uipassword: '',
  'lit-dir': litDir,
  'insecure-httplisten': `lightning-terminal.startos:${uiPort}`,
  'remote.lnd.rpcserver': 'lnd.startos:10009',
  'remote.lnd.macaroonpath': `${lndMount}/admin/macaroon`,
  'remote.lnd.tlscertpath': `${lndMount}/tls.cert`,
}

function fromLitConf(text: string): typeof shape._TYPE {
  let conf: Record<string, string> = {}
  const lines = text.split('\n')

  for (const line of lines) {
    const [key, value] = line.split('=', 2)
    const trimmedKey = key.trim()
    const trimmedValue = value.trim()

    conf[trimmedKey] = trimmedValue
  }

  return conf as typeof shape._TYPE
}

function toLitConf(obj: typeof shape._TYPE): string {
  let litConf = ''
  for (const [key, value] of Object.entries(obj)) {
    litConf += `${key}=${value}\n`
  }

  return litConf
}

export const litConfig = FileHelper.raw(
  `${litDir}/lit.conf`,
  (obj: typeof shape._TYPE) => toLitConf(obj),
  (str) => fromLitConf(str),
  (value) => shape.unsafeCast(value),
)
