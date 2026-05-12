/**
 * Integrations layer dependency rules.
 *
 * Integrations (external library wrappers) can import other integrations and libs,
 * but not higher layers (components, hooks, routes, app) to keep external concerns isolated.
 */

import { ELEMENT_TYPES } from './constants.mjs'

export const integrationsDependencies = {
  from: { type: ELEMENT_TYPES.INTEGRATIONS },
  allow: [{ to: { type: ELEMENT_TYPES.INTEGRATIONS } }, { to: { type: ELEMENT_TYPES.LIBS } }],
}
