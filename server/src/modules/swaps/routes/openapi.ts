import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { docsSchemasRegistry } from "../../../docs/schemas";
import { swapsOpenApiRegistry } from "./docs";

const registry = new OpenAPIRegistry([
  docsSchemasRegistry,
  swapsOpenApiRegistry,
]);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const swapsOpenApiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Rota App API - Swaps",
    version: "1.0.0",
    description: "API documentation for swap routes in the Rota application",
  },
});
