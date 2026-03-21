import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { tokenSchema } from "../../../lib/schemas/parameters/token";
import { swapRequestBodySchema } from "../../../lib/schemas/parameters/inputs";
import {
  badRequestResponse,
  notFoundResponse,
  unauthorisedResponse,
} from "../../../docs/responses";

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "post",
  path: "/api/t/{token}/swap-requests",
  summary: "Create a swap request",
  description:
    "Creates a swap request for the shift associated with the provided public staff token. The backend starts the swap workflow in `awaiting_target_response`.",
  tags: ["Staff"],
  request: {
    params: tokenSchema,
    body: {
      required: true,
      description: "Swap request details",
      content: {
        "application/json": {
          schema: swapRequestBodySchema,
        },
      },
    },
  },
  responses: {
    "204": {
      description: "Swap request created successfully",
    },
    "400": badRequestResponse,
    "401": unauthorisedResponse,
    "404": notFoundResponse,
  },
});

export { registry as tokenOpenApiRegistry };
