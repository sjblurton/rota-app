import js from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    languageOptions: { globals: globals.browser },
  },
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { boundaries },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".mjs", ".cjs", ".ts", ".mts", ".cts", ".json"],
        },
      },
      "boundaries/elements": [
        {
          type: "docs-schemas-internal",
          pattern: "src/docs/internal/zod-openapi.ts",
          mode: "full",
        },
        {
          type: "docs-schemas",
          pattern: "src/docs/schemas.ts",
          mode: "full",
        },
        {
          type: "docs-internal",
          pattern: "src/docs/internal/**/*",
          mode: "full",
        },
        {
          type: "docs",
          pattern: "src/docs/**/*",
          mode: "full",
        },
        {
          type: "lib",
          pattern: "src/lib/**/*",
          mode: "full",
        },
        {
          type: "utils",
          pattern: "src/utils/**/*",
          mode: "full",
        },
        {
          type: "module",
          pattern: "src/modules/*/**/*",
          capture: ["moduleName"],
          mode: "full",
        },
        {
          type: "source",
          pattern: "src/**/*",
          mode: "full",
        },
      ],
    },
    rules: {
      ...boundaries.configs.recommended.rules,
      "boundaries/no-unknown": "error",
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: { type: "docs-schemas" },
              allow: { to: { type: ["docs-schemas-internal", "lib"] } },
            },
            {
              from: { type: "docs" },
              allow: {
                to: {
                  type: [
                    "docs",
                    "docs-schemas",
                    "docs-internal",
                    "module",
                    "lib",
                  ],
                },
              },
            },
            {
              from: { type: "module" },
              allow: [
                {
                  to: {
                    type: "module",
                    captured: { moduleName: "{{ from.captured.moduleName }}" },
                  },
                },
                { to: { type: ["docs", "docs-schemas", "lib", "utils"] } },
              ],
            },
            {
              from: { type: "lib" },
              allow: { to: { type: "lib" } },
            },
            {
              from: { type: "utils" },
              allow: { to: { type: ["utils", "lib"] } },
            },
            {
              from: { type: "source" },
              allow: { to: { type: ["source", "docs", "lib", "utils"] } },
            },
          ],
        },
      ],
    },
  },
];
