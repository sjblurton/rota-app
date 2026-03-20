import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { tokenSchema } from "../../../lib/schemas/parameters/token";
import { shiftResponseBodySchema } from "../../../lib/schemas/parameters/inputs";
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
  method: "patch",
  path: "/api/t/{token}/response",
  summary: "Update shift response status",
  tags: ["Staff"],
  request: {
    params: tokenSchema,
    body: {
      required: true,
      description: "Shift response state update",
      content: {
        "application/json": {
          schema: shiftResponseBodySchema,
        },
      },
    },
  },
  description:
    "Updates the shift response (confirm or decline) associated with the provided public staff token.",
  responses: {
    "204": {
      description: "Shift response updated successfully",
    },
    "400": badRequestResponse,
    "401": unauthorisedResponse,
    "404": notFoundResponse,
  },
});

export { registry as shiftsOpenApiRegistry };
