import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { litDir, lndMount, uiPort } from '../utils'

// litd binds its own web interface on all container interfaces; StartOS
// exposes it over the bridge (replaces the old `lightning-terminal.startos` DNS).
const httpListen = `0.0.0.0:${uiPort}` as const
const macaroonPath =
  `${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon` as const
const tlsCertPath = `${lndMount}/tls.cert` as const

const shape = z.object({
  uipassword: z.string().nullable().catch(null),
  databasebackend: z.literal('sqlite').catch('sqlite'),
  // Approve litd 0.17's one-way bbolt→SQL migration headlessly; no stdin prompt is answerable here.
  'auto-migrate-to-sql': z.literal('true').catch('true'),
  'lit-dir': z.literal(litDir).catch(litDir),
  'insecure-httplisten': z.literal(httpListen).catch(httpListen),
  // LND's gRPC endpoint over the LXC bridge — main.ts writes the resolved
  // host:port at startup; the fallback is a placeholder for a fresh file.
  'remote.lnd.rpcserver': z.string().catch('lnd.startos:10009'),
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
