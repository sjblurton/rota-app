import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as superadminRepository from "../db/superadmin-repository";
import * as superadminService from "../services/superadmin-service";
import { seedSuperadminStore } from "./seed-superadmin-store";

vi.mock("../services/superadmin-service");
vi.mock("../db/superadmin-repository");

const { mockLogger } = vi.hoisted(() => ({
  mockLogger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../../lib/logger", () => ({
  logger: mockLogger,
}));

describe("seedSuperadminStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env["NODE_ENV"];
    delete process.env["ENABLE_DEV_SEED"];
  });

  afterEach(() => {
    delete process.env["NODE_ENV"];
    delete process.env["ENABLE_DEV_SEED"];
  });

  it("does nothing when NODE_ENV is not development", () => {
    process.env["NODE_ENV"] = "production";
    process.env["ENABLE_DEV_SEED"] = "true";

    seedSuperadminStore();

    expect(mockLogger.info).not.toHaveBeenCalled();
  });

  it("does nothing when ENABLE_DEV_SEED is not true", () => {
    process.env["NODE_ENV"] = "development";
    process.env["ENABLE_DEV_SEED"] = "false";

    seedSuperadminStore();

    expect(mockLogger.info).not.toHaveBeenCalled();
  });

  it("seeds organisation and manager successfully", () => {
    process.env["NODE_ENV"] = "development";
    process.env["ENABLE_DEV_SEED"] = "true";

    const mockOrganisation = {
      id: "org-123",
      name: "Acme Hospital",
      created_at: "2026-03-30T00:00:00Z",
      is_active: true,
    };

    const mockManager = {
      id: "mgr-456",
      name: "Sarah Manager",
      phone_number: "+447700900000",
      email: "sarah@acmehospital.example",
      created_at: "2026-03-30T00:00:00Z",
      is_active: true,
      organisation_id: "org-123",
    };

    vi.mocked(superadminService.createOrganisation).mockReturnValue(mockOrganisation);

    vi.mocked(superadminRepository.findOrganisationByNormalisedName).mockReturnValue(
      mockOrganisation,
    );

    vi.mocked(superadminService.createManagerForOrganisation).mockReturnValue({
      kind: "created",
      manager: mockManager,
    });

    seedSuperadminStore();

    expect(superadminService.createOrganisation).toHaveBeenCalledWith({
      name: "Acme Hospital",
    });
    expect(superadminService.createManagerForOrganisation).toHaveBeenCalledWith("org-123", {
      name: "Sarah Manager",
      phone_number: "+447700900000",
      email: "sarah@acmehospital.example",
      password: "DevPassword123",
    });
    expect(mockLogger.info).toHaveBeenCalledWith("✅ Superadmin store seed complete");
  });

  it("handles already-existing organisation", () => {
    process.env["NODE_ENV"] = "development";
    process.env["ENABLE_DEV_SEED"] = "true";

    const mockOrganisation = {
      id: "org-789",
      name: "Acme Hospital",
      created_at: "2026-03-30T00:00:00Z",
      is_active: true,
    };

    vi.mocked(superadminService.createOrganisation).mockReturnValue(null);

    vi.mocked(superadminRepository.findOrganisationByNormalisedName).mockReturnValue(
      mockOrganisation,
    );

    vi.mocked(superadminService.createManagerForOrganisation).mockReturnValue({
      kind: "created",
      manager: {
        id: "mgr-789",
        name: "Sarah Manager",
        phone_number: "+447700900000",
        email: "sarah@acmehospital.example",
        created_at: "2026-03-30T00:00:00Z",
        is_active: true,
        organisation_id: "org-789",
      },
    });

    seedSuperadminStore();

    expect(mockLogger.warn).toHaveBeenCalledWith(
      "Organisation 'Acme Hospital' already exists, skipping creation",
    );
  });

  it("handles manager email conflict", () => {
    process.env["NODE_ENV"] = "development";
    process.env["ENABLE_DEV_SEED"] = "true";

    const mockOrganisation = {
      id: "org-123",
      name: "Acme Hospital",
      created_at: "2026-03-30T00:00:00Z",
      is_active: true,
    };

    vi.mocked(superadminService.createOrganisation).mockReturnValue(mockOrganisation);

    vi.mocked(superadminRepository.findOrganisationByNormalisedName).mockReturnValue(
      mockOrganisation,
    );

    vi.mocked(superadminService.createManagerForOrganisation).mockReturnValue({
      kind: "manager_email_conflict",
    });

    seedSuperadminStore();

    expect(mockLogger.warn).toHaveBeenCalledWith(
      "Manager email already exists, skipping manager creation",
    );
  });

  it("logs error if organisation lookup fails", () => {
    process.env["NODE_ENV"] = "development";
    process.env["ENABLE_DEV_SEED"] = "true";

    const mockOrganisation = {
      id: "org-123",
      name: "Acme Hospital",
      created_at: "2026-03-30T00:00:00Z",
      is_active: true,
    };

    vi.mocked(superadminService.createOrganisation).mockReturnValue(mockOrganisation);

    vi.mocked(superadminRepository.findOrganisationByNormalisedName).mockReturnValue(undefined);

    seedSuperadminStore();

    expect(mockLogger.error).toHaveBeenCalledWith(
      "Failed to find organisation for manager creation",
    );
  });

  it("catches and logs unexpected errors", () => {
    process.env["NODE_ENV"] = "development";
    process.env["ENABLE_DEV_SEED"] = "true";

    const testError = new Error("Unexpected error");

    vi.mocked(superadminService.createOrganisation).mockImplementation(() => {
      throw testError;
    });

    seedSuperadminStore();

    expect(mockLogger.error).toHaveBeenCalledWith(
      { error: testError },
      "❌ Error seeding superadmin store",
    );
  });
});
