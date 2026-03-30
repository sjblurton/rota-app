import { type Request, type Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

const serviceMocks = vi.hoisted(() => ({
  createManagerForOrganisation: vi.fn(),
  createOrganisation: vi.fn(),
  updateManagerForOrganisation: vi.fn(),
  updateOrganisation: vi.fn(),
}));

const parseMocks = vi.hoisted(() => ({
  parseCreateManagerBody: vi.fn(),
  parseCreateOrganisationBody: vi.fn(),
  parseOrganisationIdParams: vi.fn(),
  parseOrganisationManagerIdsParams: vi.fn(),
  parseUpdateManagerBody: vi.fn(),
  parseUpdateOrganisationBody: vi.fn(),
}));

const responseMapperMocks = vi.hoisted(() => ({
  sendCreateManagerForOrganisationResponse: vi.fn(),
  sendCreateOrganisationResponse: vi.fn(),
  sendUpdateManagerForOrganisationResponse: vi.fn(),
  sendUpdateOrganisationResponse: vi.fn(),
}));

vi.mock("../services/superadmin-service", () => serviceMocks);
vi.mock("./utils/superadmin-controller-parse", () => parseMocks);
vi.mock("./utils/superadmin-controller-response", () => responseMapperMocks);

import {
  createManagerForOrganisationController,
  createOrganisationController,
  updateManagerForOrganisationController,
  updateOrganisationController,
} from "./superadmin-controller";

const createRequest = (request: Partial<Request>) => request as unknown as Request;

const createResponse = () => {
  const response = {
    json: vi.fn(),
    status: vi.fn(),
  };

  response.status.mockReturnValue(response);

  return response as unknown as Response;
};

describe("superadmin-controller orchestration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns early when create organisation body parsing fails", () => {
    parseMocks.parseCreateOrganisationBody.mockReturnValue(null);
    const request = createRequest({ body: {} });
    const response = createResponse();

    createOrganisationController(request, response);

    expect(serviceMocks.createOrganisation).not.toHaveBeenCalled();
    expect(responseMapperMocks.sendCreateOrganisationResponse).not.toHaveBeenCalled();
  });

  it("returns early when update organisation body parsing fails", () => {
    parseMocks.parseOrganisationIdParams.mockReturnValue({ organisation_id: "id" });
    parseMocks.parseUpdateOrganisationBody.mockReturnValue(null);
    const request = createRequest({ params: {}, body: {} });
    const response = createResponse();

    updateOrganisationController(request, response);

    expect(serviceMocks.updateOrganisation).not.toHaveBeenCalled();
    expect(responseMapperMocks.sendUpdateOrganisationResponse).not.toHaveBeenCalled();
  });

  it("returns early when update manager body parsing fails", () => {
    parseMocks.parseOrganisationManagerIdsParams.mockReturnValue({
      organisation_id: "id",
      manager_id: "mid",
    });
    parseMocks.parseUpdateManagerBody.mockReturnValue(null);
    const request = createRequest({ params: {}, body: {} });
    const response = createResponse();

    updateManagerForOrganisationController(request, response);

    expect(serviceMocks.updateManagerForOrganisation).not.toHaveBeenCalled();
    expect(responseMapperMocks.sendUpdateManagerForOrganisationResponse).not.toHaveBeenCalled();
  });

  it("creates organisation and delegates response mapping", () => {
    parseMocks.parseCreateOrganisationBody.mockReturnValue({
      name: "Acme Hospital",
    });
    serviceMocks.createOrganisation.mockReturnValue(null);
    const request = createRequest({ body: { name: "Acme Hospital" } });
    const response = createResponse();

    createOrganisationController(request, response);

    expect(serviceMocks.createOrganisation).toHaveBeenCalledWith({
      name: "Acme Hospital",
    });
    expect(responseMapperMocks.sendCreateOrganisationResponse).toHaveBeenCalledWith(response, null);
  });

  it("returns early when create manager organisation id parsing fails", () => {
    parseMocks.parseOrganisationIdParams.mockReturnValue(null);
    const request = createRequest({ params: {}, body: {} });
    const response = createResponse();

    createManagerForOrganisationController(request, response);

    expect(parseMocks.parseCreateManagerBody).not.toHaveBeenCalled();
    expect(serviceMocks.createManagerForOrganisation).not.toHaveBeenCalled();
    expect(responseMapperMocks.sendCreateManagerForOrganisationResponse).not.toHaveBeenCalled();
  });

  it("returns early when create manager body parsing fails", () => {
    parseMocks.parseOrganisationIdParams.mockReturnValue({
      organisation_id: "11111111-1111-1111-1111-111111111111",
    });
    parseMocks.parseCreateManagerBody.mockReturnValue(null);
    const request = createRequest({ params: {}, body: {} });
    const response = createResponse();

    createManagerForOrganisationController(request, response);

    expect(serviceMocks.createManagerForOrganisation).not.toHaveBeenCalled();
    expect(responseMapperMocks.sendCreateManagerForOrganisationResponse).not.toHaveBeenCalled();
  });

  it("creates manager and delegates response mapping", () => {
    const parsedParams = {
      organisation_id: "11111111-1111-1111-1111-111111111111",
    };
    const parsedBody = {
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password: "strong-password",
    };
    const serviceResult = { kind: "organisation_not_found" };

    parseMocks.parseOrganisationIdParams.mockReturnValue(parsedParams);
    parseMocks.parseCreateManagerBody.mockReturnValue(parsedBody);
    serviceMocks.createManagerForOrganisation.mockReturnValue(serviceResult);

    const request = createRequest({ params: {}, body: {} });
    const response = createResponse();

    createManagerForOrganisationController(request, response);

    expect(serviceMocks.createManagerForOrganisation).toHaveBeenCalledWith(
      parsedParams.organisation_id,
      parsedBody,
    );
    expect(responseMapperMocks.sendCreateManagerForOrganisationResponse).toHaveBeenCalledWith(
      response,
      serviceResult,
    );
  });

  it("returns early when update organisation id parsing fails", () => {
    parseMocks.parseOrganisationIdParams.mockReturnValue(null);
    const request = createRequest({ params: {}, body: {} });
    const response = createResponse();

    updateOrganisationController(request, response);

    expect(parseMocks.parseUpdateOrganisationBody).not.toHaveBeenCalled();
    expect(serviceMocks.updateOrganisation).not.toHaveBeenCalled();
    expect(responseMapperMocks.sendUpdateOrganisationResponse).not.toHaveBeenCalled();
  });

  it("updates organisation and delegates response mapping", () => {
    const parsedParams = {
      organisation_id: "11111111-1111-1111-1111-111111111111",
    };
    const parsedBody = { name: "Updated Name", is_active: false };
    const serviceResult = { kind: "organisation_not_found" };

    parseMocks.parseOrganisationIdParams.mockReturnValue(parsedParams);
    parseMocks.parseUpdateOrganisationBody.mockReturnValue(parsedBody);
    serviceMocks.updateOrganisation.mockReturnValue(serviceResult);

    const request = createRequest({ params: {}, body: {} });
    const response = createResponse();

    updateOrganisationController(request, response);

    expect(serviceMocks.updateOrganisation).toHaveBeenCalledWith(
      parsedParams.organisation_id,
      parsedBody,
    );
    expect(responseMapperMocks.sendUpdateOrganisationResponse).toHaveBeenCalledWith(
      response,
      serviceResult,
    );
  });

  it("returns early when update manager ids parsing fails", () => {
    parseMocks.parseOrganisationManagerIdsParams.mockReturnValue(null);
    const request = createRequest({ params: {}, body: {} });
    const response = createResponse();

    updateManagerForOrganisationController(request, response);

    expect(parseMocks.parseUpdateManagerBody).not.toHaveBeenCalled();
    expect(serviceMocks.updateManagerForOrganisation).not.toHaveBeenCalled();
    expect(responseMapperMocks.sendUpdateManagerForOrganisationResponse).not.toHaveBeenCalled();
  });

  it("updates manager and delegates response mapping", () => {
    const parsedParams = {
      organisation_id: "11111111-1111-1111-1111-111111111111",
      manager_id: "22222222-2222-2222-2222-222222222222",
    };
    const parsedBody = { email: "updated.manager@example.com" };
    const serviceResult = { kind: "manager_not_found" };

    parseMocks.parseOrganisationManagerIdsParams.mockReturnValue(parsedParams);
    parseMocks.parseUpdateManagerBody.mockReturnValue(parsedBody);
    serviceMocks.updateManagerForOrganisation.mockReturnValue(serviceResult);

    const request = createRequest({ params: {}, body: {} });
    const response = createResponse();

    updateManagerForOrganisationController(request, response);

    expect(serviceMocks.updateManagerForOrganisation).toHaveBeenCalledWith(
      parsedParams.organisation_id,
      parsedParams.manager_id,
      parsedBody,
    );
    expect(responseMapperMocks.sendUpdateManagerForOrganisationResponse).toHaveBeenCalledWith(
      response,
      serviceResult,
    );
  });
});
