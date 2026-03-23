import { beforeEach, describe, expect, it } from "vitest";

import {
  createManagerRecord,
  createOrganisationRecord,
  deactivateManagersForOrganisation,
  doesOrganisationExist,
  findActiveManagerByNormalisedEmail,
  findManagerById,
  findManagerByIdForOrganisation,
  findManagerByNormalisedEmail,
  findOrganisationById,
  findOrganisationByNormalisedName,
  resetSuperadminStore,
  updateManagerRecord,
  updateOrganisationRecord,
} from "./superadmin-repository";

describe("superadmin repository", () => {
  beforeEach(() => {
    resetSuperadminStore();
  });

  it("creates an organisation record with an id and UTC timestamp", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    expect(organisation).toEqual({
      id: expect.any(String),
      name: "Acme Hospital",
      created_at: expect.stringMatching(/Z$/),
      is_active: true,
    });
  });

  it("finds an organisation by normalised name", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    const result = findOrganisationByNormalisedName("  acme hospital  ");

    expect(result).toEqual(organisation);
  });

  it("returns undefined when an organisation name is not found", () => {
    createOrganisationRecord("Acme Hospital");

    const result = findOrganisationByNormalisedName("Different Hospital");

    expect(result).toBeUndefined();
  });

  it("finds an organisation by id", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    const result = findOrganisationById(organisation.id);

    expect(result).toEqual(organisation);
  });

  it("reports whether an organisation exists by id", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    expect(doesOrganisationExist(organisation.id)).toBe(true);
    expect(doesOrganisationExist("missing-org")).toBe(false);
  });

  it("creates a manager record without exposing the password hash", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    const manager = createManagerRecord({
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password_hash: "hashed-password",
      organisation_id: organisation.id,
    });

    expect(manager).toEqual({
      id: expect.any(String),
      created_at: expect.stringMatching(/Z$/),
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      is_active: true,
      organisation_id: organisation.id,
    });
    expect(manager).not.toHaveProperty("password_hash");
  });

  it("finds a manager by normalised email after creation", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    createManagerRecord({
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "Jane.Manager@Example.com",
      password_hash: "hashed-password",
      organisation_id: organisation.id,
    });

    const result = findManagerByNormalisedEmail("  jane.manager@example.com  ");

    expect(result).toEqual({
      id: expect.any(String),
      created_at: expect.stringMatching(/Z$/),
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "Jane.Manager@Example.com",
      is_active: true,
      password_hash: "hashed-password",
      organisation_id: organisation.id,
    });
  });

  it("returns undefined when a manager email is not found", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    createManagerRecord({
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password_hash: "hashed-password",
      organisation_id: organisation.id,
    });

    const result = findManagerByNormalisedEmail("missing@example.com");

    expect(result).toBeUndefined();
  });

  it("finds an active manager by normalised email and ignores inactive records", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    const firstManager = createManagerRecord({
      name: "Inactive Manager",
      phone_number: "+447700900123",
      email: "shared@example.com",
      password_hash: "hashed-password",
      organisation_id: organisation.id,
    });

    updateManagerRecord(organisation.id, firstManager.id, { is_active: false });

    const secondManager = createManagerRecord({
      name: "Active Manager",
      phone_number: "+447700900124",
      email: "shared@example.com",
      password_hash: "hashed-password",
      organisation_id: organisation.id,
    });

    const result = findActiveManagerByNormalisedEmail("  shared@example.com  ");

    expect(result).toMatchObject({
      id: secondManager.id,
      is_active: true,
      email: "shared@example.com",
    });
  });

  it("finds a manager by organisation and manager id", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    const manager = createManagerRecord({
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password_hash: "hashed-password",
      organisation_id: organisation.id,
    });

    const result = findManagerByIdForOrganisation(organisation.id, manager.id);

    expect(result).toMatchObject({
      id: manager.id,
      organisation_id: organisation.id,
    });
  });

  it("finds a manager by manager id", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    const manager = createManagerRecord({
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password_hash: "hashed-password",
      organisation_id: organisation.id,
    });

    const result = findManagerById(manager.id);

    expect(result).toMatchObject({
      id: manager.id,
      organisation_id: organisation.id,
    });
  });

  it("updates an organisation record", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    const result = updateOrganisationRecord(organisation.id, {
      name: "Acme Health Group",
      is_active: false,
    });

    expect(result).toEqual({
      ...organisation,
      name: "Acme Health Group",
      is_active: false,
    });
  });

  it("returns null when updating an unknown organisation", () => {
    const result = updateOrganisationRecord("missing-org", {
      name: "Acme Health Group",
    });

    expect(result).toBeNull();
  });

  it("updates a manager record", () => {
    const organisation = createOrganisationRecord("Acme Hospital");
    const manager = createManagerRecord({
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password_hash: "hashed-password",
      organisation_id: organisation.id,
    });

    const result = updateManagerRecord(organisation.id, manager.id, {
      name: "Updated Manager",
      email: "updated.manager@example.com",
      is_active: false,
    });

    expect(result).toEqual({
      ...manager,
      name: "Updated Manager",
      email: "updated.manager@example.com",
      is_active: false,
    });
  });

  it("returns null when updating an unknown manager", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    const result = updateManagerRecord(organisation.id, "missing-manager", {
      name: "Updated Manager",
    });

    expect(result).toBeNull();
  });

  it("deactivates all managers for an organisation", () => {
    const organisation = createOrganisationRecord("Acme Hospital");
    const otherOrganisation = createOrganisationRecord("Other Hospital");

    const managerInOrganisation = createManagerRecord({
      name: "Organisation Manager",
      phone_number: "+447700900123",
      email: "organisation@example.com",
      password_hash: "hashed-password",
      organisation_id: organisation.id,
    });

    const managerInOtherOrganisation = createManagerRecord({
      name: "Other Manager",
      phone_number: "+447700900124",
      email: "other@example.com",
      password_hash: "hashed-password",
      organisation_id: otherOrganisation.id,
    });

    deactivateManagersForOrganisation(organisation.id);

    expect(
      findManagerByIdForOrganisation(organisation.id, managerInOrganisation.id),
    ).toMatchObject({ is_active: false });
    expect(
      findManagerByIdForOrganisation(
        otherOrganisation.id,
        managerInOtherOrganisation.id,
      ),
    ).toMatchObject({ is_active: true });
  });

  it("clears organisations and managers when the store is reset", () => {
    const organisation = createOrganisationRecord("Acme Hospital");

    createManagerRecord({
      name: "Jane Manager",
      phone_number: "+447700900123",
      email: "jane.manager@example.com",
      password_hash: "hashed-password",
      organisation_id: organisation.id,
    });

    resetSuperadminStore();

    expect(findOrganisationByNormalisedName("Acme Hospital")).toBeUndefined();
    expect(doesOrganisationExist(organisation.id)).toBe(false);
    expect(
      findManagerByNormalisedEmail("jane.manager@example.com"),
    ).toBeUndefined();
  });
});
