import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { PATHS } from "../../../../constants/paths";
import {
  createOrganisationSchema,
  organisationSchema,
} from "../../../../libs/schemas/entities/organisation";
import { organisationsPaginationQuerySchema } from "../../../../libs/schemas/pagination/pagination-options-query";
import { commonErrorResponses } from "../../../errors/responses";
import { superadminTags } from "../../constants/superadmin-tags";

const organisationsOpenApiRegistry = new OpenAPIRegistry();

const organisationsPath = `${PATHS.apiBaseV1}${PATHS.superadmin}${PATHS.organisations}`;

organisationsOpenApiRegistry.registerPath({
  method: "post",
  path: organisationsPath,
  summary: "Create an organisation",
  description: "Creates a new organisation. Restricted to the owner via `X-Superadmin-Key`.",
  tags: superadminTags,
  security: [{ SuperadminKey: [] }],
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
    "400": commonErrorResponses.badRequestResponse,
    "401": commonErrorResponses.unauthorisedResponse,
    "409": commonErrorResponses.conflictResponse,
    "403": commonErrorResponses.forbiddenResponse,
  },
});

organisationsOpenApiRegistry.registerPath({
  method: "get",
  path: organisationsPath,
  summary: "Get all organisations",
  description:
    "Retrieves a list of all organisations. Restricted to the owner via `X-Superadmin-Key`.",
  tags: superadminTags,
  security: [{ SuperadminKey: [] }],
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
    "400": commonErrorResponses.badRequestResponse,
    "401": commonErrorResponses.unauthorisedResponse,
    "403": commonErrorResponses.forbiddenResponse,
  },
});

export { organisationsOpenApiRegistry };
