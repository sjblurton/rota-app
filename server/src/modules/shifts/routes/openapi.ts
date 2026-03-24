import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

import { docsSchemasRegistry } from "../../../docs/schemas";
import { shiftsOpenApiRegistry } from "./docs";

const registry = new OpenAPIRegistry([
  docsSchemasRegistry,
  shiftsOpenApiRegistry,
]);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const shiftsOpenApiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Rota App API - Shift Management",
    version: "1.0.0",
    description: "API for managing staff shifts in the Rota application",
  },
});
