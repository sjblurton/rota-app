import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { docsSchemasRegistry } from "../../../docs/schemas";
import { adminOpenApiRegistry } from "./docs";

const registry = new OpenAPIRegistry([docsSchemasRegistry, adminOpenApiRegistry]);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const adminOpenApiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Rota App API - Admin",
    version: "1.0.0",
    description: "API documentation for admin routes in the Rota application",
  },
});
