import { beforeEach, describe, expect, it } from "vitest";

import {
  createManagerRecord,
  findActiveManagerByNormalisedEmail,
  findManagerById,
  findManagerByNormalisedEmail,
  resetManagersStore,
  updateManagerRecord,
} from "./managers-repository";

const validManager = {
  name: "Alice",
  phone_number: "+441234567890",
  email: "alice@example.com",
  password: "Password123",
};

const IDS = {
  org1: crypto.randomUUID(),
  org2: crypto.randomUUID(),
  org3: crypto.randomUUID(),
  org4: crypto.randomUUID(),
  org5: crypto.randomUUID(),
  org6: crypto.randomUUID(),
  org7: crypto.randomUUID(),
  org8: crypto.randomUUID(),
} as const;

describe("managers-repository", () => {
  beforeEach(() => {
    resetManagersStore();
  });

  it("creates a manager and retrieves by email and id", () => {
    const created = createManagerRecord(IDS.org1, validManager);
    expect(created.name).toBe(validManager.name);
    expect(created.email).toBe(validManager.email.toLowerCase());
    expect(created.organisation_id).toBe(IDS.org1);
    expect(created).not.toHaveProperty("password_hash");
    expect(findManagerByNormalisedEmail(validManager.email)?.id).toBe(created.id);
    expect(findManagerById(created.id)?.id).toBe(created.id);
  });

  it("normalises email for lookup and storage", () => {
    createManagerRecord(IDS.org2, { ...validManager, email: "  Alice@Example.com  " });
    expect(findManagerByNormalisedEmail("alice@example.com")).toBeTruthy();
    expect(findManagerByNormalisedEmail("ALICE@EXAMPLE.COM")).toBeTruthy();
  });

  it("prevents duplicate emails (normalised)", () => {
    createManagerRecord(IDS.org3, validManager);
    expect(() =>
      createManagerRecord(IDS.org3, { ...validManager, email: "ALICE@EXAMPLE.COM" }),
    ).toThrow(/already exists/);
  });

  it("finds only active managers by email", () => {
    createManagerRecord(IDS.org4, validManager);
    updateManagerRecord(IDS.org4, findManagerByNormalisedEmail(validManager.email)!.id, {
      is_active: false,
    });
    expect(findActiveManagerByNormalisedEmail(validManager.email)).toBeUndefined();
  });

  it("updates manager fields and password", () => {
    const created = createManagerRecord(IDS.org5, validManager);
    const updated = updateManagerRecord(IDS.org5, created.id, {
      name: "Alicia",
      phone_number: "+441111111111",
      email: "alicia@example.com",
      is_active: false,
      password: "NewPassword456",
    });
    expect(updated).toMatchObject({
      name: "Alicia",
      phone_number: "+441111111111",
      email: "alicia@example.com",
      is_active: false,
      organisation_id: IDS.org5,
    });
  });

  it("throws when updating non-existent manager", () => {
    expect(() => updateManagerRecord(IDS.org6, crypto.randomUUID(), { name: "X" })).toThrow();
  });

  it("throws on invalid create payload", () => {
    expect(() =>
      createManagerRecord(IDS.org7, { ...validManager, email: "not-an-email" }),
    ).toThrow();
  });

  it("throws on invalid update payload", () => {
    const created = createManagerRecord(IDS.org8, validManager);
    expect(() => updateManagerRecord(IDS.org8, created.id, { email: "bad" })).toThrow();
  });
});
