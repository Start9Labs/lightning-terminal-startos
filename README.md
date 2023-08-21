# Wrapper for Lightning Terminal

`Lightning Terminal (LiT)` is a browser-based interface for managing channel liquidity. This .s9pk wrapper will allow you to run LiT on your Start9 Server.

## StartOS Service Pre-Requisites:

- [lnd](https://github.com/Start9Labs/lnd-wrapper)

## Dependencies

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [yq](https://mikefarah.gitbook.io/yq)
- [toml](https://crates.io/crates/toml-cli)
- [embassy-sdk](https://github.com/Start9Labs/start-os/tree/master/backend)
- [make](https://www.gnu.org/software/make/)

## Build enviroment

Prepare your StartOS build environment. In this example we are using Ubuntu 20.04.

1. Install docker

```
curl -fsSL https://get.docker.com -o- | bash
sudo usermod -aG docker "$USER"
exec sudo su -l $USER
```

2. Set buildx as the default builder

```
docker buildx install
docker buildx create --use
```

3. Enable cross-arch emulated builds in docker

```
docker run --privileged --rm linuxkit/binfmt:v0.8
```

4. Install yq

```
sudo snap install yq
```

5. Install essentials build packages

```
sudo apt-get install -y build-essential openssl libssl-dev libc6-dev clang libclang-dev ca-certificates
```

6. Install Rust

```
curl https://sh.rustup.rs -sSf | sh
# Choose nr 1 (default install)
source $HOME/.cargo/env
```

7. Install toml

```
cargo install toml-cli
```

8. Build and install the StartOS SDK

```
cd ~/ && git clone https://github.com/Start9Labs/start-os.git
cd start-os/backend/
./install-sdk.sh
```

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

Sideload from the web-UI via:
System > Sideload Service

SSH into a StartOS server.
`scp` the `.s9pk` to any directory from your local machine.
Run the following command to install the package:

```
start-cli auth login
#Enter your StartOS master password then run:
start-cli package install /path/to/lightning-terminal.s9pk
```

## Verify Install

Go to your StartOS Services page, select lightning-terminal and start the service.

#Done
