import { beforeEach, describe, expect, it } from "vitest";

import {
  createManagerRecord,
  createOrganisationRecord,
  doesOrganisationExist,
  findManagerByNormalisedEmail,
  findOrganisationByNormalisedName,
  resetSuperadminStore,
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
    expect(findManagerByNormalisedEmail("jane.manager@example.com")).toBeUndefined();
  });
});