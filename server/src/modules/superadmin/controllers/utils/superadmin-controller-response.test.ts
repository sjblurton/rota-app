import { type Response } from "express";
import { describe, expect, it, vi } from "vitest";

import { SUPERADMIN_MESSAGES } from "../../../../lib/constants/superadmin-messages";
import {
  sendCreateManagerForOrganisationResponse,
  sendCreateOrganisationResponse,
  sendUpdateManagerForOrganisationResponse,
  sendUpdateOrganisationResponse,
} from "./superadmin-controller-response";

const createResponse = () => {
  const response = {
    json: vi.fn(),
    status: vi.fn(),
  };

  response.status.mockReturnValue(response);

  return response as unknown as Response;
};

describe("superadmin-controller-response", () => {
  it("sends 409 for duplicate organisation on create", () => {
    const response = createResponse();

    sendCreateOrganisationResponse(response, null);

    expect(response.status).toHaveBeenCalledWith(409);
    expect(response.json).toHaveBeenCalledWith({
      message: SUPERADMIN_MESSAGES.organisationAlreadyExists,
    });
  });

  it("sends 201 for successful organisation create", () => {
    const response = createResponse();
    const organisation = {
      id: "11111111-1111-1111-1111-111111111111",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    };

    sendCreateOrganisationResponse(response, organisation);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(organisation);
  });

  it("sends 404 for create manager organisation_not_found", () => {
    const response = createResponse();

    sendCreateManagerForOrganisationResponse(response, {
      kind: "organisation_not_found",
    });

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      message: SUPERADMIN_MESSAGES.organisationNotFound,
    });
  });

  it("sends 409 for create manager organisation_inactive", () => {
    const response = createResponse();

    sendCreateManagerForOrganisationResponse(response, {
      kind: "organisation_inactive",
    });

    expect(response.status).toHaveBeenCalledWith(409);
    expect(response.json).toHaveBeenCalledWith({
      message: SUPERADMIN_MESSAGES.organisationInactive,
    });
  });

  it("sends 409 for create manager manager_email_conflict", () => {
    const response = createResponse();

    sendCreateManagerForOrganisationResponse(response, {
      kind: "manager_email_conflict",
    });

    expect(response.status).toHaveBeenCalledWith(409);
    expect(response.json).toHaveBeenCalledWith({
      message: SUPERADMIN_MESSAGES.managerEmailAlreadyExists,
    });
  });

  it("sends 201 for create manager success", () => {
    const response = createResponse();
    const manager = {
      id: "22222222-2222-2222-2222-222222222222",
      created_at: "2024-01-01T00:00:00Z",
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      is_active: true,
      organisation_id: "11111111-1111-1111-1111-111111111111",
    };

    sendCreateManagerForOrganisationResponse(response, {
      kind: "created",
      manager,
    });

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(manager);
  });

  it("sends 404 for update organisation not found", () => {
    const response = createResponse();

    sendUpdateOrganisationResponse(response, {
      kind: "organisation_not_found",
    });

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      message: SUPERADMIN_MESSAGES.organisationNotFound,
    });
  });

  it("sends 409 for update organisation name conflict", () => {
    const response = createResponse();

    sendUpdateOrganisationResponse(response, {
      kind: "organisation_name_conflict",
    });

    expect(response.status).toHaveBeenCalledWith(409);
    expect(response.json).toHaveBeenCalledWith({
      message: SUPERADMIN_MESSAGES.organisationAlreadyExists,
    });
  });

  it("sends 200 for update organisation success", () => {
    const response = createResponse();
    const organisation = {
      id: "11111111-1111-1111-1111-111111111111",
      name: "Acme Health Group",
      created_at: "2024-01-01T00:00:00Z",
      is_active: false,
    };

    sendUpdateOrganisationResponse(response, {
      kind: "updated",
      organisation,
    });

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(organisation);
  });

  it("sends 404 for update manager organisation_not_found", () => {
    const response = createResponse();

    sendUpdateManagerForOrganisationResponse(response, {
      kind: "organisation_not_found",
    });

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      message: SUPERADMIN_MESSAGES.organisationNotFound,
    });
  });

  it("sends 409 for update manager organisation_inactive", () => {
    const response = createResponse();

    sendUpdateManagerForOrganisationResponse(response, {
      kind: "organisation_inactive",
    });

    expect(response.status).toHaveBeenCalledWith(409);
    expect(response.json).toHaveBeenCalledWith({
      message: SUPERADMIN_MESSAGES.organisationInactive,
    });
  });

  it("sends 404 for update manager manager_not_found", () => {
    const response = createResponse();

    sendUpdateManagerForOrganisationResponse(response, {
      kind: "manager_not_found",
    });

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      message: SUPERADMIN_MESSAGES.managerNotFound,
    });
  });

  it("sends 409 for update manager manager_email_conflict", () => {
    const response = createResponse();

    sendUpdateManagerForOrganisationResponse(response, {
      kind: "manager_email_conflict",
    });

    expect(response.status).toHaveBeenCalledWith(409);
    expect(response.json).toHaveBeenCalledWith({
      message: SUPERADMIN_MESSAGES.managerEmailAlreadyExists,
    });
  });

  it("sends 200 for update manager success", () => {
    const response = createResponse();
    const manager = {
      id: "22222222-2222-2222-2222-222222222222",
      created_at: "2024-01-01T00:00:00Z",
      name: "Updated Manager",
      phone_number: "+447700900123",
      email: "updated.manager@example.com",
      is_active: false,
      organisation_id: "11111111-1111-1111-1111-111111111111",
    };

    sendUpdateManagerForOrganisationResponse(response, {
      kind: "updated",
      manager,
    });

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(manager);
  });
});
