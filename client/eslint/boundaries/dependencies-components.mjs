/**
 * Components layer dependency rules.
 *
 * Components (UI presentational layer) are mid-tier and can import other components,
 * hooks, integrations, and libs. The singleton component layer has same rules.
 */

import { ELEMENT_TYPES } from './constants.mjs'

export const componentsSingletonDependencies = {
  from: { type: ELEMENT_TYPES.COMPONENTS_SINGLETON },
  allow: [
    { to: { type: ELEMENT_TYPES.COMPONENTS_SINGLETON } },
    { to: { type: ELEMENT_TYPES.COMPONENTS } },
    { to: { type: ELEMENT_TYPES.HOOKS } },
    { to: { type: ELEMENT_TYPES.INTEGRATIONS } },
    { to: { type: ELEMENT_TYPES.LIBS } },
  ],
}

export const componentsDependencies = {
  from: { type: ELEMENT_TYPES.COMPONENTS },
  allow: [
    { to: { type: ELEMENT_TYPES.COMPONENTS } },
    { to: { type: ELEMENT_TYPES.HOOKS } },
    { to: { type: ELEMENT_TYPES.INTEGRATIONS } },
    { to: { type: ELEMENT_TYPES.LIBS } },
  ],
}
