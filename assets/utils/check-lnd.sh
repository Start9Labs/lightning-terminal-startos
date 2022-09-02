#!/bin/bash

MACAROON_HEADER="Grpc-Metadata-macaroon: $(xxd -ps -u -c 1000 /mnt/lnd/admin.macaroon)"
DURATION=$(</dev/stdin)
if (($DURATION <= 5500)); then
    exit 60
else
    curl --silent --fail --cacert /mnt/lnd/tls.cert --header "$MACAROON_HEADER" https://lnd.embassy:8080/v1/getinfo &>/dev/null
    WEB_RES=$?
    if [ $WEB_RES != 0 ]; then
        echo "LND Server is unreachable" >&2
        exit 1
    fi
fi