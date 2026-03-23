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
  updateOrganisationSchema,
} from "../../../lib/schemas/entities/organisation";
import {
  createManagerSchema,
  managerWithOrganisationSchema,
  updateManagerSchema,
} from "../../../lib/schemas/entities/staff";
import {
  organisationIdParamSchema,
  organisationManagerIdsParamSchema,
} from "../../../lib/schemas/parameters/ids/params";
import { SUPERADMIN_MESSAGES } from "../../../lib/constants/superadmin-messages";

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

const errorResponseSchema = conflictResponse.content["application/json"].schema;

const organisationConflictResponse = {
  description: "Conflict — organisation with this name already exists",
  content: {
    "application/json": {
      schema: errorResponseSchema,
      example: {
        message: SUPERADMIN_MESSAGES.organisationAlreadyExists,
      },
    },
  },
} as const;

const superadminErrorResponses = {
  "400": badRequestResponse,
  "401": unauthorisedResponse,
  "404": notFoundResponse,
  "409": organisationConflictResponse,
} as const;

const createOrganisationBodySchema = createOrganisationSchema;

const organisationResponseSchema = organisationSchema;

const organisationIdParamsSchema = organisationIdParamSchema;

const createManagerBodySchema = createManagerSchema;

const updateOrganisationBodySchema = updateOrganisationSchema;

const updateManagerBodySchema = updateManagerSchema;

const managerResponseSchema = managerWithOrganisationSchema;

const organisationManagerIdsParamsSchema = organisationManagerIdsParamSchema;

const managerCreateConflictResponse = {
  description:
    "Conflict — organisation is inactive or an active manager already uses the email address",
  content: {
    "application/json": {
      schema: errorResponseSchema,
      examples: {
        organisation_inactive: {
          summary: "Organisation inactive",
          value: { message: SUPERADMIN_MESSAGES.organisationInactive },
        },
        manager_email_conflict: {
          summary: "Manager email already in use by an active manager",
          value: { message: SUPERADMIN_MESSAGES.managerEmailAlreadyExists },
        },
      },
    },
  },
} as const;

const managerUpdateConflictResponse = {
  description:
    "Conflict — organisation is inactive or manager email conflicts with another active manager",
  content: {
    "application/json": {
      schema: errorResponseSchema,
      examples: {
        organisation_inactive: {
          summary: "Organisation inactive",
          value: { message: SUPERADMIN_MESSAGES.organisationInactive },
        },
        manager_email_conflict: {
          summary: "Manager email conflict",
          value: { message: SUPERADMIN_MESSAGES.managerEmailAlreadyExists },
        },
      },
    },
  },
} as const;

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
          example: {
            name: "Acme Corporation",
          },
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
          example: {
            id: "11111111-1111-1111-1111-111111111111",
            name: "Acme Corporation",
            created_at: "2023-01-01T00:00:00Z",
            is_active: true,
          },
        },
      },
    },
    ...superadminErrorResponses,
  },
});

superadminOpenApiRegistry.registerPath({
  method: "patch",
  path: "/api/superadmin/organisations/{organisation_id}",
  summary: "Update an organisation",
  description:
    "Updates an existing organisation. Restricted to the owner via `X-Superadmin-Key`.",
  tags: superadminTags,
  security: superadminSecurity,
  request: {
    params: organisationIdParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: updateOrganisationBodySchema,
          example: {
            name: "Acme Health Group",
            is_active: false,
          },
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Organisation updated successfully",
      content: {
        "application/json": {
          schema: organisationResponseSchema,
          example: {
            id: "11111111-1111-1111-1111-111111111111",
            name: "Acme Health Group",
            created_at: "2023-01-01T00:00:00Z",
            is_active: false,
          },
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
          example: {
            name: "Jane Smith",
            phone_number: "+441234567890",
            email: "jane.smith@acme.co.uk",
            password: "S3cur3P@ss!",
          },
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
          example: {
            id: "22222222-2222-2222-2222-222222222222",
            name: "Jane Smith",
            phone_number: "+441234567890",
            email: "jane.smith@acme.co.uk",
            is_active: true,
            organisation_id: "11111111-1111-1111-1111-111111111111",
            created_at: "2023-01-01T00:00:00Z",
          },
        },
      },
    },
    "400": badRequestResponse,
    "401": unauthorisedResponse,
    "404": notFoundResponse,
    "409": managerCreateConflictResponse,
  },
});

superadminOpenApiRegistry.registerPath({
  method: "patch",
  path: "/api/superadmin/organisations/{organisation_id}/managers/{manager_id}",
  summary: "Update a manager in an organisation",
  description:
    "Updates a manager account in the target organisation. Restricted to the owner via `X-Superadmin-Key`.",
  tags: superadminTags,
  security: superadminSecurity,
  request: {
    params: organisationManagerIdsParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: updateManagerBodySchema,
          example: {
            name: "Jane Smith",
            phone_number: "+441234567890",
            email: "jane.smith@acme.co.uk",
            is_active: false,
          },
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Manager updated successfully",
      content: {
        "application/json": {
          schema: managerResponseSchema,
          example: {
            id: "22222222-2222-2222-2222-222222222222",
            name: "Jane Smith",
            phone_number: "+441234567890",
            email: "jane.smith@acme.co.uk",
            is_active: false,
            organisation_id: "11111111-1111-1111-1111-111111111111",
            created_at: "2023-01-01T00:00:00Z",
          },
        },
      },
    },
    "400": badRequestResponse,
    "401": unauthorisedResponse,
    "404": notFoundResponse,
    "409": managerUpdateConflictResponse,
  },
});
