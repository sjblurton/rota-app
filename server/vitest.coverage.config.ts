import { defineConfig, mergeConfig } from "vitest/config";

import baseConfig from "./vitest.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      globalSetup: "./test/global-int-setup.ts",
      fileParallelism: false,
    },
  }),
);
