const globalTypes = ["libs", "utils", "docs", "types", "constants"];

const libsCanImportGeneratedPrisma = {
  from: [{ type: "libs" }, { type: "services" }, { type: "repositories" }],
  allow: { to: { type: "generated-prisma" } },
};

const globalTypesCanImportEachOther = globalTypes.map((type) => ({
  from: { type },
  allow: { to: { type: globalTypes } },
}));

const docsCanImportGlobalTypes = [
  {
    from: { type: "docs" },
    allow: { to: { type: globalTypes } },
  },
];

const appCanImportGlobalTypesAndRoutes = {
  from: { type: "app" },
  allow: [...globalTypes.map((type) => ({ to: { type } })), { to: { type: "routes" } }],
};

const routesCanImportApp = {
  from: { type: "routes" },
  allow: [{ to: { type: "app" } }],
};

const routesCanImportGlobalTypesAndRoutesAndApp = {
  from: { type: "routes" },
  allow: [
    ...globalTypes.map((type) => ({ to: { type } })),
    { to: { type: "routes" } },
    { to: { type: "app" } },
  ],
};

const controllersCanImportGlobalTypes = {
  from: { type: "controllers" },
  allow: [...globalTypes.map((type) => ({ to: { type } })), { to: { type: "controllers" } }],
};

const routesToControllers = {
  from: { type: "routes" },
  allow: [{ to: { type: "controllers" } }],
};

const controllersToServices = {
  from: { type: "controllers" },
  allow: [{ to: { type: "services" } }],
};

const servicesToGlobal = {
  from: { type: "services" },
  allow: [...globalTypes.map((type) => ({ to: { type } }))],
};

const repositoriesCanImportGlobalTypes = {
  from: [{ type: "repositories" }],
  allow: [...globalTypes.map((type) => ({ to: { type } })), { to: { type: "repositories" } }],
};

const servicesCanImportGlobalTypes = {
  from: [{ type: "services" }],
  allow: [...globalTypes.map((type) => ({ to: { type } })), { to: { type: "services" } }],
};

const servicesToSameModuleRepositories = {
  from: { type: "services" },
  allow: {
    to: { type: "repositories", captured: { moduleName: "{{from.captured.moduleName}}" } },
  },
};

// Export all rules
export const boundariesDependencyRules = [
  ...globalTypesCanImportEachOther,
  libsCanImportGeneratedPrisma,
  ...docsCanImportGlobalTypes,
  appCanImportGlobalTypesAndRoutes,
  routesCanImportApp,
  routesCanImportGlobalTypesAndRoutesAndApp,
  controllersCanImportGlobalTypes,
  routesToControllers,
  controllersToServices,
  servicesToSameModuleRepositories,
  servicesToGlobal,
  repositoriesCanImportGlobalTypes,
  servicesCanImportGlobalTypes,
];
