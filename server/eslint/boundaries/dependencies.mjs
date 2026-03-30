// ---------------------------------------------
// Boundaries Dependency Rules (clean, DRY, and maintainable)
// ---------------------------------------------

// Global types (can be used by all modules/app)
const globalTypes = ["lib", "utils", "docs", "docs-schemas"];

// Internal docs types (not global)
const internalDocsTypes = ["docs-internal", "docs-schemas-internal"];

// All module types
const moduleTypes = [
  "module",
  "module-db",
  "module-services",
  "module-controllers",
  "module-router",
  "module-routes",
  "module-bootstrap",
  "module-utils",
];

// App-level types
const appTypes = ["app-bootstrap", "source"];

// Allow all global types to use each other
const globalToGlobal = globalTypes.map((type) => ({
  from: { type },
  allow: { to: { type: globalTypes } },
}));

// Allow all modules to use all global types
const modulesToGlobal = moduleTypes.map((type) => ({
  from: { type },
  allow: { to: { type: globalTypes } },
}));

// Allow app-level types to use all global types
const appToGlobal = appTypes.map((type) => ({
  from: { type },
  allow: { to: { type: globalTypes } },
}));

// Allow docs and docs-schemas to use their internal types
const docsToInternal = [
  {
    from: { type: "docs" },
    allow: { to: { type: internalDocsTypes } },
  },
  {
    from: { type: "docs-schemas" },
    allow: { to: { type: internalDocsTypes } },
  },
];

// Allow docs and docs-schemas to use each other
const docsToDocs = [
  {
    from: { type: "docs" },
    allow: { to: { type: ["docs", "docs-schemas"] } },
  },
  {
    from: { type: "docs-schemas" },
    allow: { to: { type: ["docs", "docs-schemas"] } },
  },
];

// Internal docs types can only be used by docs/docs-schemas
const internalDocsAccess = internalDocsTypes.map((type) => ({
  from: { type },
  allow: { to: { type: internalDocsTypes } },
}));

// Allow module root to use its own utils (feature-private utils)
const moduleRootToUtils = {
  from: { type: "module" },
  allow: [
    { to: { type: "module-utils", captured: { moduleName: "{{ from.captured.moduleName }}" } } },
  ],
};

// Allow each module-* type to use any other module-* type with the same moduleName
const intraModuleRules = [];
for (const fromType of moduleTypes) {
  for (const toType of moduleTypes) {
    intraModuleRules.push({
      from: { type: fromType, captured: { moduleName: "{{ from.captured.moduleName }}" } },
      allow: [{ to: { type: toType, captured: { moduleName: "{{ from.captured.moduleName }}" } } }],
    });
  }
}

// Allow source and app-bootstrap to use each other and themselves
const appSourceRules = [];
for (const fromType of appTypes) {
  for (const toType of appTypes) {
    appSourceRules.push({
      from: { type: fromType },
      allow: [{ to: { type: toType } }],
    });
  }
}

// Allow source, app-bootstrap, and docs to import from any module-* type (any moduleName)
const entryToModules = [
  ...["source", "app-bootstrap", "docs"].flatMap((fromType) =>
    moduleTypes.map((toType) => ({
      from: { type: fromType },
      allow: [{ to: { type: toType } }, { to: { type: toType, captured: { moduleName: "*" } } }],
    })),
  ),
];

// Export all rules
export const boundariesDependencyRules = [
  ...globalToGlobal,
  ...modulesToGlobal,
  ...appToGlobal,
  ...docsToInternal,
  ...docsToDocs,
  ...internalDocsAccess,
  moduleRootToUtils,
  ...intraModuleRules,
  ...appSourceRules,
  ...entryToModules,
];
