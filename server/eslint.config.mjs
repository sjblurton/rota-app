import js from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import sonarjs from "eslint-plugin-sonarjs";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unicorn from "eslint-plugin-unicorn";
import vitest from "eslint-plugin-vitest";
import { boundariesDependencyRules } from "./eslint/boundaries/dependencies.mjs";
import { boundariesElements } from "./eslint/boundaries/elements.mjs";
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
      // Use simple-import-sort for import order, Prettier for formatting
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
      "boundaries/elements": boundariesElements,
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
          rules: boundariesDependencyRules,
        },
      ],
    },
  },
];
