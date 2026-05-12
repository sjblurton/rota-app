/**
 * Routes layer dependency rules.
 *
 * The routes layer (file-based routing) can import components, hooks, integrations,
 * and libs. Routes at the same level can import each other via the moduleName constraint.
 */

import { ELEMENT_TYPES } from './constants.mjs'

export const routesRootDependencies = {
  from: { type: ELEMENT_TYPES.ROUTES_ROOT },
  allow: [
    { to: { type: ELEMENT_TYPES.ROUTES_ROOT } },
    { to: { type: ELEMENT_TYPES.COMPONENTS_SINGLETON } },
    { to: { type: ELEMENT_TYPES.COMPONENTS } },
    { to: { type: ELEMENT_TYPES.HOOKS } },
    { to: { type: ELEMENT_TYPES.INTEGRATIONS } },
    { to: { type: ELEMENT_TYPES.LIBS } },
  ],
}

export const routesDependencies = {
  from: { type: ELEMENT_TYPES.ROUTES },
  allow: [
    {
      to: {
        type: ELEMENT_TYPES.ROUTES,
        captured: { moduleName: '{{from.captured.moduleName}}' },
      },
    },
    { to: { type: ELEMENT_TYPES.COMPONENTS } },
    { to: { type: ELEMENT_TYPES.HOOKS } },
    { to: { type: ELEMENT_TYPES.INTEGRATIONS } },
    { to: { type: ELEMENT_TYPES.LIBS } },
  ],
}
