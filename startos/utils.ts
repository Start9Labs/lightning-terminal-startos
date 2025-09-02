export const randomPassword = {
  charset: 'a-z,A-Z,1-9,!,@,$,%,&,*',
  len: 22,
}
export const litDir = '/root'
export const lndMount = '/mnt/lnd'
export const uiPort = 8443

export const configDefaults = {
  uipassword: null,
  'lit-dir': litDir,
  'insecure-httplisten': `lightning-terminal.startos:${uiPort}`,
  'remote.lnd.rpcserver': 'lnd.startos:10009',
  'remote.lnd.macaroonpath': `${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon`,
  'remote.lnd.tlscertpath': `${lndMount}/tls.cert`,
}
