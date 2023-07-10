// deno-lint-ignore-file require-await
import { matches, types as T } from "../deps.ts";

const { shape, boolean } = matches;

const matchBitcoindConfig = shape({
  rpc: shape({
    enable: boolean,
  }),
});

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
  }
};