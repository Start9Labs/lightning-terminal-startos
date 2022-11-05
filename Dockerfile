FROM lightninglabs/lightning-terminal:v0.8.2-alpha

# arm64 or amd64
ARG PLATFORM
ARG ARCH

RUN apk add --no-cache yq xxd curl

# Import Entrypoint and give permissions
ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
RUN chmod +x /usr/local/bin/*.sh
