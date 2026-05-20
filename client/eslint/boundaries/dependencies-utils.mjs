/**
 * @fileoverview ESLint rule to enforce architectural boundaries based on defined element types and their allowed dependencies.
 * This file contains constants and utility functions used by the boundaries rule.
 * It defines the element types, their associated file patterns, and the allowed dependencies for each type.
 * The configurations are designed to be easily extendable and maintainable, minimising
 * duplication across different boundary rules while ensuring clear and strict architectural guidelines.
 */

import { ELEMENT_TYPES } from './constants.mjs'

export const utilsDependencies = {
  from: { type: ELEMENT_TYPES.UTILS },
  allow: [{ to: { type: ELEMENT_TYPES.UTILS } }],
}
