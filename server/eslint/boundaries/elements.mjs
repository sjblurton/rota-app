import { ESLINT_BOUNDARIES_ELEMENTS } from "./constants.mjs";
export const boundariesElements = [
  // Feature-based elements (with moduleName capture)
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.CONTROLLERS,
    pattern: "src/api/*/controllers/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.ROUTES,
    pattern: "src/api/*/routes/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.DOCS,
    pattern: "src/api/*/docs/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  // Globally Shared layers
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.LIBS,
    pattern: "src/libs/**/*",
    mode: "full",
  },
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.UTILS,
    pattern: "src/utils/**/*",
    mode: "full",
  },
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.TYPES,
    pattern: "src/types/**/*",
    mode: "full",
  },
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.CONSTANTS,
    pattern: "src/constants/**/*",
    mode: "full",
  },
  // Shared element that can be imported into chosen layers
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_DOCS,
    pattern: "src/docs/**/*",
    mode: "full",
  },
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_REPOSITORIES,
    pattern: "src/repositories/*/**/*",
    capture: ["moduleName"],
    mode: "full",
  },
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_SERVICES,
    pattern: "src/services/*/**/*",
    mode: "full",
    capture: ["moduleName"],
  },
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_ROUTES,
    pattern: "src/routes/*/**/*",
    mode: "full",
    capture: ["moduleName"],
  },
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.GENERATED_PRISMA,
    pattern: "src/generated/prisma/**/*",
    mode: "full",
  },
  {
    type: ESLINT_BOUNDARIES_ELEMENTS.APP,
    pattern: "src/app.ts",
    mode: "full",
  },
];
