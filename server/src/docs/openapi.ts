import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { invitesOpenApiRegistry } from "./invites/schemas/openapi.patch-invites";
import { superadminInvitesOpenApiRegistry } from "./superadmin/invites/schemas/openapi.post-invites";
import { organisationsOpenApiRegistry } from "./superadmin/organisations/schemas/openapi.post-organisations";

const registry = new OpenAPIRegistry([
  invitesOpenApiRegistry,
  superadminInvitesOpenApiRegistry,
  organisationsOpenApiRegistry,
]);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Rota App API",
    version: "1.0.0",
    description: "REST API for managing staff rotas",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  security: [{ SuperadminKey: [] }, { BearerAuth: [] }],
});
