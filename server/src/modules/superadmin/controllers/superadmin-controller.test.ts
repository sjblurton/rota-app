import { Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

const serviceMocks = vi.hoisted(() => ({
  createManagerForOrganisation: vi.fn(),
  createOrganisation: vi.fn(),
}));

const ORGANISATION_ID = randomUUID();

vi.mock("../services/superadmin-service", () => serviceMocks);

import {
  createManagerForOrganisationController,
  createOrganisationController,
} from "./superadmin-controller";
import { randomUUID } from "node:crypto";

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

describe("createOrganisationController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns bad request when the payload is invalid", () => {
    const request = createRequest({
      body: {},
    });
    const response = createResponse();

    createOrganisationController(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid organisation payload",
      error_details: expect.any(String),
    });
    expect(serviceMocks.createOrganisation).not.toHaveBeenCalled();
  });

  it("returns bad request when the organisation name is an empty string", () => {
    const request = createRequest({
      body: { name: "  " },
    });
    const response = createResponse();

    createOrganisationController(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid organisation payload",
      error_details: expect.any(String),
    });
    expect(serviceMocks.createOrganisation).not.toHaveBeenCalled();
  });

  it("returns conflict when the organisation already exists", () => {
    serviceMocks.createOrganisation.mockReturnValue(null);

    const request = createRequest({
      body: { name: "Acme Hospital" },
    });
    const response = createResponse();

    createOrganisationController(request, response);

    expect(serviceMocks.createOrganisation).toHaveBeenCalledWith({
      name: "Acme Hospital",
    });
    expect(response.status).toHaveBeenCalledWith(409);
    expect(response.json).toHaveBeenCalledWith({
      message: "Organisation already exists",
    });
  });

  it("returns created organisation when the request succeeds", () => {
    const createdOrganisation = {
      id: ORGANISATION_ID,
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
    };

    serviceMocks.createOrganisation.mockReturnValue(createdOrganisation);

    const request = createRequest({
      body: { name: "Acme Hospital" },
    });
    const response = createResponse();

    createOrganisationController(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(createdOrganisation);
  });
});

describe("createManagerForOrganisationController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns bad request when the organisation ID is invalid", () => {
    const request = createRequest({
      body: {
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: "jane.manager@example.com",
        password: "strong-password",
      },
      params: {},
    });
    const response = createResponse();

    createManagerForOrganisationController(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid organisation ID",
      error_details: expect.any(String),
    });
    expect(serviceMocks.createManagerForOrganisation).not.toHaveBeenCalled();
  });

  it("returns bad request when the manager payload is invalid", () => {
    const request = createRequest({
      body: {
        name: "Jane Manager",
      },
      params: { organisation_id: ORGANISATION_ID },
    });
    const response = createResponse();

    createManagerForOrganisationController(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid manager payload",
      error_details: expect.any(String),
    });
    expect(serviceMocks.createManagerForOrganisation).not.toHaveBeenCalled();
  });

  it("returns not found when the organisation does not exist", () => {
    serviceMocks.createManagerForOrganisation.mockReturnValue({
      kind: "organisation_not_found",
    });

    const request = createRequest({
      body: {
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: "jane.manager@example.com",
        password: "strong-password",
      },
      params: { organisation_id: ORGANISATION_ID },
    });
    const response = createResponse();

    createManagerForOrganisationController(request, response);

    expect(serviceMocks.createManagerForOrganisation).toHaveBeenCalledWith(
      ORGANISATION_ID,
      {
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: "jane.manager@example.com",
        password: "strong-password",
      },
    );
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      message: "Organisation not found",
    });
  });

  it("returns conflict when the manager email already exists", () => {
    serviceMocks.createManagerForOrganisation.mockReturnValue({
      kind: "manager_email_conflict",
    });

    const request = createRequest({
      body: {
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: "jane.manager@example.com",
        password: "strong-password",
      },
      params: { organisation_id: ORGANISATION_ID },
    });
    const response = createResponse();

    createManagerForOrganisationController(request, response);

    expect(response.status).toHaveBeenCalledWith(409);
    expect(response.json).toHaveBeenCalledWith({
      message: "Manager with this email already exists",
    });
  });

  it("returns created manager when the request succeeds", () => {
    const createdManager = {
      id: "mgr-1",
      created_at: "2024-01-01T00:00:00Z",
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      organisation_id: ORGANISATION_ID,
    };

    serviceMocks.createManagerForOrganisation.mockReturnValue({
      kind: "created",
      manager: createdManager,
    });

    const request = createRequest({
      body: {
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: "jane.manager@example.com",
        password: "strong-password",
      },
      params: { organisation_id: ORGANISATION_ID },
    });
    const response = createResponse();

    createManagerForOrganisationController(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(createdManager);
  });
});
