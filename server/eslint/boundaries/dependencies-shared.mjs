import { globalTypes, sharedElements, ESLINT_BOUNDARIES_ELEMENTS } from "./constants.mjs";

const sharedElementsCanImportGlobalElements = sharedElements.map((type) => ({
  from: { type },
  allow: [
    {
      to: { type: [...globalTypes] },
    },
  ],
}));

const sharedRoutesCanImportSharedRoutesOfTheSameModule = {
  from: {
    type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_ROUTES,
    captured: { moduleName: "{{from.captured.moduleName}}" },
  },
  allow: [
    {
      to: {
        type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_ROUTES,
        captured: { moduleName: "{{from.captured.moduleName}}" },
      },
    },
  ],
};

const sharedRoutesCanImportFeatureRoutes = {
  from: { type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_ROUTES },
  allow: [
    {
      to: {
        type: ESLINT_BOUNDARIES_ELEMENTS.ROUTES,
      },
    },
  ],
};

const sharedRepositoriesCanImportRepositoriesOfTheSameNameOrAnyIfTransactions = [
  {
    from: {
      type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_REPOSITORIES,
      captured: { moduleName: "transactions" },
    },
    allow: [
      {
        to: { type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_REPOSITORIES },
      },
    ],
  },
  {
    from: {
      type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_REPOSITORIES,
      captured: { moduleName: "{{from.captured.moduleName}}" },
    },
    allow: [
      {
        to: {
          type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_REPOSITORIES,
          captured: { moduleName: "{{from.captured.moduleName}}" },
        },
      },
    ],
  },
];

const sharedDocsImportRules = [
  {
    from: { type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_DOCS },
    allow: [
      { to: { type: ESLINT_BOUNDARIES_ELEMENTS.DOCS } },
      { to: { type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_DOCS } },
    ],
  },
];

const sharedServicesImportRules = [
  {
    from: { type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_SERVICES },
    allow: [{ to: { type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_SERVICES } }],
  },
  {
    from: {
      type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_SERVICES,
      captured: { moduleName: "{{from.captured.moduleName}}" },
    },
    allow: [
      {
        to: {
          type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_REPOSITORIES,
          captured: { moduleName: "{{from.captured.moduleName}}" },
        },
      },
    ],
  },
];

export const sharedImportRules = [
  ...sharedElementsCanImportGlobalElements,
  sharedRoutesCanImportSharedRoutesOfTheSameModule,
  sharedRoutesCanImportFeatureRoutes,
  ...sharedDocsImportRules,
  ...sharedServicesImportRules,
  ...sharedRepositoriesCanImportRepositoriesOfTheSameNameOrAnyIfTransactions,
];
