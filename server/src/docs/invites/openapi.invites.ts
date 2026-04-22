import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { invitesOpenApiRegistry } from "./schemas/openapi.patch-invites";

const registry = new OpenAPIRegistry([invitesOpenApiRegistry]);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const invitesOpenApiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Rota App API - Invites",
    version: "1.0.0",
    description: "API for managing invites in the Rota application.",
  },
  security: [{ BearerAuth: [] }],
});
