# Lightning Terminal

## Documentation

- [Start9 Bitcoin Guides](https://docs.start9.com/bitcoin-guides/) — connecting wallets and dashboards to a Lightning node on StartOS.
- [Lightning Terminal upstream docs](https://docs.lightning.engineering/lightning-network-tools/lightning-terminal) — the upstream operator guide covering Loop, Pool, and the web UI.

## What you get on StartOS

- A **Web UI** for visualizing your LND channels, performing submarine swaps (Lightning Loop), and earning sats by leasing inbound liquidity (Lightning Pool).
- Connection to your existing **LND** service via its admin macaroon and TLS certificate — Lightning Terminal runs in remote mode against the LND you already operate.

## Getting set up

Install **LND** first and let it finish syncing; Lightning Terminal cannot start without it.

After installing Lightning Terminal, it posts a critical task asking you to create your admin password.

1. Run the **Create Password** task. A random 22-character password is generated and shown once — copy it before dismissing the result; it's masked but copyable from the action output.
2. Start Lightning Terminal.
3. Open the **Web UI** interface and log in with the generated password.

If you ever lose the password, run the **Reset Password** action to generate a new one.

## Using Lightning Terminal

### Web UI

The Web UI is where you spend your time: viewing channels and balances, running Loop In / Loop Out swaps, and participating in Pool. Log in with the password from the Create / Reset Password action.

### Actions

- **Create Password / Reset Password** — generates a new random admin password for the Web UI. The action is labelled **Create Password** before one has been set and **Reset Password** afterwards.
