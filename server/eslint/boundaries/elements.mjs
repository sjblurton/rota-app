// === Core/Global Elements ===
export const boundariesElements = [
  // Documentation (global)
  {
    type: "docs",
    pattern: "src/docs/**/*",
    mode: "full",
  },
  // Library and utilities (global)
  {
    type: "libs",
    pattern: "src/libs/**/*",
    mode: "full",
  },
  {
    type: "utils",
    pattern: "src/utils/**/*",
    mode: "full",
  },

  // === Feature Module Elements ===

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
  // Module catch-all
  {
    type: "module",
    pattern: "src/modules/*/**/*",
    capture: ["moduleName"],
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
  // Prisma Generated client (global, importable by all)
  {
    type: "generated-prisma",
    pattern: "src/generated/prisma/**/*",
    mode: "full",
  },
  {
    type: "prisma",
    pattern: "src/libs/prisma/**/*",
    mode: "full",
  },
];
