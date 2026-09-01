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
 * `terminal.go`'s single park site stamps this after `g.start()` returns, and
 * litd then blocks forever with the web port bound. Its two other
 * `SetErrored(LIT, …)` messages come from retry loops and must never match —
 * re-check all three on an upstream bump.
 */
const PARKED_PREFIX = 'could not start Lit'

export type LitHealth = HealthCheckResult & {
  /** Alive but permanently down — only a process restart recovers it. */
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
  // A park stamps both sub-servers, so this must outrank the lnd.error branch.
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
