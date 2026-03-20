import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import {
  badRequestResponse,
  notFoundResponse,
  unauthorisedResponse,
} from "../../../docs/responses";
import {
  createOrganizationSchema,
  organizationSchema,
} from "../../../lib/schemas/entities/organization";
import {
  createManagerSchema,
  managerWithOrganizationSchema,
} from "../../../lib/schemas/entities/staff";

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
} as const;

const createOrganisationBodySchema = createOrganizationSchema;

const organisationResponseSchema = organizationSchema;

const organisationIdParamsSchema = z.object({
  organizationId: z
    .string()
    .describe("Organisation ID that the manager should be linked to"),
});

const createManagerBodySchema = createManagerSchema;

const managerResponseSchema = managerWithOrganizationSchema;

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
  path: "/api/superadmin/organisations/{organizationId}/managers",
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
