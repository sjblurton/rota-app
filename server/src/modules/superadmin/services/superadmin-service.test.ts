import { beforeEach, describe, expect, it, vi } from "vitest";

const repositoryMocks = vi.hoisted(() => ({
  createManagerRecord: vi.fn(),
  createOrganisationRecord: vi.fn(),
  doesOrganisationExist: vi.fn(),
  findManagerByNormalisedEmail: vi.fn(),
  findOrganisationByNormalisedName: vi.fn(),
}));

vi.mock("../db/superadmin-repository", () => repositoryMocks);

import {
  createManagerForOrganisation,
  createOrganisation,
} from "./superadmin-service";
import { createHash } from "node:crypto";

describe("createOrganisation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when an organisation already exists", () => {
    repositoryMocks.findOrganisationByNormalisedName.mockReturnValue({
      id: "org-1",
      name: "Acme Hospital",
      created_at: "2024-01-01T00:00:00Z",
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
    repositoryMocks.doesOrganisationExist.mockReturnValue(false);

    const result = createManagerForOrganisation("org-1", {
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password: "strong-password",
    });

    expect(result).toEqual({ kind: "organisation_not_found" });
    expect(repositoryMocks.findManagerByNormalisedEmail).not.toHaveBeenCalled();
  });

  it("returns manager_email_conflict when the email already exists", () => {
    repositoryMocks.doesOrganisationExist.mockReturnValue(true);
    repositoryMocks.findManagerByNormalisedEmail.mockReturnValue({
      id: "mgr-1",
      email: "jane.manager@example.com",
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
      organisation_id: "org-1",
    };

    repositoryMocks.doesOrganisationExist.mockReturnValue(true);
    repositoryMocks.findManagerByNormalisedEmail.mockReturnValue(undefined);
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
