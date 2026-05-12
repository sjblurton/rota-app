/**
 * App layer dependency rules.
 *
 * The app layer (router entry point) is the highest level and can import
 * from all other layers: routes, components, hooks, integrations, and libs.
 */

import { ELEMENT_TYPES } from './constants.mjs'

export const appDependencies = {
  from: { type: ELEMENT_TYPES.APP },
  allow: [
    { to: { type: ELEMENT_TYPES.APP } },
    { to: { type: ELEMENT_TYPES.ROUTES_ROOT } },
    { to: { type: ELEMENT_TYPES.ROUTES } },
    { to: { type: ELEMENT_TYPES.COMPONENTS } },
    { to: { type: ELEMENT_TYPES.HOOKS } },
    { to: { type: ELEMENT_TYPES.INTEGRATIONS } },
    { to: { type: ELEMENT_TYPES.LIBS } },
  ],
}
