import { type JsonObject } from "swagger-ui-express";

import { superadminOpenApiDocument } from "./superadmin/openapi";

export const openApiDocument: JsonObject = {
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
  tags: [
    {
      name: "Superadmin",
      description: "Owner-only provisioning routes",
    },
  ],
  paths: {
    ...superadminOpenApiDocument.paths,
  },
  security: superadminOpenApiDocument.security,
  components: {
    schemas: {
      ...superadminOpenApiDocument.components?.schemas,
    },
    securitySchemes: {
      SuperadminKey: {
        type: "apiKey",
        in: "header",
        name: "X-Superadmin-Key",
      },
    },
  },
} as const;
