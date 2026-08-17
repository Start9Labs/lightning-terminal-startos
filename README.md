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

The upstream image is used unmodified, and one subcontainer runs the service.

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

LND's data directory is mounted **read-only** at `/mnt/lnd`. That is how the package reads LND's admin macaroon and TLS certificate — neither is stored here, and litd pins the mounted certificate rather than trusting the connection blindly.

## File Models

One model, and nearly all of it is enforced: litd's configuration is wiring rather than preference.

| File            | Format | Modelled               | Written by                                       |
| --------------- | ------ | ---------------------- | ------------------------------------------------ |
| `.lit/lit.conf` | INI    | Yes — `FileHelper.ini` | Every init, every start, and the password action |

**Enforced** — rewritten to a fixed value whenever the package writes the file: `lit-dir`, `databasebackend`, `auto-migrate-to-sql`, both listener addresses, and LND's macaroon and certificate paths.

Two of those are overrides rather than plain wiring:

- **`auto-migrate-to-sql` is forced on.** litd's one-way bbolt-to-SQL migration otherwise prompts on stdin for approval, and there is no stdin here to answer it — the service would simply not come up.
- **The two listeners are pinned to different ports.** litd always binds a TLS listener as well as the plaintext one, and its default puts the TLS listener on loopback at the same port the plaintext listener binds on all interfaces. An already-bound specific address blocks the overlapping wildcard bind, so the second one fails and litd exits. The TLS listener is moved to a neighbouring loopback port; it backs only litd's internal proxy and is never exposed.

**Derived:** `remote.lnd.rpcserver` is LND's gRPC address, written by `main` from LND's own binding. While that binding is absent the key is left **unwritten** rather than seeded with a placeholder — litd retries and its health check stays red until the address resolves.

**Yours:** `uipassword`, through its action.

Because litd reads this file only at startup, `main` watches it and restarts the daemon on any change — which is what makes a password reset or a resolved LND address take effect.

## Dependencies

One, and it is required.

| Dependency | Kind      | Health check | Mount                 | Why                                                         |
| ---------- | --------- | ------------ | --------------------- | ----------------------------------------------------------- |
| LND        | `running` | `lnd`        | `/mnt/lnd`, read-only | The node being managed: gRPC, macaroon, and TLS certificate |

**LND's gRPC binding does not exist until its wallet is first unlocked.** Until then the address resolves to nothing, the config key stays unwritten, and this service's health check is red — expected on a fresh pair of installs rather than a fault. Once the binding appears the package heals with a single restart, and the address then survives later lock and unlock cycles.

## Network Access and Interfaces

One interface. litd's TLS listener is loopback-only and is never published.

| Interface | Id   | Type | Port | Description                          |
| --------- | ---- | ---- | ---- | ------------------------------------ |
| Web UI    | `ui` | ui   | 8443 | The Lightning Terminal web interface |

The port is bound on the `main` MultiHost and is not masked. StartOS terminates TLS at the edge, which is why the published listener is the plaintext one.

## Installation and First-Run Flow

Install seeds the config and raises a `critical` task for the password — there is no wizard, and no account to create inside the application.

The ordering that matters is LND's: install it, start it, and **unlock its wallet** before expecting Lightning Terminal to work. Until that first unlock there is no gRPC address to connect to, and the service reports itself unhealthy rather than pretending otherwise.

## Actions

One action, which renames itself to match what running it will do.

### Create / Reset Password

Sets the password for the Lightning Terminal web interface.

- **What it changes:** `uipassword` in `lit.conf`.
- **Cost:** seconds, then a restart — litd reads its config only at startup.
- **Repeat safety:** safe to re-run; each run generates a fresh password and invalidates the previous one.
- **Outputs:** the new password, masked and copyable. It is not recoverable afterwards.

This is the login for Lightning Terminal itself. It has no bearing on LND's own credentials.

## Tasks

One task, raised at install, and it blocks the service until you clear it.

| Task            | Severity   | Raised when                       | Cleared when    |
| --------------- | ---------- | --------------------------------- | --------------- |
| Create Password | `critical` | At init, while no password is set | The action runs |

`critical` because litd's web interface is the whole service and it has no other authentication.

## Health Checks

One check, on the daemon.

| Check                 | Method                 | Grace Period |
| --------------------- | ---------------------- | ------------ |
| `lit` "Web Interface" | Port 8443 is listening | SDK default  |

A failure most often means litd could not reach LND — either LND is not running, or its wallet has never been unlocked and there is no gRPC address to write into the config. The service logs distinguish the two.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. No dump step and nothing excluded.

- **Included:** `lit.conf` with the interface password, and litd's own database — the Loop, Pool, and Faraday state it keeps alongside LND's.
- **Not included:** anything belonging to LND. Channels, funds, and the node identity are that package's backup.
- **Restore:** complete on this side, and no task is raised since the password comes back. LND must be present and unlocked before the service becomes healthy again.

## Limitations and Differences

1. **LND is required, and must have been unlocked at least once.** Before that there is no gRPC address to connect to.
2. **The password is generated, not chosen**, and the service will not start until it exists.
3. **litd's configuration is not user-editable in any meaningful way.** Every key but the password is pinned by the package.
4. **The TLS listener is moved to a loopback port** so it cannot collide with the published plaintext listener; StartOS terminates TLS at the edge instead.
5. **The bbolt-to-SQL migration is approved automatically**, because it is one-way and would otherwise block on a prompt nothing can answer.
6. **No riscv64 build.** x86_64 and aarch64 only.

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
  - lnd # required; mounted read-only at /mnt/lnd
interfaces:
  ui: { type: ui, port: 8443 } # litd's TLS listener is loopback-only and unexported
actions:
  - reset-password # renames itself to "Create Password" when unset
tasks:
  - { action: reset-password, severity: critical }
health_checks:
  - lit # displayed "Web Interface"
```
