import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { organisationsOpenApiRegistry } from "./schemas/openapi.post-organisations";

const registry = new OpenAPIRegistry([organisationsOpenApiRegistry]);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const superadminOrganisationsOpenApiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Rota App API - Superadmin Organisations",
    version: "1.0.0",
    description: "Superadmin endpoints for managing organisations.",
  },
  security: [{ SuperadminKey: [] }],
});
