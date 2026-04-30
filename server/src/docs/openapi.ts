import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { invitesOpenApiRegistry } from "../api/invites/docs/patch-invites.openapi";
import { superadminInvitesOpenApiRegistry } from "../api/invites/docs/post-invites.openapi";
import { organisationsOpenApiRegistry } from "../api/organisations/docs/post-organisations.openapi";
import { staffPatchOpenApiRegistry } from "../api/staff/docs/patch-staff.openapi";
import { staffOpenApiRegistry } from "../api/staff/docs/post-staff.openapi";

const registry = new OpenAPIRegistry([
  invitesOpenApiRegistry,
  superadminInvitesOpenApiRegistry,
  organisationsOpenApiRegistry,
  staffOpenApiRegistry,
  staffPatchOpenApiRegistry,
]);

registry.registerComponent("securitySchemes", "BearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});
registry.registerComponent("securitySchemes", "SuperadminKey", {
  type: "apiKey",
  in: "header",
  name: "x-superadmin-key",
});

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
