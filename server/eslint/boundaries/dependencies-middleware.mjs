import { ESLINT_BOUNDARIES_ELEMENTS, globalTypes } from "./constants.mjs";

const middlewareCanImportGolbalTypes = {
  from: { type: ESLINT_BOUNDARIES_ELEMENTS.MIDDLEWARE },
  allow: [
    {
      to: { type: [...globalTypes] },
    },
  ],
};

const middlewareCanImportMiddleware = {
  from: { type: ESLINT_BOUNDARIES_ELEMENTS.MIDDLEWARE },
  allow: [
    {
      to: { type: ESLINT_BOUNDARIES_ELEMENTS.MIDDLEWARE },
    },
  ],
};

export const middlewareImportRules = [
  middlewareCanImportGolbalTypes,
  middlewareCanImportMiddleware,
];
