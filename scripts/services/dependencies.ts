import { matches, types as T } from "../deps.ts";

const { shape, arrayOf, string, boolean } = matches;

const matchBitcoindConfig = shape({
    rpc: shape({
        enable: boolean,
    }),
});

const matchProxyConfig = shape({
  users: arrayOf(
    shape(
      {
        name: string,
        "allowed-calls": arrayOf(string),
        password: string,
      },
    )
  ),
});

function times<T>(fn: (i: number) => T, amount: number): T[] {
  const answer = new Array(amount);
  for (let i = 0; i < amount; i++) {
    answer[i] = fn(i);
  }
  return answer;
}

function randomItemString(input: string) {
  return input[Math.floor(Math.random() * input.length)];
}

const serviceName = "lightning-terminal";
const fullChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
type Check = {
  currentError(config: T.Config): string | void;
  fix(config: T.Config): T.Config;
};

const proxyChecks: Array<Check> = [
  {
    currentError(config) {
      if (!matchProxyConfig.test(config)) {
        return "Config is not the correct shape";
      }
      if (config.users.some((x) => x.name === serviceName)) {
        return;
      }
      return `Must have an RPC user named "${serviceName}"`;
    },
    fix(config) {
      config.users.push({
        name: serviceName,
        "allowed-calls": [],
        password: times(() => randomItemString(fullChars), 22).join(""),
      });
    },
  },
  ...[
    "echo",
    "getindexinfo",
    "getblockcount",
    "getchaintips",
    "getmempoolinfo",
    "getblockchaininfo",
    "getblockhash",
    "getblock",
    "getmempoolentry",
    "getrawtransaction",
    "getrawmempool",
    "gettxout",
    "validateaddress",
    "getblockstats",
    "getnetworkhashps",
    "getdifficulty",
  ].map(
    (operator): Check => ({
      currentError(config) {
        if (!matchProxyConfig.test(config)) {
          return "Config is not the correct shape";
        }
        if (config.users.find((x) => x.name === serviceName)?.["allowed-calls"]?.some((x) => x === operator) ?? false) {
          return;
        }
        return `RPC user "lightning-terminal" must have "${operator}" enabled`;
      },
      fix(config) {
        if (!matchProxyConfig.test(config)) {
          throw new Error("Config is not the correct shape");
        }
        const found = config.users.find((x) => x.name === serviceName);
        if (!found) {
          throw new Error("Users for lightning-terminal should exist");
        }
        found["allowed-calls"] = [...(found["allowed-calls"] ?? []), operator];
      },
    })
  ),
];

export const dependencies: T.ExpectedExports.dependencies = {
    bitcoind: {
        async check(effects, configInput) {
            effects.info("check bitcoind");
            const config = matchBitcoindConfig.unsafeCast(configInput);
            if (!config.rpc.enable) {
                return { error: 'Must have RPC enabled' };
            }
            return { result: null };
        },
        async autoConfigure(effects, configInput) {
            effects.info("autoconfigure bitcoind");
            const config = matchBitcoindConfig.unsafeCast(configInput);
            config.rpc.enable = true;
            return { result: config };
        },
    },
    "btc-rpc-proxy": {
        async check(effects, configInput) {
            effects.info("check btc-rpc-proxy");
            for (const checker of proxyChecks) {
              const error = checker.currentError(configInput);
              if (error) {
                effects.error(`throwing error: ${error}`);
                return { error };
              }
            }
            return { result: null };
        },
        async autoConfigure(effects, configInput) {
          effects.info("autoconfigure btc-rpc-proxy");
          for (const checker of proxyChecks) {
            const error = checker.currentError(configInput);
            if (error) {
              checker.fix(configInput);
            }
          }
          return { result: configInput };
        },
    },
};