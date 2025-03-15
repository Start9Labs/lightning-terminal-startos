import { matches, FileHelper } from '@start9labs/start-sdk'
import { configDefaults } from '../utils'

const { object, string, literal } = matches

const {
  uipassword,
  'lit-dir': ld,
  'insecure-httplisten': ih,
  'remote.lnd.rpcserver': rlr,
  'remote.lnd.macaroonpath': rlm,
  'remote.lnd.tlscertpath': rlt,
} = configDefaults

const shape = object({
  uipassword: string.optional().onMismatch(uipassword),
  'lit-dir': literal(ld).onMismatch(ld),
  'insecure-httplisten': literal(ih).onMismatch(ih),
  'remote.lnd.rpcserver': literal(rlr).onMismatch(rlr),
  'remote.lnd.macaroonpath': literal(rlm).onMismatch(rlm),
  'remote.lnd.tlscertpath': literal(rlt).onMismatch(rlt),
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
  `${ld}/lit.conf`,
  (obj: typeof shape._TYPE) => toLitConf(obj),
  (str) => fromLitConf(str),
  (value) => shape.unsafeCast(value),
)
