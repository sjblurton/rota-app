import { beforeEach, describe, expect, it, vi } from "vitest";

import { HttpErrorByCode } from "../../../utils/http/HttpErrorByCode";
import { patchInvitesController } from "./patch-invites.controller";

const validParams = { invite_id: "dcf6d793-9fe8-4964-aff4-b27b209052e5" };
const validBody = { status: "accepted" };
const validUser = { id: "user-123" };

const mockRequest = (
  params = validParams,
  body = validBody,
  superbaseUser: { id: string } | null = validUser,
) => {
  const req = { params, body, superbaseUser };
  if (superbaseUser != null) req.superbaseUser = superbaseUser;
  return req;
};

const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("patchInvitesController", () => {
  let request: any;
  let response: any;
  let acceptInvite: any;

  beforeEach(() => {
    request = mockRequest();
    response = mockResponse();
    acceptInvite = vi.fn().mockResolvedValue({ success: true });
  });

  it("calls acceptInvite and responds with 200 on success", async () => {
    await patchInvitesController({ request, response, acceptInvite });
    expect(acceptInvite).toHaveBeenCalledWith({
      supabaseUserId: validUser.id,
      inviteId: validParams.invite_id,
      body: validBody,
    });
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ success: true });
  });

  it("throws if user is missing", async () => {
    request = mockRequest(validParams, validBody, null);
    await expect(patchInvitesController({ request, response, acceptInvite })).rejects.toThrow(
      HttpErrorByCode,
    );
  });

  it("throws if invite_id is invalid", async () => {
    request = mockRequest({ invite_id: "not-a-uuid" }, validBody, validUser);
    await expect(patchInvitesController({ request, response, acceptInvite })).rejects.toThrow(
      HttpErrorByCode,
    );
  });

  it("throws if body is invalid", async () => {
    request = mockRequest(validParams, { status: "invalid" }, validUser);
    await expect(patchInvitesController({ request, response, acceptInvite })).rejects.toThrow(
      HttpErrorByCode,
    );
  });
});
