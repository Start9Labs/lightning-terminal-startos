#!/bin/bash

DURATION=$(</dev/stdin)
if (($DURATION <= 5500)); then
    exit 60
else
    curl --silent --fail lightning-terminal.embassy:8443 &>/dev/null
    WEB_RES=$?
    if [ $WEB_RES != 0 ]; then
        echo "Lightning Terminal UI is unreachable, please wait" >&2
        exit 61
    fi
fi