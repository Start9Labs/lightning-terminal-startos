# Wrapper for Lightning Terminal

`Lightning Terminal (LiT)` is a browser-based interface for managing channel liquidity. This .s9pk wrapper will allow you to run LiT on your Start9 Server.

## StartOS Service Pre-Requisites:

- [lnd](https://github.com/Start9Labs/lnd-wrapper)

## Dependencies

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [yq](https://mikefarah.gitbook.io/yq)
- [toml](https://crates.io/crates/toml-cli)
- [start-sdk](https://github.com/Start9Labs/start-os/tree/master/backend)
- [make](https://www.gnu.org/software/make/)

## Build enviroment

Before building the lightning terminal package, your build environment must be setup for building StartOS services. Instructions for setting up the proper build environment can be found in the [Developer Docs](https://docs.start9.com/latest/developer-docs/packaging).


## Cloning

Clone the project locally. Note the submodule link to the original project(s).

```
git clone https://github.com/Start9Labs/lightning-terminal-wrapper.git
cd lightning-terminal-wrapper
git submodule update --init --recursive
```

## Building

To build the project, run the following commands:

```
make
```

## Installing (on StartOS)

Run the following commands to determine successful install:
> :information_source: Change server-name.local to your Start9 server address

```
start-cli auth login
#Enter your StartOS password
start-cli --host https://server-name.local package install lightning-terminal.s9pk
```
**Tip:** You can also install the lightning-terminal.s9pk using **Sideload Service** under the **System > Manage** section.

## Verify Install

Go to your StartOS Services page, select lightning-terminal and start the service.

**Done!** 
