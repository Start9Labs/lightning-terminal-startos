# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `lightning-terminal`.** Runs `litd` in **remote mode** against a hard **LND** dependency — there is no bundled LND. LND's admin macaroon and `tls.cert` are mounted read-only at `/mnt/lnd`.
- **Reaching LND goes through the LXC bridge**, not `.startos` DNS. `main.ts` resolves LND's gRPC `host:port` with `sdk.host.getBridgeAddress` on LND's `gRPCHostId` / `gRPCPort` (ids imported from `lnd-startos/startos/interfaces`), passing no `ssl:` discriminator — LND binds gRPC as TLS passthrough (`secure: {ssl: true}`, `addSsl: null`), which publishes a single bridge address flagged `ssl: true`, so `ssl: false` there would resolve `null` and writes it into `remote.lnd.rpcserver` in `.lit/lit.conf` before the daemon starts; litd binds its own UI on `0.0.0.0:8443`.
- **Config is `.lit/lit.conf`** (a `FileHelper.ini` model in `startos/fileModels/lit.conf.ts`). The only user-managed value is `uipassword`, set via the Create/Reset Password action; everything else is hardcoded.
- No hosts/interfaces are exported for dependents — it publishes only its own `ui` interface.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach lightning-terminal -n lit-sub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `lit-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
