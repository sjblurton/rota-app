import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import {
  badRequestResponse,
  conflictResponse,
  notFoundResponse,
  unauthorisedResponse,
} from "../../../docs/responses";
import { swapRequestOpenApiSchema } from "../../../docs/schemas";
import { swapTargetDecisionBodySchema } from "../../../lib/schemas/parameters/inputs/schemas";
import { tokenParamSchema } from "../../../lib/schemas/parameters/token/params";

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  path: "/api/swaps/t/{token}",
  summary: "Get swap request details",
  description:
    "Returns the swap request and current workflow state associated with the provided public swap token.",
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
  summary: "Respond to swap request",
  description:
    "Allows the target staff member to accept or reject the swap request associated with the provided public swap token. The backend advances the workflow state based on this decision.",
  tags: ["Swaps"],
  request: {
    params: tokenParamSchema,
    body: {
      required: true,
      description: "Target staff decision for the swap request",
      content: {
        "application/json": {
          schema: swapTargetDecisionBodySchema,
        },
      },
    },
  },
  responses: {
    "204": {
      description: "Target staff decision recorded successfully",
    },
    "409": conflictResponse,
    "400": badRequestResponse,
    "401": unauthorisedResponse,
    "404": notFoundResponse,
  },
});

export { registry as swapsOpenApiRegistry };
