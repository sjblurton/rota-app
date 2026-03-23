import { Response } from "express";
import { describe, expect, it, vi } from "vitest";
import z from "zod";

import { parseOrSendBadRequest } from "./parse-or-send-bad-request";

const createResponse = () => {
  const response = {
    json: vi.fn(),
    status: vi.fn(),
  };

  response.status.mockReturnValue(response);

  return response as unknown as Response;
};

describe("parseOrSendBadRequest", () => {
  it("returns parsed data when validation succeeds", () => {
    const response = createResponse();
    const schema = z.object({
      name: z.string(),
    });

    const result = parseOrSendBadRequest(
      schema,
      { name: "Acme Hospital" },
      response,
      "Invalid payload",
    );

    expect(result).toEqual({ name: "Acme Hospital" });
    expect(response.status).not.toHaveBeenCalled();
    expect(response.json).not.toHaveBeenCalled();
  });

  it("sends a 400 response and returns null when validation fails", () => {
    const response = createResponse();
    const schema = z.object({
      name: z.string(),
    });

    const result = parseOrSendBadRequest(
      schema,
      {},
      response,
      "Invalid payload",
    );

    expect(result).toBeNull();
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid payload",
      error_details: expect.any(String),
    });
  });

  it("sends a 400 response when a constrained string is empty", () => {
    const response = createResponse();
    const schema = z.object({
      name: z.string().min(1),
    });

    const result = parseOrSendBadRequest(
      schema,
      { name: "" },
      response,
      "Invalid payload",
    );

    expect(result).toBeNull();
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid payload",
      error_details: expect.any(String),
    });
  });
});
