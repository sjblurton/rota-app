import { describe, expect, it } from "vitest";

import { phoneNumberSchema } from "./phone-number";

describe("phoneNumberSchema", () => {
  describe("valid phone numbers", () => {
    it("accepts a phone number with + prefix", () => {
      const result = phoneNumberSchema.safeParse("+447911123456");
      expect(result.success).toBe(true);
      expect(result.data).toBe("+447911123456");
    });

    it("accepts a phone number at 14 characters", () => {
      const result = phoneNumberSchema.safeParse("+1234567890123");
      expect(result.success).toBe(true);
      expect(result.data).toBe("+1234567890123");
    });

    it("accepts a phone number with + and 15 digits at max length (16 chars)", () => {
      const result = phoneNumberSchema.safeParse("+123456789012345");
      expect(result.success).toBe(true);
      expect(result.data).toBe("+123456789012345");
    });

    it("trims leading and trailing whitespace", () => {
      const result = phoneNumberSchema.safeParse("  +447911123456  ");
      expect(result.success).toBe(true);
      expect(result.data).toBe("+447911123456");
    });

    it("trims only leading whitespace", () => {
      const result = phoneNumberSchema.safeParse("  +447911123456");
      expect(result.success).toBe(true);
      expect(result.data).toBe("+447911123456");
    });

    it("trims only trailing whitespace", () => {
      const result = phoneNumberSchema.safeParse("+447911123456  ");
      expect(result.success).toBe(true);
      expect(result.data).toBe("+447911123456");
    });
  });

  describe("invalid phone numbers", () => {
    it("rejects a phone number without + that has 9 digits", () => {
      const result = phoneNumberSchema.safeParse("123456789");
      expect(result.success).toBe(false);
    });

    it("rejects string shorter than 10 characters", () => {
      const result = phoneNumberSchema.safeParse("+123456789");
      expect(result.success).toBe(false);
    });

    it("too short phone number", () => {
      const result = phoneNumberSchema.safeParse("12");
      expect(result.success).toBe(false);
    });

    it("rejects empty string", () => {
      const result = phoneNumberSchema.safeParse("");
      expect(result.success).toBe(false);
    });

    it("rejects string with only whitespace", () => {
      const result = phoneNumberSchema.safeParse("   ");
      expect(result.success).toBe(false);
    });

    it("rejects phone number starting with +0", () => {
      const result = phoneNumberSchema.safeParse("+0447911123456");
      expect(result.success).toBe(false);
    });

    it("rejects phone number with only +", () => {
      const result = phoneNumberSchema.safeParse("+");
      expect(result.success).toBe(false);
    });

    it("rejects phone number with only a single digit", () => {
      const result = phoneNumberSchema.safeParse("1");
      expect(result.success).toBe(false);
    });

    it("rejects phone number exceeding 16 characters", () => {
      const result = phoneNumberSchema.safeParse("+1234567890123456");
      expect(result.success).toBe(false);
    });

    it("rejects phone number exceeding 16 characters without +", () => {
      const result = phoneNumberSchema.safeParse("1234567890123456");
      expect(result.success).toBe(false);
    });

    it("rejects phone number with letters", () => {
      const result = phoneNumberSchema.safeParse("+44791ABC1234");
      expect(result.success).toBe(false);
    });

    it("rejects phone number with dashes", () => {
      const result = phoneNumberSchema.safeParse("+44-791-123456");
      expect(result.success).toBe(false);
    });

    it("rejects phone number with internal spaces", () => {
      const result = phoneNumberSchema.safeParse("+44 791 123456");
      expect(result.success).toBe(false);
    });

    it("rejects phone number with parentheses", () => {
      const result = phoneNumberSchema.safeParse("+44 (791) 123456");
      expect(result.success).toBe(false);
    });

    it("rejects phone number without + prefix", () => {
      const result = phoneNumberSchema.safeParse("447911123456");
      expect(result.success).toBe(false);
    });

    it("rejects phone number starting with a digit and no +", () => {
      const result = phoneNumberSchema.safeParse("0123456789");
      expect(result.success).toBe(false);
    });

    it("rejects phone numbers containing letters even with enough digits", () => {
      const result = phoneNumberSchema.safeParse("+44ABC1234567890");
      expect(result.success).toBe(false);
    });

    it("rejects unsupported separators", () => {
      const result = phoneNumberSchema.safeParse("+44/791/123456");
      expect(result.success).toBe(false);
    });

    it("rejects non-string input", () => {
      const result = phoneNumberSchema.safeParse(447911123456);
      expect(result.success).toBe(false);
    });

    it("rejects null", () => {
      const result = phoneNumberSchema.safeParse(null);
      expect(result.success).toBe(false);
    });

    it("rejects undefined", () => {
      const result = phoneNumberSchema.safeParse(undefined);
      expect(result.success).toBe(false);
    });
  });

  describe("error messages", () => {
    it("provides a helpful error message for invalid format", () => {
      const result = phoneNumberSchema.safeParse("+0123456789");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Phone number must be in international format including country code (for example, +447123456789)",
        );
      }
    });

    it("provides the format example error message when + is missing", () => {
      const result = phoneNumberSchema.safeParse("447911123456");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Phone number must be in international format including country code (for example, +447123456789)",
        );
      }
    });
  });

  describe("edge cases", () => {
    it("rejects phone number with mixed separators", () => {
      const result = phoneNumberSchema.safeParse("+44 (791)-123 456");
      expect(result.success).toBe(false);
    });

    it("rejects + when it is not the first character", () => {
      const result = phoneNumberSchema.safeParse("44+791123456");
      expect(result.success).toBe(false);
    });

    it("rejects multiple + characters", () => {
      const result = phoneNumberSchema.safeParse("++44791123456");
      expect(result.success).toBe(false);
    });

    it("rejects unsupported punctuation separators", () => {
      const result = phoneNumberSchema.safeParse("+44.791.123456");
      expect(result.success).toBe(false);
    });

    it("rejects values that are separators only", () => {
      const result = phoneNumberSchema.safeParse("( - ) - ( )");
      expect(result.success).toBe(false);
    });

    it("accepts + followed by 1 and exactly 9 digits", () => {
      const result = phoneNumberSchema.safeParse("+1123456789");
      expect(result.success).toBe(true);
      expect(result.data).toBe("+1123456789");
    });

    it("accepts + value at 16-char max length (15 digits)", () => {
      const result = phoneNumberSchema.safeParse("+199999999999999");
      expect(result.success).toBe(true);
      expect(result.data).toBe("+199999999999999");
    });

    it("rejects phone number exceeding max length (17 chars)", () => {
      const result = phoneNumberSchema.safeParse("+1999999999999999");
      expect(result.success).toBe(false);
    });

    it("rejects phone number without + (non-+ value at upper bound)", () => {
      const result = phoneNumberSchema.safeParse("999999999999999");
      expect(result.success).toBe(false);
    });
  });
});
