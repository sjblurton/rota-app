/**
 * Hooks layer dependency rules.
 *
 * Hooks (logic/state layer) can import other hooks, integrations, and libs,
 * but not components or routes to avoid circular dependencies.
 */

import { ELEMENT_TYPES } from './constants.mjs'

export const hooksDependencies = {
  from: { type: ELEMENT_TYPES.HOOKS },
  allow: [
    { to: { type: ELEMENT_TYPES.HOOKS } },
    { to: { type: ELEMENT_TYPES.INTEGRATIONS } },
    { to: { type: ELEMENT_TYPES.LIBS } },
  ],
}
