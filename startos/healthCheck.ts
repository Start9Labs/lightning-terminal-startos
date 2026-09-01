import { HealthCheckResult } from '@start9labs/start-sdk/lib/health/checkFns'
import { i18n } from './i18n'
import { uiPort } from './utils'

type SubServer = { running: boolean; error: string; custom_status: string }

/**
 * litd's own view of its sub-servers — `lnd` among them even in remote mode.
 * `/litrpc.Status/SubServerStatus` is whitelisted from macaroon auth and from
 * the started-subsystem gate, and its REST handler is registered before litd
 * attempts the LND connection, so it answers while the UI port is bound but
 * litd is not yet usable.
 */
async function subServers() {
  try {
    const res = await fetch(`http://127.0.0.1:${uiPort}/v1/status`, {
      signal: AbortSignal.timeout(5_000),
    })
    if (!res.ok) return null
    return (
      (await res.json()) as {
        sub_servers: Record<string, SubServer | undefined>
      }
    ).sub_servers
  } catch {
    return null
  }
}

/**
 * The one terminal state litd can enter. Upstream `terminal.go` stamps this
 * prefix at its single park site — `SetErrored(subservers.LIT, "could not
 * start Lit: %v", startErr)` after `g.start()` returns — where litd blocks
 * forever with the web port bound; any start failure lands there, an LND
 * restart cutting the RPC middleware stream being the common one. The message
 * text is the only discriminator the status API offers: `SubServerStatus`
 * carries just disabled/running/error/custom_status, set identically by the
 * self-healing retry sites ("Error when setting up basic LND Client", "Error
 * when creating LND Services client"), which must NOT match. Re-verify the
 * three `SetErrored(LIT, …)` sites on every upstream bump.
 */
const PARKED_PREFIX = 'could not start Lit'

export type LitHealth = HealthCheckResult & {
  /**
   * litd is alive (status endpoint answering) but permanently down — only a
   * process restart recovers it. `main`'s ready fn acts on this.
   */
  parked?: boolean
}

/**
 * @param rpcserver LND's resolved gRPC address, or null while its binding is
 * absent. litd falls back to its own `localhost:10009` default when the key is
 * unwritten, so on null there is nothing to probe.
 */
export async function checkLit(rpcserver: string | null): Promise<LitHealth> {
  if (!rpcserver)
    return {
      result: 'waiting',
      message: i18n('Waiting for LND — start it and unlock its wallet'),
    }

  const servers = await subServers()
  if (!servers)
    return {
      result: 'failure',
      message: i18n('The web interface is not ready'),
    }

  const { lnd, lit } = servers
  // Checked before `lnd.error`: a park can stamp both sub-servers (e.g. LND
  // dying post-start), and the parked state must win — it is the only one
  // that never heals without a restart.
  if (lit?.error?.startsWith(PARKED_PREFIX))
    return {
      result: 'failure',
      message: i18n(
        'Lightning Terminal hit a fatal error — restarting it: ${error}',
        {
          error: lit.error,
        },
      ),
      parked: true,
    }
  if (lnd?.error)
    return {
      result: 'failure',
      message: i18n('Cannot reach LND: ${error}', { error: lnd.error }),
    }
  if (lit?.error)
    return {
      result: 'failure',
      message: i18n('Lightning Terminal failed to start: ${error}', {
        error: lit.error,
      }),
    }
  if (lnd?.running && lit?.running)
    return { result: 'success', message: i18n('The web interface is ready') }
  if (lnd?.running || lnd?.custom_status)
    return { result: 'starting', message: i18n('Starting Lightning Terminal…') }

  return { result: 'starting', message: i18n('Connecting to LND…') }
}
