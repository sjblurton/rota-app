import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { superadminInvitesOpenApiRegistry } from "./schemas/openapi.post-invites";

const registry = new OpenAPIRegistry([superadminInvitesOpenApiRegistry]);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const superadminInvitesOpenApiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Rota App API - Superadmin Invites",
    version: "1.0.0",
    description: "Superadmin endpoints for inviting users to organisations.",
  },
  security: [{ SuperadminKey: [] }],
});
