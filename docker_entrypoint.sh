#!/bin/bash

_term() { 
  echo "Caught SIGTERM signal!" 
  kill -TERM "$lightning_terminal_process" 2>/dev/null
}
# Setting variables
LND_ADDRESS='lnd.embassy'
export LITD_PASS=$(yq e '.password' /root/start9/config.yaml)
MACAROON_HEADER="Grpc-Metadata-macaroon: $(xxd -ps -u -c 1000 /mnt/lnd/admin.macaroon)"

# Creating lit.conf
mkdir -p /root/.lit
echo "
remote.lnd.rpcserver="$LND_ADDRESS":10009
remote.lnd.macaroonpath=/mnt/lnd/admin.macaroon
remote.lnd.tlscertpath=/mnt/lnd/tls.cert
" > /root/.lit/lit.conf
until curl --silent --fail --cacert /mnt/lnd/tls.cert --header "$MACAROON_HEADER" https://lnd.embassy:8080/v1/getinfo &>/dev/null
do
    echo "LND Server is unreachable. Are you sure the LND service is running?" 
    sleep 5
done
echo "Configuring LiT..."
# Removing any old data in the lit folder
rm -f /root/.lit/mainnet/lit.macaroon
# Properties Page showing password to be used for login
  echo 'version: 2' > /root/start9/stats.yaml
  echo 'data:' >> /root/start9/stats.yaml
  echo '  Password: ' >> /root/start9/stats.yaml
  echo '    type: string' >> /root/start9/stats.yaml
  echo "    value: \"$LITD_PASS\"" >> /root/start9/stats.yaml
  echo '    description: This is your admin password for Lightning Terminal. Please use caution when sharing this password, you could lose your funds!' >> /root/start9/stats.yaml
  echo '    copyable: true' >> /root/start9/stats.yaml
  echo '    masked: true' >> /root/start9/stats.yaml
  echo '    qr: false' >> /root/start9/stats.yaml

echo "Starting LiT..."
/bin/litd --uipassword_env=LITD_PASS --macaroonpath=/root/.lit/mainnet/lit.macaroon --lit-dir=/root/.lit --tlscertpath=/root/.lit/tls.cert --tlskeypath=/root/.lit/tls.key --insecure-httplisten=lightning-terminal.embassy:8443 & 
lightning_terminal_process=$!


trap _term SIGTERM

wait $lightning_terminal_process
