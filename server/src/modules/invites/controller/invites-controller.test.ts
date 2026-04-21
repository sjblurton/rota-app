import { type Request, type Response } from "express";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";

import { InvitesController } from "./invites-controller";

describe("InvitesController", () => {
  let invitesController: InvitesController;
  let invitesService: {
    validateOrganisationId: Mock;
  };
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonSpy: Mock;

  beforeEach(() => {
    invitesService = {
      validateOrganisationId: vi.fn(),
    };
    invitesController = new InvitesController(invitesService);
    req = {
      params: { organisation_id: "123e4567-e89b-12d3-a456-426614174000" },
      body: { email: "test@example.com", organisation_id: "123e4567-e89b-12d3-a456-426614174000" },
    };
    jsonSpy = vi.fn();
    res = { status: vi.fn().mockReturnThis(), json: jsonSpy };
  });

  it("returns 200 and placeholder response if organisation is valid", async () => {
    invitesService.validateOrganisationId.mockResolvedValue(undefined);
    await invitesController.inviteUserToOrganisation(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "test@example.com",
        organisation_id: "123e4567-e89b-12d3-a456-426614174000",
        status: "invited",
      }),
    );
  });

  it("throws if organisation is not found", async () => {
    invitesService.validateOrganisationId.mockImplementation(() => {
      throw new Error("Organisation not found");
    });
    await expect(
      invitesController.inviteUserToOrganisation(req as Request, res as Response),
    ).rejects.toThrow("Organisation not found");
  });
});
