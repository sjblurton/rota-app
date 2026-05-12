/**
 * Libs layer dependency rules.
 *
 * Libs (pure utilities/services) are the lowest tier and can only import from libs
 * to maintain strict isolation and prevent dependency bloat.
 */

import { ELEMENT_TYPES } from './constants.mjs'

export const libsDependencies = {
  from: { type: ELEMENT_TYPES.LIBS },
  allow: [{ to: { type: ELEMENT_TYPES.LIBS } }],
}
