import { AuthError } from "@supabase/supabase-js";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { supabase } from "../../libs/auth/supabase";
import { type Invite } from "../../types/invites";
import { requireEnv } from "../../utils/env/requireEnv";
import { HttpErrorByCode } from "../../utils/http/HttpErrorByCode";
import { inviteUserByEmailService } from "./invite-user-by-email-service";

vi.mock("../../libs/auth/supabase", () => ({
  supabase: {
    auth: {
      admin: {
        inviteUserByEmail: vi.fn(),
      },
    },
  },
}));
vi.mock("../../utils/env/requireEnv", () => ({
  requireEnv: vi.fn(() => "http://localhost:3000"),
}));

const validInvite: Invite = {
  id: "dcf6d793-9fe8-4964-aff4-b27b209052e5",
  organisation_id: "org-1",
  email: "test@example.com",
  status: "invited",
  role: "staff",
  preferred_contact_method: "email",
  created_at: new Date("2026-04-26T16:39:02.185Z"),
  updated_at: new Date("2026-04-26T16:39:02.185Z"),
  expires_at: new Date("2026-05-01T16:39:02.185Z"),
};

describe("inviteUserByEmailService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws if invite is expired", async () => {
    await expect(
      inviteUserByEmailService({ data: { ...validInvite, expires_at: new Date("2020-01-01") } }),
    ).rejects.toThrow(HttpErrorByCode);
  });

  it("calls supabase.auth.admin.inviteUserByEmail with correct args", async () => {
    (supabase.auth.admin.inviteUserByEmail as any).mockResolvedValue({ error: null });
    await inviteUserByEmailService({ data: validInvite });
    expect(supabase.auth.admin.inviteUserByEmail).toHaveBeenCalledWith(validInvite.email, {
      data: {
        invite_id: validInvite.id,
        organisation_id: validInvite.organisation_id,
      },
      redirectTo: `http://localhost:3000/invite/${validInvite.id}`,
    });
    expect(requireEnv).toHaveBeenCalledWith("APP_URL");
  });

  it("throws if supabase returns error", async () => {
    (supabase.auth.admin.inviteUserByEmail as any).mockResolvedValue({
      error: new AuthError("Test error", 400, "bad_request"),
    });
    await expect(inviteUserByEmailService({ data: validInvite })).rejects.toThrow(AuthError);
  });

  it("returns undefined on success", async () => {
    (supabase.auth.admin.inviteUserByEmail as any).mockResolvedValue({ error: null });
    const result = await inviteUserByEmailService({ data: validInvite });
    expect(result).toBeUndefined();
  });

  it("returns early and does not call supabase in test env", async () => {
    (requireEnv as any).mockImplementation((key: string) =>
      key === "NODE_ENV" ? "test" : "http://localhost:3000",
    );
    const result = await inviteUserByEmailService({ data: validInvite });
    expect(result).toBeUndefined();
    expect(supabase.auth.admin.inviteUserByEmail).not.toHaveBeenCalled();
  });
});
