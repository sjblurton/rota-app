/**
 * Playwright boundary element definitions.
 *
 * Defines the 'playwright' element type for test files under src/playwright.
 * playwright can only import from itself to maintain isolation of test code from application code.
 */

import { ELEMENT_TYPES } from './constants.mjs'

export const playwrightDependencies = {
  from: { type: ELEMENT_TYPES.PLAYWRIGHT },
  allow: [{ to: { type: ELEMENT_TYPES.PLAYWRIGHT } }],
}
