import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import {
  createOrganisationSchema,
  organisationSchema,
} from "../../../libs/schemas/entities/organisation";
import { createPaginationOptionsQuerySchema } from "../../../libs/schemas/pagination/pagination-options-query";
import { commonErrorResponses } from "../../responses";
import { superadminTags } from "../constants/superadmin-tags";

const organisationsOpenApiRegistry = new OpenAPIRegistry();
const organisationsPaginationQuerySchema = createPaginationOptionsQuerySchema([
  "created_at",
  "updated_at",
  "name",
  "status",
  "plan",
] as const);

organisationsOpenApiRegistry.registerPath({
  method: "post",
  path: "/api/superadmin/organisations",
  summary: "Create an organisation",
  description: "Creates a new organisation. Restricted to the owner via `X-Superadmin-Key`.",
  tags: superadminTags,
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: createOrganisationSchema,
        },
      },
    },
  },
  responses: {
    "201": {
      description: "Organisation created successfully",
      content: {
        "application/json": {
          schema: organisationSchema,
        },
      },
    },
    ...commonErrorResponses,
  },
});

organisationsOpenApiRegistry.registerPath({
  method: "get",
  path: "/api/superadmin/organisations",
  summary: "Get all organisations",
  description:
    "Retrieves a list of all organisations. Restricted to the owner via `X-Superadmin-Key`.",
  tags: superadminTags,
  request: {
    query: organisationsPaginationQuerySchema,
  },
  responses: {
    "200": {
      description: "List of organisations retrieved successfully",
      content: {
        "application/json": {
          schema: organisationSchema.array(),
        },
      },
    },
    ...commonErrorResponses,
  },
});

export { organisationsOpenApiRegistry };
