import { ESLINT_BOUNDARIES_ELEMENTS, globalTypes } from "./constants.mjs";

const testUtilsCanImportGlobalTypes = {
  from: { type: ESLINT_BOUNDARIES_ELEMENTS.TEST_UTILS },
  allow: [...globalTypes.map((type) => ({ to: { type } }))],
};

const testUtilsCanImportSharedRoutes = {
  from: { type: ESLINT_BOUNDARIES_ELEMENTS.TEST_UTILS },
  allow: [
    {
      to: {
        type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_ROUTES,
      },
    },
  ],
};

const testUtilsCanImportFeatureRoutes = {
  from: { type: ESLINT_BOUNDARIES_ELEMENTS.TEST_UTILS },
  allow: [
    {
      to: {
        type: ESLINT_BOUNDARIES_ELEMENTS.ROUTES,
      },
    },
  ],
};

export const testUtilsImportRules = [
  testUtilsCanImportGlobalTypes,
  testUtilsCanImportSharedRoutes,
  testUtilsCanImportFeatureRoutes,
];
