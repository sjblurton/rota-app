import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import { badRequestResponse, notFoundResponse } from "../../../docs/responses";

const registry = new OpenAPIRegistry();

const inboundSmsBodySchema = z.object({
  From: z.string().describe("Sender phone number"),
  Body: z.string().describe("Inbound message body"),
  MessageSid: z.string().describe("Twilio message identifier"),
});

registry.registerPath({
  method: "post",
  path: "/api/webhooks/sms",
  summary: "Receive an inbound SMS webhook",
  description:
    "Receives inbound SMS webhook events from Twilio for staff messaging workflows.",
  tags: ["Webhooks"],
  request: {
    body: {
      required: true,
      description: "Twilio inbound SMS payload",
      content: {
        "application/x-www-form-urlencoded": {
          schema: inboundSmsBodySchema,
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Webhook processed successfully",
      content: {
        "application/xml": {
          schema: z.string().describe("TwiML response payload"),
        },
      },
    },
    "400": badRequestResponse,
    "404": notFoundResponse,
  },
});

export { registry as webhooksOpenApiRegistry };
