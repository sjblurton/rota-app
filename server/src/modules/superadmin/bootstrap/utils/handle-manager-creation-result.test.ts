import { beforeEach, describe, expect, it, vi } from "vitest";

import { handleManagerCreationResult } from "./handle-manager-creation-result";

const logger = vi.hoisted(() => ({
  info: vi.fn(),
  warn: vi.fn(),
}));

vi.mock("../../../../lib/logger", () => ({ logger }));

describe("handleManagerCreationResult", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("logs info when manager is created", () => {
    handleManagerCreationResult({
      kind: "created",
      manager: {
        name: "Test",
        id: "id",
        created_at: "2026-03-30T00:00:00Z",
        email: "test@example.com",
        is_active: true,
        phone_number: "+447700900000",
        organisation_id: "org-123",
      },
    });
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining("Created manager: Test (id)"));
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it("logs warn on email conflict", () => {
    handleManagerCreationResult({ kind: "manager_email_conflict" });
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("Manager email already exists"),
    );
    expect(logger.info).not.toHaveBeenCalled();
  });

  it("logs warn on other failure kinds", () => {
    handleManagerCreationResult({ kind: "organisation_inactive" });
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("Manager creation failed: organisation_inactive"),
    );
    expect(logger.info).not.toHaveBeenCalled();
  });
});
