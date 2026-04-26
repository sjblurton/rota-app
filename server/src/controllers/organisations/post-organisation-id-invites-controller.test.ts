import { beforeEach, describe, expect, it, vi } from "vitest";

import { type CreateInviteBody, type Invite } from "../../types/invites";
import { HttpErrorByCode } from "../../utils/http/HttpErrorByCode";
import { postOrganisationIdInvitesController } from "./post-organisation-id-invites-controller";

const validParams = { organisation_id: "123e4567-e89b-12d3-a456-426614174000" };
const validBody: CreateInviteBody = {
  email: "test@example.com",
  role: "admin",
  preferred_contact_method: "email",
};

const mockRequest = (params = validParams, body = validBody) => ({ params, body });
const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const invite: Invite = {
  email: validBody.email,
  organisation_id: validParams.organisation_id,
  status: "invited",
  role: validBody.role,
  preferred_contact_method: validBody.preferred_contact_method,
  created_at: new Date(2010, 0, 1),
  updated_at: new Date(2010, 0, 1),
  expires_at: new Date(2010, 0, 2),
  id: "123e4567-e89b-12d3-a456-426614174001",
};

describe("postOrganisationIdInvitesController", () => {
  let request: any;
  let response: any;
  let getOrganisationById: any;
  let createInvite: any;

  beforeEach(() => {
    request = mockRequest();
    response = mockResponse();
    getOrganisationById = vi.fn().mockResolvedValue({ id: validParams.organisation_id });
    createInvite = vi.fn().mockResolvedValue(invite);
  });

  it("validates params and body, calls getOrganisationById, and responds with invite", async () => {
    await postOrganisationIdInvitesController({
      request,
      response,
      getOrganisationById,
      createInvite,
    });
    expect(getOrganisationById).toHaveBeenCalledWith({ id: validParams.organisation_id });
    expect(createInvite).toHaveBeenCalledWith({
      data: {
        organisation_id: validParams.organisation_id,
        ...validBody,
      },
    });
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        email: validBody.email,
        organisation_id: validParams.organisation_id,
        status: "invited",
      }),
    );
  });

  it("throws if organisation_id is invalid", async () => {
    request = mockRequest({ organisation_id: "not-a-uuid" }, validBody);
    await expect(
      postOrganisationIdInvitesController({ request, response, getOrganisationById }),
    ).rejects.toThrow(HttpErrorByCode);
  });

  it("throws if body is invalid", async () => {
    request = mockRequest(validParams, {
      email: "not-an-email",
      preferred_contact_method: "email",
      role: "admin",
    });
    await expect(
      postOrganisationIdInvitesController({ request, response, getOrganisationById }),
    ).rejects.toThrow(HttpErrorByCode);
  });
});
