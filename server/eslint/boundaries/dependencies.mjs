// ---------------------------------------------
// Boundaries Dependency Rules (clean, DRY, and maintainable)
// ---------------------------------------------

// Global types (can be used by all modules/app)
const globalTypes = ["libs", "utils", "docs", "types", "constants", "prisma"];

// Allow routes to import from module
const routesToModuleControllers = {
  from: { type: "routes" },
  allow: { to: { type: "module-controllers" } },
};

// Allow libs to import from generated-prisma (for Prisma client)
const libsToGeneratedPrisma = {
  from: { type: "libs" },
  allow: { to: { type: "generated-prisma" } },
};

// Allow all global types to use each other
const globalToGlobal = globalTypes.map((type) => ({
  from: { type },
  allow: { to: { type: globalTypes } },
}));

// Allow all modules to use all global types
const modulesToGlobal = {
  from: { type: "module" },
  allow: { to: { type: globalTypes } },
};

// Allow module controllers to use all global types
const moduleControllersToGlobal = {
  from: { type: "module-controllers" },
  allow: { to: { type: globalTypes } },
};

// Allow docs to allow all other docs files (for cross-file references in docs)
const docsToDocs = [
  {
    from: { type: "docs" },
    allow: { to: { type: ["docs"] } },
  },
];

// Allow app to import from all global types and from routes
const appToGlobalAndRoutes = {
  from: { type: "app" },
  allow: [...globalTypes.map((type) => ({ to: { type } })), { to: { type: "routes" } }],
};

// Allow test files in routes to import app
const routesTestToApp = {
  from: { type: "routes" },
  allow: [{ to: { type: "app" } }],
};

// Allow routes to import from all global types (lib, utils, docs, docs-schemas), from any other file in routes, and from app entrypoint
const routesToGlobal = {
  from: { type: "routes" },
  allow: [
    ...globalTypes.map((type) => ({ to: { type } })),
    { to: { type: "routes" } },
    { to: { type: "app" } },
  ],
};

// Allow files within the same module to import each other
const moduleToSelf = {
  from: { type: "module", captured: { moduleName: "{{ from.captured.moduleName }}" } },
  allow: [
    { to: { type: "module", captured: { moduleName: "{{ from.captured.moduleName }}" } } },
    {
      to: {
        type: "module-controllers",
        captured: { moduleName: "{{ from.captured.moduleName }}" },
      },
    },
  ],
};

// Allow module controllers to import from files in the same module
const moduleControllersToSelf = {
  from: { type: "module-controllers", captured: { moduleName: "{{ from.captured.moduleName }}" } },
  allow: [
    { to: { type: "module", captured: { moduleName: "{{ from.captured.moduleName }}" } } },
    {
      to: {
        type: "module-controllers",
        captured: { moduleName: "{{ from.captured.moduleName }}" },
      },
    },
  ],
};

// Export all rules
export const boundariesDependencyRules = [
  ...globalToGlobal,
  modulesToGlobal,
  moduleControllersToGlobal,
  libsToGeneratedPrisma,
  moduleToSelf,
  moduleControllersToSelf,
  ...docsToDocs,
  routesToGlobal,
  appToGlobalAndRoutes,
  routesTestToApp,
  routesToModuleControllers,
];
