import { compat, types as T } from "../deps.ts";

export const migration: T.ExpectedExports.migration = compat.migrations
  .fromMapping(
    {
      "0.7.0": {
        up: compat.migrations.updateConfig(
          (config) => {
            return config;
          },
          false,
          { version: "0.7.0", type: "up" },
        ),
        down: compat.migrations.updateConfig(
          (config) => {
            return config;
          },
          false,
          { version: "0.7.0", type: "down" },
        ),
      },
    },
    "0.7.0",
  );