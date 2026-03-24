import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

import { docsSchemasRegistry } from "../../../docs/schemas";
import { superadminOpenApiRegistry } from "./docs";

const registry = new OpenAPIRegistry([
  docsSchemasRegistry,
  superadminOpenApiRegistry,
]);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const superadminOpenApiDocument = generator.generateDocument({
  openapi: "3.0.3",
  info: {
    title: "Rota App API - Superadmin",
    version: "1.0.0",
    description: "Owner-only API for provisioning organisations",
  },
});
