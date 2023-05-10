#!/bin/bash

_term() { 
  echo "Caught SIGTERM signal!" 
  kill -TERM "$lightning_terminal_process" 2>/dev/null
}
# Setting variables
sleep 5
LND_ADDRESS='lnd.embassy'
LITD_PASS=$(yq e '.password' /data/start9/config.yaml)
RPC_USER=$(yq e '.bitcoind-user' /data/start9/config.yaml)
RPC_PASS=$(yq e '.bitcoind-password' /data/start9/config.yaml)
RPC_HOST="bitcoind.embassy"
MACAROON_HEADER="Grpc-Metadata-macaroon: $(xxd -ps -u -c 1000 /mnt/lnd/admin.macaroon)"
# Creating lit.conf
echo "
remote.lnd.rpcserver="$LND_ADDRESS":10009
remote.lnd.macaroonpath=/mnt/lnd/admin.macaroon
remote.lnd.tlscertpath=/mnt/lnd/tls.cert
faraday.connect_bitcoin=1
faraday.bitcoin.host="$RPC_HOST":8332
faraday.bitcoin.user="$RPC_USER"
faraday.bitcoin.password="$RPC_PASS"
" > /data/.lit/lit.conf
echo "Running on Bitcoin Core..."
until curl --silent --fail --cacert /mnt/lnd/tls.cert --header "$MACAROON_HEADER" https://lnd.embassy:8080/v1/getinfo &>/dev/null
do
    echo "LND Server is unreachable. Are you sure the LND service is running?" 
    sleep 5
done
echo "Configuring LiT..."
# Removing any old data in the lit folder
rm -f /data/.lit/mainnet/lit.macaroon
# Copying the TLS cert for LND to the faraday working mainnet folder
cp /data/.lit/tls.cert /data/.faraday/mainnet/tls.cert
# Properties Page showing password to be used for login
  echo 'version: 2' > /data/start9/stats.yaml
  echo 'data:' >> /data/start9/stats.yaml
  echo '  Password: ' >> /data/start9/stats.yaml
        echo '    type: string' >> /data/start9/stats.yaml
        echo "    value: \"$LITD_PASS\"" >> /data/start9/stats.yaml
        echo '    description: This is your admin password for Lightning Terminal. Please use caution when sharing this password, you could lose your funds!' >> /data/start9/stats.yaml
        echo '    copyable: true' >> /data/start9/stats.yaml
        echo '    masked: true' >> /data/start9/stats.yaml
        echo '    qr: false' >> /data/start9/stats.yaml

echo "Starting LiT..."
/bin/litd --uipassword=$LITD_PASS --macaroonpath=/data/.lit/mainnet/lit.macaroon --lit-dir=/data/.lit --tlscertpath=/data/.lit/tls.cert --tlskeypath=/data/.lit/tls.key --insecure-httplisten=lightning-terminal.embassy:8443 & 
lightning_terminal_process=$!


trap _term SIGTERM

wait $lightning_terminal_process
