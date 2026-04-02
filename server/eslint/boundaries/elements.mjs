// === Core/Global Elements ===
// Only these are global (usable by all modules/app):
//   - lib, utils, docs, docs-schemas
// Internal docs types are only for docs/docs-schemas use.
export const boundariesElements = [
  // Documentation (internal, not global)
  {
    type: "docs-schemas-internal",
    pattern: "src/docs/internal/zod-openapi.ts",
    mode: "full",
  },
  {
    type: "docs-internal",
    pattern: "src/docs/internal/**/*",
    mode: "full",
  },
  // Documentation (global)
  {
    type: "docs-schemas",
    pattern: "src/docs/schemas.ts",
    mode: "full",
  },
  {
    type: "docs",
    pattern: "src/docs/**/*",
    mode: "full",
  },

  // Library and utilities (global)
  {
    type: "lib",
    pattern: "src/lib/**/*",
    mode: "full",
  },
  {
    type: "utils",
    pattern: "src/utils/**/*",
    mode: "full",
  },

  // Application bootstrap
  {
    type: "app-bootstrap",
    pattern: "src/bootstrap/**/*",
    mode: "full",
  },

  // === Feature Module Elements ===

  // Module DB
  {
    type: "module-db",
    pattern: "src/modules/*/db/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  // Module Services
  {
    type: "module-services",
    pattern: "src/modules/*/services/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  // Module Controllers
  {
    type: "module-controllers",
    pattern: "src/modules/*/controllers/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  // Module Routers (entrypoint)
  {
    type: "module-router",
    pattern: "src/modules/*/routes/*router.ts",
    capture: ["moduleName"],
    mode: "full",
  },
  // Module Routes (other route files)
  {
    type: "module-routes",
    pattern: "src/modules/*/routes/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  // Module Bootstrap
  {
    type: "module-bootstrap",
    pattern: "src/modules/*/bootstrap/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  // Module Utilities
  {
    type: "module-utils",
    pattern: "src/modules/*/utils/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  // Route files (global, importable from app)
  {
    type: "routes",
    pattern: "src/routes/**/*",
    mode: "full",
  },
  // App entrypoint (importable by tests)
  {
    type: "app",
    pattern: "src/app.ts",
    mode: "full",
  },
  // Module catch-all (fallback, lowest priority)
  {
    type: "module",
    pattern: "src/modules/*/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  // Seed files
  {
    type: "seed",
    pattern: "src/seed/**/*",
    mode: "full",
  },
  // Types (global, importable by all)
  {
    type: "types",
    pattern: "src/types/**/*",
    mode: "full",
  },
  // Constants (global, importable by all)
  {
    type: "constants",
    pattern: "src/constants/**/*",
    mode: "full",
  },
];
