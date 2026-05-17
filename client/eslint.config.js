// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import boundaries from 'eslint-plugin-boundaries'
import sonarjs from 'eslint-plugin-sonarjs'
import storybook from 'eslint-plugin-storybook'
// @ts-ignore -- eslint-plugin-unicorn does not ship type declarations
import unicorn from 'eslint-plugin-unicorn'
import vitest from 'eslint-plugin-vitest'

import customPlugin from './eslint/plugin.mjs'
import { getElements } from './eslint/boundaries/elements.mjs'
import { getDependencies } from './eslint/boundaries/dependencies.mjs'

const clientBoundariesElements = getElements()
const clientBoundariesDependencyRules = getDependencies()

export default [
  ...tanstackConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    rules: {
      eqeqeq: ['error', 'smart'],
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
  },
  {
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    rules: {
      'storybook/meta-satisfies-type': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    plugins: { sonarjs, unicorn },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-duplicate-imports': 'error',
      'no-unused-vars': 'off',
      'prefer-template': 'error',
      complexity: ['error', 12],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variableLike',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'property',
          modifiers: ['requiresQuotes'],
          format: null,
        },
        {
          selector: 'property',
          format: ['camelCase', 'snake_case', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                './index',
                './index.ts',
                '../index',
                '../index.ts',
                '../../index',
                '../../index.ts',
              ],
              message: 'Do not import from barrel files. Import from explicit module files.',
            },
          ],
        },
      ],
      'sonarjs/cognitive-complexity': ['error', 20],
      'unicorn/no-abusive-eslint-disable': 'error',
      'unicorn/prefer-node-protocol': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/**/*.test.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignorePrimitives: { boolean: true } },
      ],
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
    },
  },
  {
    files: ['src/**/*.test.{ts,tsx}'],
    plugins: { vitest },
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      'no-restricted-imports': 'off',
      'vitest/no-focused-tests': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['src/routeTree.gen.ts'],
    rules: {
      'unicorn/no-abusive-eslint-disable': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts', '.json'],
        },
      },
      'boundaries/elements': clientBoundariesElements,
    },
    rules: {
      ...boundaries.configs.recommended.rules,
      'boundaries/no-unknown': 'error',
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: clientBoundariesDependencyRules,
        },
      ],
    },
  },
  {
    files: ['src/components/**/*.{ts,tsx}', 'src/routes/**/*.{ts,tsx}'],
    ignores: ['**/*.test.{ts,tsx}'],
    plugins: { custom: customPlugin },
    rules: {
      'custom/require-callback-hook': 'warn',
      'custom/require-event-callback-hook': 'warn',
    },
  },
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      'public/mockServiceWorker.js',
      'storybook-static/**',
    ],
  },
  ...storybook.configs['flat/recommended'],
]
