import { beforeEach, describe, expect, it, vi } from "vitest";

import { updateInviteSchema } from "../../libs/schemas/entities/invite";
import { createUserSchema } from "../../libs/schemas/entities/user";
import { type UpdateInvite } from "../../types/invites";
import { type CreateUserInput } from "../../types/user";
import { createUserService } from "./create-user-service";

const validUserData: CreateUserInput = {
  email: "test@example.com",
  supabase_user_id: "user-123",
  organisation_id: "00000000-0000-0000-0000-000000000000",
  role: "staff",
  status: "active",
  name: null,
};

const validInviteData: UpdateInvite = {
  id: "dcf6d793-9fe8-4964-aff4-b27b209052e5",
  status: "accepted",
};

describe("createUserService", () => {
  let acceptInvite: any;

  beforeEach(() => {
    acceptInvite = vi.fn().mockResolvedValue({ user: "created" });
  });

  it("parses data, calls acceptInvite, and returns user", async () => {
    const result = await createUserService({
      acceptInvite,
      userData: validUserData,
      inviteData: validInviteData,
    });
    expect(acceptInvite).toHaveBeenCalledWith({
      inviteUpdateData: updateInviteSchema.parse(validInviteData),
      userData: createUserSchema.parse(validUserData),
    });
    expect(result).toEqual({ user: "created" });
  });

  it("throws if userData is invalid", async () => {
    await expect(
      createUserService({
        acceptInvite,
        userData: { ...validUserData, email: "not-an-email" },
        inviteData: validInviteData,
      }),
    ).rejects.toThrow();
  });

  it("throws if inviteData is invalid", async () => {
    await expect(
      createUserService({
        acceptInvite,
        userData: validUserData,
        // @ts-expect-error - testing invalid data
        inviteData: { ...validInviteData, status: "invalid" },
      }),
    ).rejects.toThrow();
  });
});
