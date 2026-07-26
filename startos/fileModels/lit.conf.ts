import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { litDir, lndMount, uiPort } from '../utils'

// litd's web UI. StartOS reaches it over the LXC bridge (replacing the old
// `lightning-terminal.startos` DNS), so the plaintext `insecure-httplisten` binds all
// interfaces and the `ui` interface points at it. litd ALSO always binds a TLS listener
// (`httpslisten`); its default 127.0.0.1:8443 collides with the plaintext 0.0.0.0:8443
// — an already-listening specific-address socket blocks the overlapping wildcard bind,
// so the second bind fails with EADDRINUSE and litd exits. Pin it to a separate loopback
// port; it only backs litd's internal REST/gRPC proxy and is never exposed.
const httpListen = `0.0.0.0:${uiPort}` as const
const httpsListen = `127.0.0.1:${uiPort + 1}` as const
const macaroonPath =
  `${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon` as const
const tlsCertPath = `${lndMount}/tls.cert` as const

const shape = z.object({
  uipassword: z.string().nullable().catch(null),
  databasebackend: z.literal('sqlite').catch('sqlite'),
  // Approve litd 0.17's one-way bbolt→SQL migration headlessly; no stdin prompt is answerable here.
  'auto-migrate-to-sql': z.literal('true').catch('true'),
  'lit-dir': z.literal(litDir).catch(litDir),
  // Pinned off uiPort so litd's mandatory TLS listener can't collide with the
  // plaintext listener below (see note above).
  httpslisten: z.literal(httpsListen).catch(httpsListen),
  'insecure-httplisten': z.literal(httpListen).catch(httpListen),
  // LND's gRPC endpoint over the LXC bridge; main.ts writes the resolved bridge
  // address at startup. Absent until LND's binding appears, so it stays unset
  // (and unwritten) rather than seeding a fabricated dependency address.
  'remote.lnd.rpcserver': z.string().optional().catch(undefined),
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
