import { globalTypes, featureElements, ESLINT_BOUNDARIES_ELEMENTS } from "./constants.mjs";

const featuresCanImportGlobalTypes = featureElements.map((type) => ({
  from: { type },
  allow: [...globalTypes.map((type) => ({ to: { type } }))],
}));

const featureElementsCanImportSameFeature = featureElements.map((type) => ({
  from: { type },
  allow: [
    {
      to: { type, captured: { moduleName: "{{from.captured.moduleName}}" } },
    },
  ],
}));

const featureToSharedElementRules = [
  {
    from: { type: ESLINT_BOUNDARIES_ELEMENTS.CONTROLLERS },
    allow: [{ to: { type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_SERVICES } }],
  },
  {
    from: { type: ESLINT_BOUNDARIES_ELEMENTS.DOCS },
    allow: [{ to: { type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_DOCS } }],
  },
];

const featureRoutesCanImportFeatureControllers = {
  from: {
    type: ESLINT_BOUNDARIES_ELEMENTS.ROUTERS,
    captured: { moduleName: "{{from.captured.moduleName}}" },
  },
  allow: [
    {
      to: {
        type: ESLINT_BOUNDARIES_ELEMENTS.CONTROLLERS,
        captured: { moduleName: "{{from.captured.moduleName}}" },
      },
    },
  ],
};

export const featureImportRules = [
  ...featuresCanImportGlobalTypes,
  ...featureElementsCanImportSameFeature,
  ...featureToSharedElementRules,
  featureRoutesCanImportFeatureControllers,
];
