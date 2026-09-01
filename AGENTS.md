# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **`httpslisten` must stay pinned off the plaintext port.** litd always binds a TLS listener as well; its default is `127.0.0.1:<uiPort>`, and the plaintext listener binds `0.0.0.0:<uiPort>`. An already-listening specific address blocks the overlapping wildcard bind, so the second bind fails with `EADDRINUSE` and litd exits. Moving either listener onto the other's port brings the service down.
- **The health check reads `/v1/status`, never the socket.** litd binds 8443 before it connects to LND and keeps it bound when that connection fails, so a listening port is not evidence that the interface can load. `/v1/status` is litd's own status manager, and it reports an `lnd` sub-server even in remote mode.
- **`main`'s ready fn is also litd's watchdog, and an upstream bump must re-verify it.** It kills a parked litd so the supervisor restarts it, matching that state by message prefix — `PARKED_PREFIX` in `startos/healthCheck.ts`, which names the `terminal.go` sites to re-check. Don't reach for `pkill`: busybox matches argv rather than comm, so `pkill -x litd` can never match a process started as `/bin/litd`. A bump must also confirm the image still ships `sh`, `kill`, and `pidof`.
- **`enablerest` must stay `true`.** It is what serves `/v1/status` on the UI port, so the health check above has nothing to read without it. It adds no unauthenticated surface: REST calls are converted back to gRPC and re-enter the same authenticated proxy that already serves the UI's grpc-web traffic.
- **`auto-migrate-to-sql` must stay `true`.** litd's bbolt→SQL migration is one-way and prompts on stdin for approval; nothing here can answer it, so the service simply never comes up without this.
- **Leave `remote.lnd.rpcserver` unwritten when LND's binding is absent, never seeded.** That binding does not exist until LND's first wallet unlock. A fabricated address would be indistinguishable from a real one and would have to be corrected later; leaving it unset lets the `.const()` heal write the real value on one restart, and the binding then survives lock/unlock cycles.
- **`main` must `const` the config _after_ its own `rpcserver` merge**, or that write self-triggers a restart on every start.
- **litd pins the mounted `tls.cert`**, whose SANs cover LND's bridge address — that is why the LND mount is required and not just the macaroon path.
