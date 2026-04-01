import { describe, expect, it } from "vitest";

import { emailSchema } from "./email";

describe("emailSchema", () => {
  it("accepts a valid email", () => {
    expect(emailSchema.safeParse("alice@example.com").success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(emailSchema.safeParse("not-an-email").success).toBe(false);
  });

  it("trims and lowercases the email", () => {
    const result = emailSchema.parse("  Alice@Example.com  ");
    expect(result).toBe("alice@example.com");
  });

  it("rejects an empty string", () => {
    expect(emailSchema.safeParse("").success).toBe(false);
  });

  it("rejects a whitespace-only string", () => {
    expect(emailSchema.safeParse("   ").success).toBe(false);
  });
});
