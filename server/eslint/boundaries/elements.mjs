// === Core/Global Elements ===
export const boundariesElements = [
  {
    type: "docs",
    pattern: "src/docs/**/*",
    mode: "full",
  },
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
  {
    type: "repositories",
    pattern: "src/repositories/*/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  {
    type: "services",
    pattern: "src/services/*/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  {
    type: "controllers",
    pattern: "src/controllers/*/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  {
    type: "routes",
    pattern: "src/routes/**/*",
    mode: "full",
  },
  {
    type: "app",
    pattern: "src/app.ts",
    mode: "full",
  },
  {
    type: "types",
    pattern: "src/types/**/*",
    mode: "full",
  },
  {
    type: "constants",
    pattern: "src/constants/**/*",
    mode: "full",
  },
  {
    type: "generated-prisma",
    pattern: "src/generated/prisma/**/*",
    mode: "full",
  },
];
