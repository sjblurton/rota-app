import { beforeEach, describe, expect, it, vi } from "vitest";

import { ROLES } from "../../constants/roles";
import { updateInviteRepository } from "./update-invite-repository";

const mockUpdate = vi.fn(async ({ where, data }) => ({ where, data }));
const mockPrismaClient = { invite: { update: mockUpdate } };

describe("updateInviteRepository", () => {
  beforeEach(() => {
    mockUpdate.mockClear();
  });

  it("calls update with cleaned data and id", async () => {
    const input = {
      id: "invite-id",
      role: ROLES.ADMIN,
      status: undefined,
      accepted_by_user_id: undefined,
      expires_at: new Date("2026-05-01T00:00:00Z"),
    };
    await updateInviteRepository({
      tx: mockPrismaClient as any,
      data: input,
    });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "invite-id" },
      data: {
        role: "admin",
        expires_at: new Date("2026-05-01T00:00:00Z"),
      },
    });
  });

  it("removes all undefined fields from update data", async () => {
    const input = {
      id: "invite-id",
      role: undefined,
      status: undefined,
      accepted_by_user_id: undefined,
      expires_at: undefined,
    };
    await updateInviteRepository({
      tx: mockPrismaClient as any,
      data: input,
    });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "invite-id" },
      data: {},
    });
  });

  it("works with extra fields present", async () => {
    const input = {
      id: "invite-id",
      role: ROLES.ADMIN,
      foo: undefined,
      bar: 123,
    } as any;
    await updateInviteRepository({
      tx: mockPrismaClient as any,
      data: input,
    });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "invite-id" },
      data: { role: ROLES.ADMIN, bar: 123 },
    });
  });
});
