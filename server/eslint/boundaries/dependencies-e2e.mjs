import { globalTypes, ESLINT_BOUNDARIES_ELEMENTS } from './constants.mjs'

const e2eCanImportGlobal = {
  from: { type: ESLINT_BOUNDARIES_ELEMENTS.E2E },
  allow: [{ to: { type: globalTypes } }],
}

const e2eCanImportApp = {
  from: { type: ESLINT_BOUNDARIES_ELEMENTS.E2E },
  allow: [{ to: { type: ESLINT_BOUNDARIES_ELEMENTS.APP } }],
}

const e2eCanImportTestUtils = {
  from: { type: ESLINT_BOUNDARIES_ELEMENTS.E2E },
  allow: [{ to: { type: ESLINT_BOUNDARIES_ELEMENTS.TEST_UTILS } }],
}

export const e2eImportRules = [e2eCanImportGlobal, e2eCanImportApp, e2eCanImportTestUtils]
