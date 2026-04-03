import { defineConfig, mergeConfig } from "vitest/config";

import baseConfig from "./vitest.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      include: ["src/**/*.int.test.ts"],
      globalSetup: "./test/global-int-setup.ts",
      fileParallelism: false,
    },
  }),
);
