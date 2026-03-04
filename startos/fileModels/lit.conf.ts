import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { litDir, lndMount, uiPort } from '../utils'

const httpListen = `lightning-terminal.startos:${uiPort}` as const
const rpcServer = 'lnd.startos:10009' as const
const macaroonPath =
  `${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon` as const
const tlsCertPath = `${lndMount}/tls.cert` as const

const shape = z.object({
  uipassword: z.string().nullable().catch(null),
  'lit-dir': z.literal(litDir).catch(litDir),
  'insecure-httplisten': z.literal(httpListen).catch(httpListen),
  'remote.lnd.rpcserver': z.literal(rpcServer).catch(rpcServer),
  'remote.lnd.macaroonpath': z.literal(macaroonPath).catch(macaroonPath),
  'remote.lnd.tlscertpath': z.literal(tlsCertPath).catch(tlsCertPath),
})

export const litConfig = FileHelper.ini(
  { base: sdk.volumes.main, subpath: '/.lit/lit.conf' },
  shape,
  { bracketedArray: false },
  {
    onRead: (a) => a,
    onWrite: (a) => {
      const result: Record<string, string> = {}
      for (const [k, v] of Object.entries(a)) {
        if (v != null) result[k] = String(v)
      }
      return result
    },
  },
)
