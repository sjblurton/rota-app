import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const registry = new OpenAPIRegistry();

const shiftsGetResponseSchema = z.object({
  link: z.string(),
});

registry.registerPath({
  method: "get",
  path: "/shifts/{token}",
  description:
    "Get a shift from its unique token for staff and shift management",
  responses: {
    "200": {
      description: "Successful response",
      content: {
        "application/json": {
          schema: shiftsGetResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/shifts/{token}/confirm",
  description: "Confirm a shift using its unique token",
  responses: {
    "204": {
      description: "Successful confirmation",
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

export const shiftsOpenApiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Rota API - Shift Management",
    version: "1.0.0",
    description: "API for managing staff shifts in the Rota application",
  },
});
