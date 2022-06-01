#!/bin/bash

DURATION=$(</dev/stdin)
if (($DURATION <= 5500)); then
    exit 60
else
    if curl --silent --fail lightning-terminal.embassy:8443 &>/dev/null; then
        echo "Lightning Terminal UI is unreachable" >&2
        exit 1
    fi
fi