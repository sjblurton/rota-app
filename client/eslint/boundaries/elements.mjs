/**
 * Client ESLint boundaries element definitions.
 *
 * Defines 8 architectural layers: app (entry), routes, components, hooks,
 * integrations, libs, and playwright. Each element type has file patterns and capture rules.
 */

import { ELEMENT_PATTERNS, ELEMENT_TYPES } from './constants.mjs'

/**
 * Convert element type constants and patterns into ESLint boundaries elements array.
 * @returns {Array} ESLint boundaries elements configuration
 */
export function getElements() {
  return [
    {
      type: ELEMENT_TYPES.APP,
      ...ELEMENT_PATTERNS[ELEMENT_TYPES.APP],
    },
    {
      type: ELEMENT_TYPES.ROUTES_ROOT,
      ...ELEMENT_PATTERNS[ELEMENT_TYPES.ROUTES_ROOT],
    },
    {
      type: ELEMENT_TYPES.ROUTES,
      ...ELEMENT_PATTERNS[ELEMENT_TYPES.ROUTES],
    },
    {
      type: ELEMENT_TYPES.HOME_FEATURE,
      ...ELEMENT_PATTERNS[ELEMENT_TYPES.HOME_FEATURE],
    },
    {
      type: ELEMENT_TYPES.FEATURES,
      ...ELEMENT_PATTERNS[ELEMENT_TYPES.FEATURES],
    },
    {
      type: ELEMENT_TYPES.COMPONENTS_SINGLETON,
      ...ELEMENT_PATTERNS[ELEMENT_TYPES.COMPONENTS_SINGLETON],
    },
    {
      type: ELEMENT_TYPES.COMPONENTS,
      ...ELEMENT_PATTERNS[ELEMENT_TYPES.COMPONENTS],
    },
    {
      type: ELEMENT_TYPES.HOOKS,
      ...ELEMENT_PATTERNS[ELEMENT_TYPES.HOOKS],
    },
    {
      type: ELEMENT_TYPES.INTEGRATIONS,
      ...ELEMENT_PATTERNS[ELEMENT_TYPES.INTEGRATIONS],
    },
    {
      type: ELEMENT_TYPES.LIBS,
      ...ELEMENT_PATTERNS[ELEMENT_TYPES.LIBS],
    },
    {
      type: ELEMENT_TYPES.PLAYWRIGHT,
      ...ELEMENT_PATTERNS[ELEMENT_TYPES.PLAYWRIGHT],
    },
    {
      type: ELEMENT_TYPES.UTILS,
      ...ELEMENT_PATTERNS[ELEMENT_TYPES.UTILS],
    },
  ]
}
