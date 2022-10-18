FROM --platform=linux/amd64 lightninglabs/lightning-terminal:v0.7.0-alpha

RUN apk add --no-cache yq xxd curl

# Import Entrypoint and give permissions
ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
ADD assets/utils/check-web.sh /usr/local/bin/check-web.sh
ADD assets/utils/check-lnd.sh /usr/local/bin/check-lnd.sh
RUN chmod +x /usr/local/bin/*.sh

EXPOSE 80 8443

ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]
