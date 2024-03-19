FROM lightninglabs/lightning-terminal:v0.12.3-alpha
# arm64 or amd64
ARG PLATFORM
ARG ARCH

# RUN apk add --no-cache yq xxd curl

# Import Entrypoint and give permissions
RUN chmod a+x /usr/local/bin/*.sh
