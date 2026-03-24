import { randomUUID } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  managerIdParamSchema,
  organisationIdParamSchema,
  organisationManagerIdsParamSchema,
  shiftIdParamSchema,
  staffIdParamSchema,
  swapIdParamSchema,
} from "./params";

const validUUID = randomUUID();

describe("id parameter schemas", () => {
  it("accepts valid id params", () => {
    expect(staffIdParamSchema.safeParse({ staff_id: validUUID }).success).toBe(true);
    expect(shiftIdParamSchema.safeParse({ shift_id: validUUID }).success).toBe(true);
    expect(swapIdParamSchema.safeParse({ swap_id: validUUID }).success).toBe(true);
    expect(organisationIdParamSchema.safeParse({ organisation_id: validUUID }).success).toBe(true);
    expect(managerIdParamSchema.safeParse({ manager_id: validUUID }).success).toBe(true);
    expect(
      organisationManagerIdsParamSchema.safeParse({
        organisation_id: validUUID,
        manager_id: validUUID,
      }).success,
    ).toBe(true);
  });

  it("rejects missing ids", () => {
    expect(staffIdParamSchema.safeParse({}).success).toBe(false);
    expect(shiftIdParamSchema.safeParse({}).success).toBe(false);
    expect(swapIdParamSchema.safeParse({}).success).toBe(false);
    expect(organisationIdParamSchema.safeParse({}).success).toBe(false);
    expect(managerIdParamSchema.safeParse({}).success).toBe(false);
    expect(organisationManagerIdsParamSchema.safeParse({}).success).toBe(false);
  });
});
