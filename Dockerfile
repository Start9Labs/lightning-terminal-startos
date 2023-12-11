FROM lightninglabs/lightning-terminal:v0.12.2-alpha
# arm64 or amd64
ARG PLATFORM
ARG ARCH

RUN apk add --no-cache yq xxd curl

# Import Entrypoint and give permissions
ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
ADD ./check-lnd.sh /usr/local/bin/check-lnd.sh
RUN chmod a+x /usr/local/bin/*.sh
