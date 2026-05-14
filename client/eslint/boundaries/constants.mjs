/**
 * Centralised constants for client ESLint boundaries configuration.
 *
 * Defines element type names, file patterns, and reusable arrays to avoid
 * duplication across dependencies and elements configurations.
 */

export const ELEMENT_TYPES = {
  APP: 'app',
  ROUTES_ROOT: 'routes-root',
  ROUTES: 'routes',
  COMPONENTS_SINGLETON: 'components-singleton',
  COMPONENTS: 'components',
  HOOKS: 'hooks',
  INTEGRATIONS: 'integrations',
  LIBS: 'libs',
  PLAYWRIGHT: 'playwright',
  FEATURES: 'features',
  HOME_FEATURE: 'home-feature',
}

export const ELEMENT_TYPE_VALUES = Object.values(ELEMENT_TYPES)

/**
 * File patterns for each boundary element.
 * Used by elements.mjs to define ESLint boundaries.
 */
export const ELEMENT_PATTERNS = {
  [ELEMENT_TYPES.APP]: {
    pattern: ['src/router.tsx', 'src/routeTree.gen.ts', '#/router', '#/routeTree.gen'],
    mode: 'full',
  },
  [ELEMENT_TYPES.ROUTES_ROOT]: {
    pattern: ['src/routes/*.{ts,tsx,js,jsx,mjs,cjs}', '#/routes/*.{ts,tsx,js,jsx,mjs,cjs}'],
    mode: 'full',
  },
  [ELEMENT_TYPES.ROUTES]: {
    pattern: ['src/routes/*/**/*', '#/routes/*/**/*'],
    capture: ['moduleName'],
    mode: 'full',
  },
  [ELEMENT_TYPES.COMPONENTS_SINGLETON]: {
    pattern: ['src/components/ApiErrorSnackbar/**/*', '#/components/ApiErrorSnackbar/**/*'],
    mode: 'full',
  },
  [ELEMENT_TYPES.COMPONENTS]: {
    pattern: ['src/components/**/*', '#/components/**/*'],
    mode: 'full',
  },
  [ELEMENT_TYPES.HOOKS]: {
    pattern: ['src/hooks/**/*', '#/hooks/**/*'],
    mode: 'full',
  },
  [ELEMENT_TYPES.INTEGRATIONS]: {
    pattern: ['src/integrations/**/*', '#/integrations/**/*'],
    mode: 'full',
  },
  [ELEMENT_TYPES.LIBS]: {
    pattern: ['src/libs/**/*', '#/libs/**/*'],
    mode: 'full',
  },
  [ELEMENT_TYPES.PLAYWRIGHT]: {
    pattern: ['src/playwright/**/*', '#/playwright/**/*'],
    mode: 'full',
  },
  [ELEMENT_TYPES.HOME_FEATURE]: {
    pattern: ['src/features/home/**/*', '#/features/home/**/*'],
    mode: 'full',
  },
  [ELEMENT_TYPES.FEATURES]: {
    pattern: ['src/features/*/**/*', '#/features/*/**/*'],
    capture: ['moduleName'],
    mode: 'full',
  },
}
