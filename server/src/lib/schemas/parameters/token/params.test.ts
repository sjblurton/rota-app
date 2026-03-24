import { describe, expect, it } from "vitest";

import { tokenParamSchema, tokenSchema } from "./params";

describe("token parameter schemas", () => {
  it("accepts valid token payloads", () => {
    expect(tokenSchema.safeParse({ token: "token-123" }).success).toBe(true);
    expect(tokenParamSchema.safeParse({ token: "swap-token" }).success).toBe(true);
  });

  it("rejects missing token values", () => {
    expect(tokenSchema.safeParse({}).success).toBe(false);
    expect(tokenParamSchema.safeParse({}).success).toBe(false);
  });
});
