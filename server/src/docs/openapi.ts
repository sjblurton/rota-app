import { shiftsOpenApiDocument } from "../modules/shifts/docs/openapi";

export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Rota API",
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
      name: "shifts",
      description: "Manage staff shifts",
    },
  ],
  paths: {
    ...shiftsOpenApiDocument.paths,
  },
  components: {
    schemas: {
      ...shiftsOpenApiDocument.components?.schemas,
    },
  },
} as const;
