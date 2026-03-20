import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  badRequestResponse,
  notFoundResponse,
  unauthorisedResponse,
} from "../../../docs/responses";
import { swapRequestOpenApiSchema } from "../../../docs/schemas";
import { tokenParamSchema } from "../../../lib/schemas/parameters/token";
import { swapStatusUpdateBodySchema } from "../../../lib/schemas/parameters/inputs";

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  path: "/api/swaps/t/{token}",
  summary: "Get swap request details",
  description:
    "Returns the swap request associated with the provided public swap token.",
  tags: ["Swaps"],
  request: {
    params: tokenParamSchema,
  },
  responses: {
    "200": {
      description: "Swap request returned successfully",
      content: {
        "application/json": {
          schema: swapRequestOpenApiSchema,
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
  path: "/api/swaps/t/{token}",
  summary: "Update swap request status",
  description:
    "Updates the swap request status associated with the provided public swap token.",
  tags: ["Swaps"],
  request: {
    params: tokenParamSchema,
    body: {
      required: true,
      description: "Swap request status update",
      content: {
        "application/json": {
          schema: swapStatusUpdateBodySchema,
        },
      },
    },
  },
  responses: {
    "204": {
      description: "Swap request status updated successfully",
    },
    "400": badRequestResponse,
    "401": unauthorisedResponse,
    "404": notFoundResponse,
  },
});

export { registry as swapsOpenApiRegistry };
