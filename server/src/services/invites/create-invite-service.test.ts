import { beforeEach, describe, expect, it, vi } from "vitest";

import { ROLES } from "../../constants/roles";
import { inviteSchema } from "../../libs/schemas/entities/invite";
import { type Invite } from "../../types/invites";
import { createInviteService } from "./create-invite-service";

const validInvite: Invite = {
  id: "dcf6d793-9fe8-4964-aff4-b27b209052e5",
  organisation_id: "00000000-0000-0000-0000-000000000000",
  email: "test@example.com",
  status: "invited",
  role: ROLES.ADMIN,
  preferred_contact_method: "email",
  created_at: new Date("2026-04-26T16:39:02.185Z"),
  updated_at: new Date("2026-04-26T16:39:02.185Z"),
  expires_at: new Date("2026-05-01T16:39:02.185Z"),
};

describe("createInviteService", () => {
  let createInvite: any;
  let inviteUserByEmail: any;

  beforeEach(() => {
    createInvite = vi.fn().mockResolvedValue(validInvite);
    inviteUserByEmail = vi.fn().mockResolvedValue(undefined);
  });

  it("creates invite, sends email, and returns parsed invite", async () => {
    const result = await createInviteService({
      data: validInvite,
      createInvite,
      inviteUserByEmail,
    });
    expect(createInvite).toHaveBeenCalledWith({ data: validInvite });
    expect(inviteUserByEmail).toHaveBeenCalledWith({ data: validInvite });
    expect(result).toEqual(await inviteSchema.parseAsync(validInvite));
  });

  it("throws if invite is invalid", async () => {
    createInvite.mockResolvedValue({ ...validInvite, email: "not-an-email" });
    await expect(
      createInviteService({ data: { ...validInvite, email: "not-an-email" }, createInvite }),
    ).rejects.toThrow();
  });
});
