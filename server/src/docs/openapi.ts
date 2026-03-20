import { adminOpenApiDocument } from "../modules/admin/routes/openapi";
import { shiftsOpenApiDocument } from "../modules/shifts/routes/openapi";
import { swapsOpenApiDocument } from "../modules/swaps/routes/openapi";
import { tokenOpenApiDocument } from "../modules/token/routes/openapi";
import { webhooksOpenApiDocument } from "../modules/webhooks/routes/openapi";

export const openApiDocument = {
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
      name: "Admin",
      description: "Authenticated manager routes",
    },
    {
      name: "Staff",
      description: "Public token-based staff routes",
    },
    {
      name: "Swaps",
      description: "Shift swap workflow routes",
    },
    {
      name: "Webhooks",
      description: "Inbound webhook routes",
    },
  ],
  paths: {
    ...adminOpenApiDocument.paths,
    ...shiftsOpenApiDocument.paths,
    ...tokenOpenApiDocument.paths,
    ...swapsOpenApiDocument.paths,
    ...webhooksOpenApiDocument.paths,
  },
  components: {
    schemas: {
      ...adminOpenApiDocument.components?.schemas,
      ...shiftsOpenApiDocument.components?.schemas,
      ...tokenOpenApiDocument.components?.schemas,
      ...swapsOpenApiDocument.components?.schemas,
      ...webhooksOpenApiDocument.components?.schemas,
    },
  },
} as const;
