import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import {
  createOrganisationSchema,
  organisationSchema,
} from "../../../libs/schemas/entities/organisation";
import { commonErrorResponses } from "../../responses";
import { superadminTags } from "../constants/superadmin-tags";

const organisationsOpenApiRegistry = new OpenAPIRegistry();

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

export { organisationsOpenApiRegistry };
