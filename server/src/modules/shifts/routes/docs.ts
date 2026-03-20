import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { tokenSchema } from "../../../lib/schemas/queries/token";
import {
  badRequestResponse,
  notFoundResponse,
  unauthorisedResponse,
} from "../../../docs/responses";
import { shiftOpenApiSchema } from "../../../docs/schemas";

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  path: "/api/t/{token}",
  summary: "Get shift details",
  request: {
    params: tokenSchema,
  },
  tags: ["Staff"],
  description:
    "Returns the shift details associated with the provided public staff token.",
  responses: {
    "200": {
      description: "Shift details returned successfully",
      content: {
        "application/json": {
          schema: shiftOpenApiSchema,
        },
      },
    },
    "400": badRequestResponse,
    "401": unauthorisedResponse,
    "404": notFoundResponse,
  },
});

registry.registerPath({
  method: "post",
  path: "/api/t/{token}/confirm",
  summary: "Confirm a shift",
  tags: ["Staff"],
  request: {
    params: tokenSchema,
  },
  description:
    "Confirms the shift associated with the provided public staff token.",
  responses: {
    "204": {
      description: "Shift confirmed successfully",
    },
    "400": badRequestResponse,
    "401": unauthorisedResponse,
    "404": notFoundResponse,
  },
});

export { registry as shiftsOpenApiRegistry };
