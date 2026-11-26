<p align="center">
  <img src="icon.svg" alt="Lightning Terminal Logo" width="21%">
</p>

# Lightning Terminal on StartOS

> Everything not listed in this document should behave the same as upstream
> Lightning Terminal. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Lightning Terminal](https://github.com/lightninglabs/lightning-terminal) is a browser interface for managing channel liquidity on an LND node. This package points it at the LND running on this server, generates its login password, and pins the listener configuration so its two web servers cannot collide.

- **Upstream repo:** <https://github.com/lightninglabs/lightning-terminal>
- **Wrapper repo:** <https://github.com/Start9Labs/lightning-terminal-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One subcontainer runs the unmodified upstream image.

| Property      | Value                                                    |
| ------------- | -------------------------------------------------------- |
| Image         | `lightninglabs/lightning-terminal`                       |
| Architectures | x86_64, aarch64                                          |
| Command       | `litd`                                                   |
| Subcontainer  | `lit-sub` — the `lit` daemon, and the one to `attach` to |

## Volume and Data Layout

One volume, plus a read-only view of LND's.

| Volume | Mount Point | Purpose                                  |
| ------ | ----------- | ---------------------------------------- |
| `main` | `/root`     | `.lit/lit.conf`, and litd's own database |

LND's `public` volume tier `admin/` is mounted **read-only** at `/mnt/lnd`, holding only `admin.macaroon` and `tls.cert` — neither is stored here, and litd pins the mounted certificate rather than trusting the connection blindly.

## File Models

One model, and nearly all of it is enforced: litd's configuration is wiring rather than preference.

| File            | Format | Modelled               | Written by                                |
| --------------- | ------ | ---------------------- | ----------------------------------------- |
| `.lit/lit.conf` | INI    | Yes — `FileHelper.ini` | Every init, every start, and both actions |

**Enforced** — rewritten to a fixed value whenever the package writes the file: `lit-dir`, `databasebackend`, `auto-migrate-to-sql`, `enablerest`, both listener addresses, and LND's macaroon and certificate paths.

Three of those are overrides rather than plain wiring:

- **`auto-migrate-to-sql` is forced on.** litd's one-way bbolt-to-SQL migration otherwise prompts on stdin for approval, and there is no stdin here to answer it — the service would simply not come up.
- **The two listeners are pinned to different ports.** litd always binds a TLS listener as well as the plaintext one, and its default puts the TLS listener on loopback at the same port the plaintext listener binds on all interfaces. An already-bound specific address blocks the overlapping wildcard bind, so the second one fails and litd exits. The TLS listener is moved to a neighbouring loopback port; it backs only litd's internal proxy and is never exposed.
- **`enablerest` is forced on.** It is what serves litd's `/v1/status` on the UI port, which the health check reads to learn the state of litd's `lnd` sub-server. REST calls are converted back to gRPC and re-enter the same authenticated proxy that already backs the UI's grpc-web traffic, so no endpoint becomes reachable that the port was not already serving.

**Derived:** `remote.lnd.rpcserver` is LND's gRPC address, written by `main` from LND's own binding. While that binding is absent the key is left **unwritten** rather than seeded with a placeholder, and the health check reports `starting` (waiting) on that same absence. litd does not retry: with the key unwritten it falls back to its own `localhost:10009` default, fails to connect, and stays up with its `lnd` sub-server errored until the `const()` heal writes the real address and restarts it.

**Yours:** `uipassword`, and the sub-server switches `loop-mode`, `pool-mode`, `faraday-mode`, `taproot-assets-mode` and `autopilot.disable`, each through its action. The switches stay unwritten until the Sub-servers action first saves, which leaves litd's defaults in force: every sub-server integrated and the Autopilot client on.

Because litd reads this file only at startup, `main` watches it and restarts the daemon on any change — which is what makes a password reset, a sub-server change, or a resolved LND address take effect.

## Dependencies

One, and it is required.

| Dependency | Kind      | Health check | Mount                 | Why                                                         |
| ---------- | --------- | ------------ | --------------------- | ----------------------------------------------------------- |
| LND        | `running` | `lnd`        | `/mnt/lnd`, read-only | The node being managed: gRPC, macaroon, and TLS certificate |

**LND's gRPC binding does not exist until its wallet is first unlocked.** Until then the address resolves to nothing, the config key stays unwritten, and this service's health check reports `starting` (waiting) — expected on a fresh pair of installs rather than a fault. Once the binding appears the package heals with a single restart, and the address then survives later lock and unlock cycles.

## Network Access and Interfaces

One interface. litd's TLS listener is loopback-only and is never published.

| Interface | Id   | Type | Port | Description                          |
| --------- | ---- | ---- | ---- | ------------------------------------ |
| Web UI    | `ui` | ui   | 8443 | The Lightning Terminal web interface |

The port is bound on the `main` MultiHost and is not masked. StartOS terminates TLS at the edge, which is why the published listener is the plaintext one.

## Installation and First-Run Flow

Install seeds the config and raises a `critical` task for the password — there is no wizard, and no account to create inside the application.

The ordering that matters is LND's: install it, start it, and **unlock its wallet** before expecting Lightning Terminal to work. Until that first unlock there is no gRPC address to connect to, and the service reports `starting` (waiting) rather than pretending otherwise.

## Actions

Two actions. The password action renames itself to match what running it will do.

### Create / Reset Password

Sets the password for the Lightning Terminal web interface.

- **What it changes:** `uipassword` in `lit.conf`.
- **Cost:** seconds, then a restart — litd reads its config only at startup.
- **Repeat safety:** safe to re-run; each run generates a fresh password and invalidates the previous one.
- **Confirmation:** Reset Password asks for confirmation before it runs; Create Password does not.
- **Outputs:** the new password, masked and copyable. It is not recoverable afterwards.

This is the login for Lightning Terminal itself, and it is also an LND admin credential: litd attaches LND's mounted `admin.macaroon` to any LND call authenticated with it (`basicAuthToMacaroon` in litd's `rpc_proxy.go`), `BakeMacaroon` included. So whoever has the password can mint LND macaroons that live in LND and survive a reset or reinstall of this package.

**A reset changes only `uipassword`.** The restart signs browsers out, but these stay valid:

- **Lightning Node Connect sessions** — revoke them on the **Lightning Node Connect** page (**Revoke Session**).
- **LND macaroons baked with the password** — LND's **Revoke Macaroons** action regenerates every LND root key, which invalidates them, along with every other LND macaroon. LNC sessions survive that rotation, since litd re-bakes their macaroons when it starts, so they must still be revoked here.
- **`lit.macaroon`** in `.lit/` — litd's own macaroon, held only by someone with the volume or a backup.

### Sub-servers

Turns litd's bundled sub-servers and its Autopilot client on or off. Every switch defaults to on, which is litd's own default.

- **What it changes:** `loop-mode`, `pool-mode`, `faraday-mode` and `taproot-assets-mode` in `lit.conf`, each `integrated` or `disable`, and `autopilot.disable`.
- **Cost:** seconds, then a restart.
- **Repeat safety:** safe to re-run; the form opens on the current settings.
- **What turning one off does:** litd starts without it, and its data stays on the volume for when it is turned back on. The parts of the web interface that use it stop working. With Autopilot off, litd no longer connects to Lightning Labs' Autopilot server.
- **Hazard:** don't turn Loop off with a swap in progress. An unfinished swap needs `loopd` running to complete or to reclaim its funds by timeout. While Pool is off, an existing Pool account cannot be managed.
- **Outputs:** none.

## Tasks

One task, raised at install, and it blocks the service until you clear it.

| Task            | Severity   | Raised when                       | Cleared when    |
| --------------- | ---------- | --------------------------------- | --------------- |
| Create Password | `critical` | At init, while no password is set | The action runs |

`critical` because litd's web interface is the whole service and it has no other authentication.

## Health Checks

One check, on the daemon.

| Check                 | Method                        | Grace Period |
| --------------------- | ----------------------------- | ------------ |
| `lit` "Web Interface" | `GET /v1/status` on port 8443 | SDK default  |

The check reads litd's own status manager rather than the socket. litd binds port 8443 before it talks to LND and keeps it bound when that connection fails, so a listening port says nothing about whether the interface can load; `/v1/status` reports the `lnd` and `lit` sub-servers directly.

| Reported            | Condition                                                                  |
| ------------------- | -------------------------------------------------------------------------- |
| `starting`, waiting | `remote.lnd.rpcserver` is unwritten — LND's wallet has never been unlocked |
| `failure`           | `/v1/status` is unreachable, or either sub-server carries an error         |
| `starting`          | litd is connecting to LND, or has connected and is still coming up         |
| `success`           | both the `lnd` and `lit` sub-servers report running                        |

A `failure` naming LND most often means LND is not running. litd bounds its wait for LND's RPC by `--lndreadytimeout`, ten minutes by default, so a slow-starting LND is reported as `starting` for up to that long before it becomes a failure.

**The check doubles as litd's watchdog.** litd never exits once its startup has failed: it stamps its `lit` sub-server `could not start Lit: …` and parks with the web port bound, and nothing inside the process retries or exits from there (upstream treats a restart as the operator's job). Any start failure lands in that state — the common cause is an LND restart cutting the RPC middleware stream litd holds open. When the check sees that error prefix it reports the failure and stops litd, and the daemon supervisor starts it again; the fresh litd re-enters its LND wait and reconnects once LND answers. Signals are sent at most once per 90-second cooldown — SIGTERM first (a parked litd is blocked on exactly that shutdown path), escalating to SIGKILL if it is still parked a cooldown later. The prefix is what makes this safe: litd's other two `lit` error messages come from retry loops that heal on their own and must never trigger the restart. During a self-heal the check briefly shows `failure` (litd is down between the stop and the next bind), then `starting`, then `success`.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. No dump step and nothing excluded.

- **Included:** `lit.conf` with the interface password, and litd's own database — the Loop, Pool, and Faraday state it keeps alongside LND's.
- **Not included:** anything belonging to LND. Channels, funds, and the node identity are that package's backup.
- **Restore:** complete on this side, and no task is raised since the password comes back. LND must be present and unlocked before the service becomes healthy again.

## Limitations and Differences

1. **LND is required, and must have been unlocked at least once.** Before that there is no gRPC address to connect to.
2. **The password is generated, not chosen**, and the service will not start until it exists.
3. **Only the password and the sub-server switches are yours to set.** Every other key in litd's configuration is pinned by the package.
4. **The TLS listener is moved to a loopback port** so it cannot collide with the published plaintext listener; StartOS terminates TLS at the edge instead.
5. **The bbolt-to-SQL migration is approved automatically**, because it is one-way and would otherwise block on a prompt nothing can answer. It runs on the first start after updating from a release before 0.17, and the package cannot be downgraded past it, so a backup of this service, and of LND, taken before that update is the only way back to the state before the migration.
6. **No riscv64 build.** x86_64 and aarch64 only.
7. **litd cannot survive an LND restart on its own** — the package's health check detects the parked state it leaves behind and restarts litd automatically. Expect the Web Interface check to blip red and pass through `starting` for a short while after any LND update or restart.

---

## Quick Reference for AI Consumers

```yaml
package_id: lightning-terminal
image: lightninglabs/lightning-terminal
architectures:
  - x86_64
  - aarch64
subcontainers:
  - lit-sub
volumes:
  main: /root
file_models:
  - /root/.lit/lit.conf
startos_managed_env_vars: []
dependencies:
  - lnd # required; public/admin mounted read-only at /mnt/lnd
interfaces:
  ui: { type: ui, port: 8443 } # litd's TLS listener is loopback-only and unexported
actions:
  - reset-password # renames itself to "Create Password" when unset
  - sub-servers
tasks:
  - { action: reset-password, severity: critical }
health_checks:
  - lit # displayed "Web Interface"
```
