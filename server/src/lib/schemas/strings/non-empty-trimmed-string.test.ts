import { describe, expect, it } from "vitest";

import { nonEmptyTrimmedStringSchema } from "./non-empty-trimmed-string";

describe("nonEmptyTrimmedStringSchema", () => {
  it("accepts a non-empty string", () => {
    expect(nonEmptyTrimmedStringSchema.safeParse("Acme Hospital").success).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    expect(nonEmptyTrimmedStringSchema.parse("  Acme Hospital  ")).toBe("Acme Hospital");
  });

  it("rejects an empty string", () => {
    expect(nonEmptyTrimmedStringSchema.safeParse("").success).toBe(false);
  });

  it("rejects a whitespace-only string", () => {
    expect(nonEmptyTrimmedStringSchema.safeParse("   ").success).toBe(false);
  });
});
