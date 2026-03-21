import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  badRequestResponse,
  conflictResponse,
  notFoundResponse,
  unauthorisedResponse,
} from "../../../docs/responses";
import {
  createOrganisationSchema,
  organisationSchema,
} from "../../../lib/schemas/entities/organisation";
import {
  createManagerSchema,
  managerWithOrganisationSchema,
} from "../../../lib/schemas/entities/staff";
import { organisationIdParamSchema } from "../../../lib/schemas/parameters/ids/params";

export const superadminOpenApiRegistry = new OpenAPIRegistry();

superadminOpenApiRegistry.registerComponent(
  "securitySchemes",
  "SuperadminKey",
  {
    type: "apiKey",
    in: "header",
    name: "X-Superadmin-Key",
    description: "Owner-only API key. Required for all superadmin endpoints.",
  },
);

const superadminTags: string[] = ["Superadmin"];

const superadminSecurity = [{ SuperadminKey: [] }];

const superadminErrorResponses = {
  "400": badRequestResponse,
  "401": unauthorisedResponse,
  "404": notFoundResponse,
  "409": conflictResponse,
} as const;

const createOrganisationBodySchema = createOrganisationSchema;

const organisationResponseSchema = organisationSchema;

const organisationIdParamsSchema = organisationIdParamSchema;

const createManagerBodySchema = createManagerSchema;

const managerResponseSchema = managerWithOrganisationSchema;

superadminOpenApiRegistry.registerPath({
  method: "post",
  path: "/api/superadmin/organisations",
  summary: "Create an organisation",
  description:
    "Creates a new organisation. Restricted to the owner via `X-Superadmin-Key`.",
  tags: superadminTags,
  security: superadminSecurity,
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: createOrganisationBodySchema,
        },
      },
    },
  },
  responses: {
    "201": {
      description: "Organisation created successfully",
      content: {
        "application/json": {
          schema: organisationResponseSchema,
        },
      },
    },
    ...superadminErrorResponses,
  },
});

superadminOpenApiRegistry.registerPath({
  method: "post",
  path: "/api/superadmin/organisations/{organisation_id}/managers",
  summary: "Add a manager to an organisation",
  description:
    "Creates a manager account and links it to the target organisation. Restricted to the owner via `X-Superadmin-Key`.",
  tags: superadminTags,
  security: superadminSecurity,
  request: {
    params: organisationIdParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: createManagerBodySchema,
        },
      },
    },
  },
  responses: {
    "201": {
      description: "Manager created and linked to organisation successfully",
      content: {
        "application/json": {
          schema: managerResponseSchema,
        },
      },
    },
    ...superadminErrorResponses,
  },
});
