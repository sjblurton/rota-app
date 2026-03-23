import { randomUUID } from "node:crypto";
import { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import {
  parseCreateManagerBody,
  parseCreateOrganisationBody,
  parseOrganisationIdParams,
  parseOrganisationManagerIdsParams,
  parseUpdateManagerBody,
  parseUpdateOrganisationBody,
} from "./superadmin-controller-parse";

const createRequest = (request: Partial<Request>) =>
  request as unknown as Request;

const createResponse = () => {
  const response = {
    json: vi.fn(),
    status: vi.fn(),
  };

  response.status.mockReturnValue(response);

  return response as unknown as Response;
};

describe("superadmin-controller-parse", () => {
  it("parses create organisation body", () => {
    const request = createRequest({ body: { name: "Acme Hospital" } });
    const response = createResponse();

    const result = parseCreateOrganisationBody(request, response);

    expect(result).toEqual({ name: "Acme Hospital" });
  });

  it("rejects empty update organisation body", () => {
    const request = createRequest({ body: {} });
    const response = createResponse();

    const result = parseUpdateOrganisationBody(request, response);

    expect(result).toBeNull();
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it("parses create manager body", () => {
    const request = createRequest({
      body: {
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: "jane.manager@example.com",
        password: "strong-password",
      },
    });
    const response = createResponse();

    const result = parseCreateManagerBody(request, response);

    expect(result).toEqual({
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password: "strong-password",
    });
  });

  it("rejects empty update manager body", () => {
    const request = createRequest({ body: {} });
    const response = createResponse();

    const result = parseUpdateManagerBody(request, response);

    expect(result).toBeNull();
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it("parses organisation id params", () => {
    const organisationId = randomUUID();
    const request = createRequest({
      params: { organisation_id: organisationId },
    });
    const response = createResponse();

    const result = parseOrganisationIdParams(request, response);

    expect(result).toEqual({ organisation_id: organisationId });
  });

  it("rejects invalid organisation and manager id params", () => {
    const request = createRequest({
      params: { organisation_id: "invalid", manager_id: "invalid" },
    });
    const response = createResponse();

    const result = parseOrganisationManagerIdsParams(request, response);

    expect(result).toBeNull();
    expect(response.status).toHaveBeenCalledWith(400);
  });
});
