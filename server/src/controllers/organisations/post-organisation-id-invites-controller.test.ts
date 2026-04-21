import { beforeEach, describe, expect, it, vi } from "vitest";

import { HttpErrorByCode } from "../../utils/http/HttpErrorByCode";
import { postOrganisationIdInvitesController } from "./post-organisation-id-invites-controller";

const validParams = { organisation_id: "123e4567-e89b-12d3-a456-426614174000" };
const validBody = { email: "test@example.com" };

const mockRequest = (params = validParams, body = validBody) => ({ params, body }) as any;
const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("postOrganisationIdInvitesController", () => {
  let request: any;
  let response: any;
  let getOrganisationById: any;

  beforeEach(() => {
    request = mockRequest();
    response = mockResponse();
    getOrganisationById = vi.fn().mockResolvedValue({ id: validParams.organisation_id });
  });

  it("validates params and body, calls getOrganisationById, and responds with invite", async () => {
    await postOrganisationIdInvitesController({ request, response, getOrganisationById });
    expect(getOrganisationById).toHaveBeenCalledWith({ id: validParams.organisation_id });
    expect(response.status).toHaveBeenCalledWith(200);
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
    request = mockRequest(validParams, { email: "not-an-email" });
    await expect(
      postOrganisationIdInvitesController({ request, response, getOrganisationById }),
    ).rejects.toThrow(HttpErrorByCode);
  });
});
