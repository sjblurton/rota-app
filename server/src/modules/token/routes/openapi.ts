import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

import { docsSchemasRegistry } from "../../../docs/schemas";
import { tokenOpenApiRegistry } from "./docs";

const registry = new OpenAPIRegistry([
  docsSchemasRegistry,
  tokenOpenApiRegistry,
]);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const tokenOpenApiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Rota App API - Staff",
    version: "1.0.0",
    description:
      "API documentation for public staff token routes in the Rota application",
  },
});
