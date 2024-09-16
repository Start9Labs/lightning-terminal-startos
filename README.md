# Wrapper for Lightning Terminal

[Lightning Terminal (LiT)](https://github.com/lightninglabs/lightning-terminal) is a browser-based interface for managing channel liquidity. This .s9pk wrapper will allow you to run LiT on your StartOS Server.

## StartOS Service Pre-Requisites:

- [lnd](https://github.com/Start9Labs/lnd-startos)

## Dependencies

- [deno](https://deno.land/)
- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [make](https://www.gnu.org/software/make/)
- [start-sdk](https://github.com/Start9Labs/start-os/blob/v0.3.5.1/core/install-sdk.sh)
- [yq (version 4)](https://mikefarah.gitbook.io/yq)

## Build Enviroment

Before building the lightning terminal package, your build environment must be setup for building StartOS services. Instructions for setting up the proper build environment can be found in the [Developer Docs](https://docs.start9.com/latest/developer-docs/packaging).


## Cloning

Clone the project locally. Note the submodule link to the original project(s).

`git clone https://github.com/Start9Labs/lightning-terminal-startos.git`

## Building

To build the project, run the command: `make`

## Installing (on StartOS)

Run the following commands to determine successful install:
> :information_source: Change server-name.local to your StartOS server address

```
start-cli auth login
#Enter your StartOS password
start-cli --host https://server-name.local package install lightning-terminal.s9pk
```

If you already have your `start-cli` config file setup with a default `host`, you can install simply by running:

```
make install
```

**Tip:** You can also install the lightning-terminal.s9pk using **Sideload Service** under the **System > Manage** section.

## Verify Install

Go to your StartOS Services page, select lightning-terminal and start the service.

**Done!** 
