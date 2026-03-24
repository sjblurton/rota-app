import { beforeEach, describe, expect, it, vi } from "vitest";

const repositoryMocks = vi.hoisted(() => ({
  createManagerRecord: vi.fn(),
  createOrganisationRecord: vi.fn(),
  deactivateManagersForOrganisation: vi.fn(),
  findManagerByIdForOrganisation: vi.fn(),
  findActiveManagerByNormalisedEmail: vi.fn(),
  findOrganisationById: vi.fn(),
  findOrganisationByNormalisedName: vi.fn(),
  updateManagerRecord: vi.fn(),
  updateOrganisationRecord: vi.fn(),
}));

vi.mock("../db/superadmin-repository", () => repositoryMocks);

import { createHash } from "node:crypto";

import {
  createManagerForOrganisation,
  createOrganisation,
  updateManagerForOrganisation,
  updateOrganisation,
} from "./superadmin-service";

describe("createOrganisation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when an organisation already exists", () => {
    repositoryMocks.findOrganisationByNormalisedName.mockReturnValue({
      id: "org-1",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });

    const result = createOrganisation({ name: "Acme Hospital" });

    expect(result).toBeNull();
    expect(repositoryMocks.createOrganisationRecord).not.toHaveBeenCalled();
  });

  it("creates an organisation when no duplicate exists", () => {
    const createdOrganisation = {
      id: "org-1",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    };

    repositoryMocks.findOrganisationByNormalisedName.mockReturnValue(undefined);
    repositoryMocks.createOrganisationRecord.mockReturnValue(
      createdOrganisation,
    );

    const result = createOrganisation({ name: "Acme Hospital" });

    expect(repositoryMocks.createOrganisationRecord).toHaveBeenCalledWith(
      "Acme Hospital",
    );
    expect(result).toEqual(createdOrganisation);
  });
});

describe("createManagerForOrganisation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns organisation_not_found when the organisation does not exist", () => {
    repositoryMocks.findOrganisationById.mockReturnValue(undefined);

    const result = createManagerForOrganisation("org-1", {
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password: "strong-password",
    });

    expect(result).toEqual({ kind: "organisation_not_found" });
    expect(
      repositoryMocks.findActiveManagerByNormalisedEmail,
    ).not.toHaveBeenCalled();
  });

  it("returns organisation_inactive when the organisation is inactive", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "org-1",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: false,
    });

    const result = createManagerForOrganisation("org-1", {
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password: "strong-password",
    });

    expect(result).toEqual({ kind: "organisation_inactive" });
  });

  it("returns manager_email_conflict when the email already exists", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "org-1",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });
    repositoryMocks.findActiveManagerByNormalisedEmail.mockReturnValue({
      id: "mgr-1",
      email: "jane.manager@example.com",
      is_active: true,
    });

    const result = createManagerForOrganisation("org-1", {
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password: "strong-password",
    });

    expect(result).toEqual({ kind: "manager_email_conflict" });
    expect(repositoryMocks.createManagerRecord).not.toHaveBeenCalled();
  });

  it("creates a manager when the organisation exists and email is unique", () => {
    const expectedPasswordHash = createHash("sha256")
      .update("strong-password")
      .digest("base64");

    const createdManager = {
      id: "mgr-1",
      created_at: "2024-01-01T00:00:00Z",
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      is_active: true,
      organisation_id: "org-1",
    };

    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "org-1",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });
    repositoryMocks.findActiveManagerByNormalisedEmail.mockReturnValue(
      undefined,
    );
    repositoryMocks.createManagerRecord.mockReturnValue(createdManager);

    const result = createManagerForOrganisation("org-1", {
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password: "strong-password",
    });

    expect(repositoryMocks.createManagerRecord).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: "jane.manager@example.com",
        organisation_id: "org-1",
        password_hash: expectedPasswordHash,
      }),
    );
    expect(result).toEqual({
      kind: "created",
      manager: createdManager,
    });
  });
});

describe("updateOrganisation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns organisation_not_found when the organisation does not exist", () => {
    repositoryMocks.findOrganisationById.mockReturnValue(undefined);

    const result = updateOrganisation("11111111-1111-1111-1111-111111111111", {
      name: "Updated Name",
    });

    expect(result).toEqual({ kind: "organisation_not_found" });
  });

  it("returns organisation_name_conflict when another organisation has the same name", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Original Name",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });
    repositoryMocks.findOrganisationByNormalisedName.mockReturnValue({
      id: "22222222-2222-2222-2222-222222222222",
      name: "Updated Name",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });

    const result = updateOrganisation("11111111-1111-1111-1111-111111111111", {
      name: "Updated Name",
    });

    expect(result).toEqual({ kind: "organisation_name_conflict" });
  });

  it("updates organisation when payload is valid", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Original Name",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });
    repositoryMocks.findOrganisationByNormalisedName.mockReturnValue(undefined);
    repositoryMocks.updateOrganisationRecord.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Updated Name",
      created_at: "2024-01-01T00:00:00Z",
      is_active: false,
    });

    const result = updateOrganisation("11111111-1111-1111-1111-111111111111", {
      name: "Updated Name",
      is_active: false,
    });

    expect(repositoryMocks.updateOrganisationRecord).toHaveBeenCalledWith(
      "11111111-1111-1111-1111-111111111111",
      { name: "Updated Name", is_active: false },
    );
    expect(result).toEqual({
      kind: "updated",
      organisation: {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Updated Name",
        created_at: "2024-01-01T00:00:00Z",
        is_active: false,
      },
    });
    expect(
      repositoryMocks.deactivateManagersForOrganisation,
    ).toHaveBeenCalledWith("11111111-1111-1111-1111-111111111111");
  });

  it("returns organisation_not_found when organisation disappears before update", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Original Name",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });
    repositoryMocks.findOrganisationByNormalisedName.mockReturnValue(undefined);
    repositoryMocks.updateOrganisationRecord.mockReturnValue(null);

    const result = updateOrganisation("11111111-1111-1111-1111-111111111111", {
      name: "Updated Name",
    });

    expect(result).toEqual({ kind: "organisation_not_found" });
  });

  it("does not cascade manager deactivation when is_active is not being set to false", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Original Name",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });
    repositoryMocks.findOrganisationByNormalisedName.mockReturnValue(undefined);
    repositoryMocks.updateOrganisationRecord.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Updated Name",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });

    updateOrganisation("11111111-1111-1111-1111-111111111111", {
      name: "Updated Name",
    });

    expect(
      repositoryMocks.deactivateManagersForOrganisation,
    ).not.toHaveBeenCalled();
  });
});

describe("updateManagerForOrganisation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns organisation_not_found when organisation does not exist", () => {
    repositoryMocks.findOrganisationById.mockReturnValue(undefined);

    const result = updateManagerForOrganisation(
      "11111111-1111-1111-1111-111111111111",
      "22222222-2222-2222-2222-222222222222",
      { name: "Updated Manager" },
    );

    expect(result).toEqual({ kind: "organisation_not_found" });
  });

  it("returns organisation_inactive when organisation is inactive", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: false,
    });

    const result = updateManagerForOrganisation(
      "11111111-1111-1111-1111-111111111111",
      "22222222-2222-2222-2222-222222222222",
      { name: "Updated Manager" },
    );

    expect(result).toEqual({ kind: "organisation_inactive" });
  });

  it("returns manager_not_found when manager does not exist", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });
    repositoryMocks.findManagerByIdForOrganisation.mockReturnValue(undefined);

    const result = updateManagerForOrganisation(
      "11111111-1111-1111-1111-111111111111",
      "22222222-2222-2222-2222-222222222222",
      { name: "Updated Manager" },
    );

    expect(result).toEqual({ kind: "manager_not_found" });
  });

  it("returns manager_email_conflict when email belongs to another manager", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });
    repositoryMocks.findManagerByIdForOrganisation.mockReturnValue({
      id: "22222222-2222-2222-2222-222222222222",
      email: "old@example.com",
      is_active: true,
    });
    repositoryMocks.findActiveManagerByNormalisedEmail.mockReturnValue({
      id: "33333333-3333-3333-3333-333333333333",
      email: "new@example.com",
      is_active: true,
    });

    const result = updateManagerForOrganisation(
      "11111111-1111-1111-1111-111111111111",
      "22222222-2222-2222-2222-222222222222",
      { email: "new@example.com" },
    );

    expect(result).toEqual({ kind: "manager_email_conflict" });
  });

  it("updates manager and hashes password when provided", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });
    repositoryMocks.findManagerByIdForOrganisation.mockReturnValue({
      id: "22222222-2222-2222-2222-222222222222",
      email: "old@example.com",
      is_active: true,
    });
    repositoryMocks.findActiveManagerByNormalisedEmail.mockReturnValue(
      undefined,
    );
    repositoryMocks.updateManagerRecord.mockReturnValue({
      id: "22222222-2222-2222-2222-222222222222",
      created_at: "2024-01-01T00:00:00Z",
      name: "Updated Manager",
      phone_number: "+447700900123",
      email: "new@example.com",
      is_active: false,
      organisation_id: "11111111-1111-1111-1111-111111111111",
    });

    const result = updateManagerForOrganisation(
      "11111111-1111-1111-1111-111111111111",
      "22222222-2222-2222-2222-222222222222",
      {
        name: "Updated Manager",
        phone_number: "+447700900555",
        email: "new@example.com",
        is_active: false,
        password: "strong-password",
      },
    );

    const expectedPasswordHash = createHash("sha256")
      .update("strong-password")
      .digest("base64");

    expect(repositoryMocks.updateManagerRecord).toHaveBeenCalledWith(
      "11111111-1111-1111-1111-111111111111",
      "22222222-2222-2222-2222-222222222222",
      expect.objectContaining({
        name: "Updated Manager",
        phone_number: "+447700900555",
        email: "new@example.com",
        password_hash: expectedPasswordHash,
      }),
    );
    expect(result).toEqual({
      kind: "updated",
      manager: {
        id: "22222222-2222-2222-2222-222222222222",
        created_at: "2024-01-01T00:00:00Z",
        name: "Updated Manager",
        phone_number: "+447700900123",
        email: "new@example.com",
        is_active: false,
        organisation_id: "11111111-1111-1111-1111-111111111111",
      },
    });
  });

  it("returns manager_not_found when manager disappears before update", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });
    repositoryMocks.findManagerByIdForOrganisation.mockReturnValue({
      id: "22222222-2222-2222-2222-222222222222",
      email: "old@example.com",
      is_active: true,
    });
    repositoryMocks.findActiveManagerByNormalisedEmail.mockReturnValue(
      undefined,
    );
    repositoryMocks.updateManagerRecord.mockReturnValue(null);

    const result = updateManagerForOrganisation(
      "11111111-1111-1111-1111-111111111111",
      "22222222-2222-2222-2222-222222222222",
      { name: "Updated Manager" },
    );

    expect(result).toEqual({ kind: "manager_not_found" });
  });

  it("allows an email used by an inactive manager", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });
    repositoryMocks.findManagerByIdForOrganisation.mockReturnValue({
      id: "22222222-2222-2222-2222-222222222222",
      email: "old@example.com",
      is_active: true,
    });
    repositoryMocks.findActiveManagerByNormalisedEmail.mockReturnValue(
      undefined,
    );
    repositoryMocks.updateManagerRecord.mockReturnValue({
      id: "22222222-2222-2222-2222-222222222222",
      created_at: "2024-01-01T00:00:00Z",
      name: "Updated Manager",
      phone_number: "+447700900123",
      email: "reused@example.com",
      is_active: true,
      organisation_id: "11111111-1111-1111-1111-111111111111",
    });

    const result = updateManagerForOrganisation(
      "11111111-1111-1111-1111-111111111111",
      "22222222-2222-2222-2222-222222222222",
      { email: "reused@example.com" },
    );

    expect(result).toEqual({
      kind: "updated",
      manager: {
        id: "22222222-2222-2222-2222-222222222222",
        created_at: "2024-01-01T00:00:00Z",
        name: "Updated Manager",
        phone_number: "+447700900123",
        email: "reused@example.com",
        is_active: true,
        organisation_id: "11111111-1111-1111-1111-111111111111",
      },
    });
  });

  it("returns manager_email_conflict when reactivating to an email used by another active manager", () => {
    repositoryMocks.findOrganisationById.mockReturnValue({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
      is_active: true,
    });
    repositoryMocks.findManagerByIdForOrganisation.mockReturnValue({
      id: "22222222-2222-2222-2222-222222222222",
      email: "reactivate@example.com",
      is_active: false,
    });
    repositoryMocks.findActiveManagerByNormalisedEmail.mockReturnValue({
      id: "33333333-3333-3333-3333-333333333333",
      email: "reactivate@example.com",
      is_active: true,
    });

    const result = updateManagerForOrganisation(
      "11111111-1111-1111-1111-111111111111",
      "22222222-2222-2222-2222-222222222222",
      { is_active: true },
    );

    expect(result).toEqual({ kind: "manager_email_conflict" });
  });
});
