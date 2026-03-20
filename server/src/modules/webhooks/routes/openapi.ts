import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { docsSchemasRegistry } from "../../../docs/schemas";
import { webhooksOpenApiRegistry } from "./docs";

const registry = new OpenAPIRegistry([
  docsSchemasRegistry,
  webhooksOpenApiRegistry,
]);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const webhooksOpenApiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Rota App API - Webhooks",
    version: "1.0.0",
    description: "API documentation for webhook routes in the Rota application",
  },
});
