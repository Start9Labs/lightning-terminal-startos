FROM --platform=linux/arm64/v8 lightninglabs/lightning-terminal:v0.6.7-alpha
RUN apk add --no-cache yq
# Import Entrypoint and give permissions
ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
ADD assets/utils/check-web.sh /usr/local/bin/check-web.sh
RUN chmod +x /usr/local/bin/check-web.sh

EXPOSE 80 8443

ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]
