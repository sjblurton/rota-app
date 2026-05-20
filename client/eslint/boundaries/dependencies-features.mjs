/**
 * Features dependencies layers
 *
 * Features can import all shared code (routes, hooks, integrations, libs) but not the other way around.
 * Feature code can not be shared between features, but can be shared within a feature via the moduleName constraint.
 * This allows us to enforce that features are self-contained and do not have implicit dependencies on each other, while still allowing for shared code within a feature.
 *
 * Feature files can only be used in the routes layer via the moduleName constraint, which ensures that route files explicitly declare their dependencies on feature code. This prevents implicit dependencies and makes it clear which features a route depends on.
 */

import { ELEMENT_TYPES } from './constants.mjs'

export const featuresDependencies = {
  from: { type: ELEMENT_TYPES.FEATURES },
  allow: [
    {
      to: {
        type: ELEMENT_TYPES.FEATURES,
        captured: { moduleName: '{{from.captured.moduleName}}' },
      },
    },
    { to: { type: ELEMENT_TYPES.COMPONENTS } },
    { to: { type: ELEMENT_TYPES.HOOKS } },
    { to: { type: ELEMENT_TYPES.INTEGRATIONS } },
    { to: { type: ELEMENT_TYPES.LIBS } },
    { to: { type: ELEMENT_TYPES.UTILS } },
  ],
}
