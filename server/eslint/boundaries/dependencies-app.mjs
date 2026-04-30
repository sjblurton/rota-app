import { globalTypes, ESLINT_BOUNDARIES_ELEMENTS } from "./constants.mjs";

export const appImportRules = [
  {
    from: { type: ESLINT_BOUNDARIES_ELEMENTS.APP },
    allow: [
      { to: { type: globalTypes } },
      { to: { type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_DOCS } },
      { to: { type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_ROUTERS } },
      { to: { type: ESLINT_BOUNDARIES_ELEMENTS.ROUTERS } },
      { to: { type: ESLINT_BOUNDARIES_ELEMENTS.MIDDLEWARE } },
      { to: { type: ESLINT_BOUNDARIES_ELEMENTS.APP } },
    ],
  },
];
