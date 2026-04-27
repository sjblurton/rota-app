import { ESLINT_BOUNDARIES_ELEMENTS } from "./constants.mjs";

const canImportGeneratedPrisma = {
  from: [
    { type: ESLINT_BOUNDARIES_ELEMENTS.LIBS },
    { type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_REPOSITORIES },
    { type: ESLINT_BOUNDARIES_ELEMENTS.SHARED_SERVICES },
  ],
  allow: { to: { type: ESLINT_BOUNDARIES_ELEMENTS.GENERATED_PRISMA } },
};

export const generatedImportRules = [canImportGeneratedPrisma];
