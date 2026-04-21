import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./test/setup-env.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
      exclude: [
        "src/server.ts",
        "src/app.ts",
        "**/*.d.ts",
        "**/node_modules/**",
        "src/generated/**",
      ],
    },
  },
});
