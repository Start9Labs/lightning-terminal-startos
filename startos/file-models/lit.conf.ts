import { matches, FileHelper, utils } from '@start9labs/start-sdk'
import { litDir, lndMount, randomPassword, uiPort } from '../utils'

const { object, string, literal } = matches

const insecureHttplisten = `lightning-terminal.startos:${uiPort}`
const lndRpcserver = 'lnd.startos:10009'
const lndMacaroonpath = `${lndMount}/admin/macaroon`
const lndTlscertpath = `${lndMount}/tls.cert`

const shape = object({
  uipassword: string.onMismatch(utils.getDefaultString(randomPassword)),
  'lit-dir': literal(litDir).onMismatch(litDir),
  'insecure-httplisten':
    literal(insecureHttplisten).onMismatch(insecureHttplisten),
  'remote.lnd.rpcserver': literal(lndRpcserver).onMismatch(lndRpcserver),
  'remote.lnd.macaroonpath':
    literal(lndMacaroonpath).onMismatch(lndMacaroonpath),
  'remote.lnd.tlscertpath': literal(lndTlscertpath).onMismatch(lndTlscertpath),
})

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
