/**
 * Home Feature dependency layers
 *
 * Features can import all shared code (routes, hooks, integrations, libs) but not the other way around.
 * Feature code can not be shared between the home feature but not other features.
 *
 * Home Feature files can only be used in the root routes (Home page) layer, which ensures that route files explicitly declare their dependencies on home feature code.
 * This prevents implicit dependencies and makes it clear which features a route depends on.
 */

import { ELEMENT_TYPES } from './constants.mjs'

export const homeFeatureDependencies = {
  from: { type: ELEMENT_TYPES.HOME_FEATURE },
  allow: [
    { to: { type: ELEMENT_TYPES.COMPONENTS } },
    { to: { type: ELEMENT_TYPES.HOOKS } },
    { to: { type: ELEMENT_TYPES.INTEGRATIONS } },
    { to: { type: ELEMENT_TYPES.LIBS } },
    { to: { type: ELEMENT_TYPES.ROUTES_ROOT } },
    { to: { type: ELEMENT_TYPES.HOME_FEATURE } },
  ],
}
