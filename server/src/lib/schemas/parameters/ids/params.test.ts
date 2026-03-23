import { describe, expect, it } from "vitest";

import {
  organisationIdParamSchema,
  shiftIdParamSchema,
  staffIdParamSchema,
  swapIdParamSchema,
} from "./params";
import { randomUUID } from "node:crypto";

const validUUID = randomUUID();

describe("id parameter schemas", () => {
  it("accepts valid id params", () => {
    expect(staffIdParamSchema.safeParse({ staff_id: validUUID }).success).toBe(
      true,
    );
    expect(shiftIdParamSchema.safeParse({ shift_id: validUUID }).success).toBe(
      true,
    );
    expect(swapIdParamSchema.safeParse({ swap_id: validUUID }).success).toBe(
      true,
    );
    expect(
      organisationIdParamSchema.safeParse({ organisation_id: validUUID })
        .success,
    ).toBe(true);
  });

  it("rejects missing ids", () => {
    expect(staffIdParamSchema.safeParse({}).success).toBe(false);
    expect(shiftIdParamSchema.safeParse({}).success).toBe(false);
    expect(swapIdParamSchema.safeParse({}).success).toBe(false);
    expect(organisationIdParamSchema.safeParse({}).success).toBe(false);
  });
});
