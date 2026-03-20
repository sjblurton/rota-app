import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import {
  badRequestResponse,
  notFoundResponse,
  unauthorisedResponse,
} from "../../../docs/responses";
import { swapRequestOpenApiSchema } from "../../../docs/schemas";

const registry = new OpenAPIRegistry();

const tokenParamSchema = z.object({
  token: z.string().describe("Swap request access token from the SMS link"),
});

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
  method: "post",
  path: "/api/swaps/t/{token}/accept",
  summary: "Accept a swap request",
  description:
    "Accepts the swap request associated with the provided public swap token.",
  tags: ["Swaps"],
  request: {
    params: tokenParamSchema,
  },
  responses: {
    "204": {
      description: "Swap request accepted successfully",
    },
    "400": badRequestResponse,
    "401": unauthorisedResponse,
    "404": notFoundResponse,
  },
});

registry.registerPath({
  method: "post",
  path: "/api/swaps/t/{token}/reject",
  summary: "Reject a swap request",
  description:
    "Rejects the swap request associated with the provided public swap token.",
  tags: ["Swaps"],
  request: {
    params: tokenParamSchema,
  },
  responses: {
    "204": {
      description: "Swap request rejected successfully",
    },
    "400": badRequestResponse,
    "401": unauthorisedResponse,
    "404": notFoundResponse,
  },
});

export { registry as swapsOpenApiRegistry };
