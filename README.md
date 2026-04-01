<p align="center">
  <img src="icon.svg" alt="Lightning Terminal Logo" width="21%">
</p>

# Lightning Terminal on StartOS

> **Upstream docs:** <https://docs.lightning.engineering/lightning-network-tools/lightning-terminal>
>
> Everything not listed in this document should behave the same as upstream
> Lightning Terminal. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

A browser-based interface for managing channel liquidity on a self-hosted LND node. See the [upstream repo](https://github.com/lightninglabs/lightning-terminal) for general Lightning Terminal documentation.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Image | `lightninglabs/lightning-terminal` (upstream, unmodified) |
| Architectures | x86_64, aarch64 |
| Entrypoint | `/bin/litd` |

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `main` | `/root` | All LiT data (configuration, application state) |

StartOS-specific files on the `main` volume:

| File | Purpose |
|------|---------|
| `.lit/lit.conf` | LiT configuration (managed by StartOS) |

The LND `main` volume is mounted read-only at `/mnt/lnd` for macaroon and TLS certificate access.

## Installation and First-Run Flow

1. On install, StartOS creates a **critical task** prompting the user to set an admin password via the **Create Password** action
2. The `.lit/lit.conf` file is written with default configuration and the generated password
3. LiT connects to the running LND node using the mounted macaroon and TLS certificate

## Configuration Management

LiT is configured via the `.lit/lit.conf` file, managed by StartOS. There are no user-configurable settings exposed through StartOS actions — the admin password is the only managed value.

Settings managed by StartOS (hardcoded):

| Setting | Value | Reason |
|---------|-------|--------|
| `uipassword` | Auto-generated | Set via Create/Reset Password action |
| `lit-dir` | `/root` | Maps to the mounted volume |
| `insecure-httplisten` | `lightning-terminal.startos:8443` | StartOS service networking |
| `remote.lnd.rpcserver` | `lnd.startos:10009` | StartOS service networking |
| `remote.lnd.macaroonpath` | `/mnt/lnd/data/chain/bitcoin/mainnet/admin.macaroon` | Mounted dependency volume |
| `remote.lnd.tlscertpath` | `/mnt/lnd/tls.cert` | Mounted dependency volume |

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose |
|-----------|------|----------|---------|
| Web UI | 8443 | HTTP | Lightning Terminal web interface |

## Actions (StartOS UI)

| Action | Purpose | Availability | Inputs |
|--------|---------|-------------|--------|
| **Create/Reset Password** | Generate a random 22-character admin password for the web UI | Any | None |

The action name changes dynamically: "Create Password" on first use, "Reset Password" thereafter. The generated password is displayed once as a copyable value.

## Backups and Restore

**Backed up:** The entire `main` volume (configuration, application data).

**Restore behavior:** Standard restore — the configuration and data are restored as-is. The configured LND node must be available.

## Health Checks

| Check | Method | Messages |
|-------|--------|----------|
| **Web Interface** | Port listening (8443) | Ready: "The web interface is ready" |

## Dependencies

| Dependency | Required | Purpose |
|------------|----------|---------|
| LND | Required | Lightning Network node access via gRPC |

LND must be installed and running. LiT connects to LND using the admin macaroon and TLS certificate from the mounted volume.

## Limitations and Differences

1. **Remote mode only** — LiT runs in remote mode connecting to a separate LND instance; integrated mode (where LiT runs its own LND) is not available
2. **No user-configurable settings** — all configuration is managed by StartOS; the only user action is password management
3. **Password-only authentication** — the UI password is auto-generated via the StartOS action; there is no option to set a custom password manually

## What Is Unchanged from Upstream

- Lightning Loop (submarine swaps — Loop In and Loop Out)
- Lightning Pool (channel liquidity marketplace)
- Channel visualization and balance management
- All web UI functionality
- Faraday (channel analytics)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: lightning-terminal
image: lightninglabs/lightning-terminal
architectures: [x86_64, aarch64]
volumes:
  main: /root
ports:
  ui: 8443
dependencies:
  - lnd (required)
startos_managed_files:
  - .lit/lit.conf
actions:
  - reset-password
health_checks:
  - port_listening: 8443
backup_volumes:
  - main
```
