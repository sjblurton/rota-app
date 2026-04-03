import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { organisationsOpenApiRegistry } from "./schemas/organisations";

const registry = new OpenAPIRegistry([organisationsOpenApiRegistry]);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const superadminOpenApiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Rota App API - Superadmin",
    version: "1.0.0",
    description:
      "Owner-only API for provisioning organisations and managers in the Rota application",
  },

  security: [{ SuperadminKey: [] }],
});
