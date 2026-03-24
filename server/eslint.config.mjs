import js from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import sonarjs from "eslint-plugin-sonarjs";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unicorn from "eslint-plugin-unicorn";
import vitest from "eslint-plugin-vitest";
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
    files: ["src/**/*.ts"],
    ignores: ["src/**/*.test.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["src/**/*.ts"],
    ignores: ["src/**/*.test.ts"],
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/return-await": ["error", "in-try-catch"],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
    },
  },
  {
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      sonarjs,
      unicorn,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      eqeqeq: ["error", "smart"],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-unused-vars": "off",
      "no-duplicate-imports": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variableLike",
          format: ["camelCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "property",
          modifiers: ["requiresQuotes"],
          format: null,
        },
        {
          selector: "property",
          format: ["camelCase", "snake_case", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "./index",
                "./index.ts",
                "../index",
                "../index.ts",
                "../../index",
                "../../index.ts",
              ],
              message: "Do not import from barrel files. Import from explicit module files.",
            },
          ],
        },
      ],
      complexity: ["error", 12],
      "sonarjs/cognitive-complexity": ["error", 20],
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/prefer-node-protocol": "error",
    },
  },
  {
    files: ["src/**/*.test.ts"],
    plugins: { vitest },
    rules: {
      "vitest/no-focused-tests": "error",
    },
  },
  {
    files: ["src/{docs,modules}/**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { unicorn },
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          multipleFileExtensions: true,
        },
      ],
    },
  },

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
          type: "module-db",
          pattern: "src/modules/*/db/**/*",
          capture: ["moduleName"],
          mode: "full",
        },
        {
          type: "module-services",
          pattern: "src/modules/*/services/**/*",
          capture: ["moduleName"],
          mode: "full",
        },
        {
          type: "module-controllers",
          pattern: "src/modules/*/controllers/**/*",
          capture: ["moduleName"],
          mode: "full",
        },
        {
          type: "module-router",
          pattern: "src/modules/*/routes/*router.ts",
          capture: ["moduleName"],
          mode: "full",
        },
        {
          type: "module-routes",
          pattern: "src/modules/*/routes/**/*",
          capture: ["moduleName"],
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
          pattern: "src/*.*",
          mode: "full",
        },
      ],
    },
    rules: {
      ...boundaries.configs.recommended.rules,
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression[callee.property.name='datetime'][callee.object.type='CallExpression'][callee.object.callee.property.name='string'][callee.object.callee.object.name='z']",
          message: "z.string().datetime() is deprecated in Zod v4. Use z.iso.datetime() instead.",
        },
        {
          selector: "CallExpression[callee.property.name='merge']",
          message: ".merge() is deprecated in Zod v4. Use .and() to combine schemas instead.",
        },
        {
          selector:
            "CallExpression[callee.property.name='object'][callee.object.name='z'] > ObjectExpression > Property[key.type='Identifier']:not([key.name=/^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/])",
          message: "API schema field names must use snake_case.",
        },
      ],
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
                  type: ["docs", "docs-schemas", "docs-internal", "module", "module-routes", "lib"],
                },
              },
            },
            {
              from: { type: "module-db" },
              allow: [
                {
                  to: {
                    type: "module-db",
                    captured: { moduleName: "{{ from.captured.moduleName }}" },
                  },
                },
                { to: { type: ["docs", "docs-schemas", "lib", "utils"] } },
              ],
            },
            {
              from: { type: "module-services" },
              allow: [
                {
                  to: {
                    type: "module-services",
                    captured: { moduleName: "{{ from.captured.moduleName }}" },
                  },
                },
                {
                  to: {
                    type: "module-db",
                    captured: { moduleName: "{{ from.captured.moduleName }}" },
                  },
                },
                { to: { type: ["docs", "docs-schemas", "lib", "utils"] } },
              ],
            },
            {
              from: { type: "module-controllers" },
              allow: [
                {
                  to: {
                    type: "module-controllers",
                    captured: { moduleName: "{{ from.captured.moduleName }}" },
                  },
                },
                {
                  to: {
                    type: "module-services",
                    captured: { moduleName: "{{ from.captured.moduleName }}" },
                  },
                },
                { to: { type: ["docs", "docs-schemas", "lib", "utils"] } },
              ],
            },
            {
              from: { type: "module-router" },
              allow: [
                {
                  to: {
                    type: "module-router",
                    captured: { moduleName: "{{ from.captured.moduleName }}" },
                  },
                },
                {
                  to: {
                    type: "module-controllers",
                    captured: { moduleName: "{{ from.captured.moduleName }}" },
                  },
                },
                {
                  to: {
                    type: "module-routes",
                    captured: { moduleName: "{{ from.captured.moduleName }}" },
                  },
                },
                { to: { type: ["docs", "docs-schemas", "lib", "utils"] } },
              ],
            },
            {
              from: { type: "module-routes" },
              allow: [
                {
                  to: {
                    type: "module-routes",
                    captured: { moduleName: "{{ from.captured.moduleName }}" },
                  },
                },
                {
                  to: {
                    type: "module-router",
                    captured: { moduleName: "{{ from.captured.moduleName }}" },
                  },
                },
                {
                  to: {
                    type: "module-controllers",
                    captured: { moduleName: "{{ from.captured.moduleName }}" },
                  },
                },
                { to: { type: ["docs", "docs-schemas", "lib", "utils"] } },
              ],
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
              allow: [
                { to: { type: ["source", "docs", "lib", "utils"] } },
                { to: { type: "module-router" } },
              ],
            },
          ],
        },
      ],
    },
  },
];
