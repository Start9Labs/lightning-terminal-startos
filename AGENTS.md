# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **`httpslisten` must stay pinned off the plaintext port.** litd always binds a TLS listener as well; its default is `127.0.0.1:<uiPort>`, and the plaintext listener binds `0.0.0.0:<uiPort>`. An already-listening specific address blocks the overlapping wildcard bind, so the second bind fails with `EADDRINUSE` and litd exits. Moving either listener onto the other's port brings the service down.
- **`auto-migrate-to-sql` must stay `true`.** litd's bbolt→SQL migration is one-way and prompts on stdin for approval; nothing here can answer it, so the service simply never comes up without this.
- **Leave `remote.lnd.rpcserver` unwritten when LND's binding is absent, never seeded.** That binding does not exist until LND's first wallet unlock. A fabricated address would be indistinguishable from a real one and would have to be corrected later; leaving it unset lets the `.const()` heal write the real value on one restart, and the binding then survives lock/unlock cycles.
- **`main` must `const` the config _after_ its own `rpcserver` merge**, or that write self-triggers a restart on every start.
- **litd pins the mounted `tls.cert`**, whose SANs cover LND's bridge address — that is why the LND mount is required and not just the macaroon path.
