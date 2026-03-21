import { describe, expect, it } from "vitest";

import {
  shiftIdParamSchema,
  staffIdParamSchema,
  swapIdParamSchema,
} from "./params";

describe("id parameter schemas", () => {
  it("accepts valid id params", () => {
    expect(staffIdParamSchema.safeParse({ staff_id: "staff-1" }).success).toBe(
      true,
    );
    expect(shiftIdParamSchema.safeParse({ shift_id: "shift-1" }).success).toBe(
      true,
    );
    expect(swapIdParamSchema.safeParse({ swap_id: "swap-1" }).success).toBe(
      true,
    );
  });

  it("rejects missing ids", () => {
    expect(staffIdParamSchema.safeParse({}).success).toBe(false);
    expect(shiftIdParamSchema.safeParse({}).success).toBe(false);
    expect(swapIdParamSchema.safeParse({}).success).toBe(false);
  });
});
