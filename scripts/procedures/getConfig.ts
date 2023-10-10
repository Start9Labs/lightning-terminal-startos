import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "tor-address": {
    "name": "Tor Address",
    "description": "The Tor address of the network interface",
    "type": "pointer",
    "subtype": "package",
    "package-id": "lightning-terminal",
    "target": "tor-address",
    "interface": "main",
  },
  "password": {
    "type": "string",
    "name": "Lightning Terminal Password",
    "description": "Administrator password for Lightning Terminal",
    "nullable": false,
    "copyable": true,
    "masked": true,
    "default": {
      "charset": "a-z,A-Z,0-9",
      "len": 22
    }
  },
});
