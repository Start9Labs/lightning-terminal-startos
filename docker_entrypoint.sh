#!/bin/bash

_term() { 
  echo "Caught SIGTERM signal!" 
  kill -TERM "$lightning_terminal_process" 2>/dev/null
}
# Setting variables
# TOR_ADDRESS=$(yq e '.tor-address' /root/start9/config.yaml)
# LAN_ADDRESS=$(yq e '.lan-address' /root/start9/config.yaml)
LND_ADDRESS='lnd.embassy'
LITD_PASS=$(yq e '.password' /root/start9/config.yaml)
RPC_TYPE=$(yq e '.bitcoind.type' /root/start9/config.yaml)
RPC_USER=$(yq e '.bitcoind.user' /root/start9/config.yaml)
RPC_PASS=$(yq e '.bitcoind.password' /root/start9/config.yaml)
if [ "$RPC_TYPE" = "internal-proxy" ]; then
	RPC_HOST="btc-rpc-proxy.embassy"
	echo "Running on Bitcoin Proxy..."
else
	RPC_HOST="bitcoind.embassy"
	echo "Running on Bitcoin Core..."
fi
echo "Configuring LiT..."
# Removing any old data in the lit.conf file
rm -f /root/.lit/lit.conf
# Copying the TLS cert for LND to the faraday working mainnet folder
cp /root/.lit/tls.cert /root/.faraday/mainnet/tls.cert
# Creating lit.conf
echo "
remote.lnd.rpcserver="$LND_ADDRESS":10009
remote.lnd.macaroonpath=/mnt/lnd/admin.macaroon
remote.lnd.tlscertpath=/mnt/lnd/tls.cert
faraday.connect_bitcoin=1
faraday.bitcoin.host="$RPC_HOST":8332
faraday.bitcoin.user="$RPC_USER"
faraday.bitcoin.password="$RPC_PASS"
" >> /root/.lit/lit.conf
# Properties Page showing password to be used for login
  echo 'version: 2' >> /root/start9/stats.yaml
  echo 'data:' >> /root/start9/stats.yaml
  echo '  Password: ' >> /root/start9/stats.yaml
        echo '    type: string' >> /root/start9/stats.yaml
        echo "    value: \"$LITD_PASS\"" >> /root/start9/stats.yaml
        echo '    description: This is your admin password for Lightning Terminal. Please use caution when sharing this password, you could lose your funds!' >> /root/start9/stats.yaml
        echo '    copyable: true' >> /root/start9/stats.yaml
        echo '    masked: true' >> /root/start9/stats.yaml
        echo '    qr: false' >> /root/start9/stats.yaml
echo "Starting LiT..."
/bin/litd --uipassword=$LITD_PASS --lit-dir=~/.lit --insecure-httplisten=lightning-terminal.embassy:8443

trap _term SIGTERM
wait -n $lightning_terminal_process