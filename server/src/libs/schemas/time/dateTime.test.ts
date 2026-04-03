import { describe, expect, it } from "vitest";

import { utcDateTimeNowDefaultSchema, utcDateTimeSchema } from "./dateTime";

describe("utcDateTimeSchema", () => {
  it("accepts a valid ISO 8601 UTC datetime with trailing Z", () => {
    expect(utcDateTimeSchema.safeParse("2024-01-01T08:00:00Z").success).toBe(true);
  });

  it("accepts a datetime with milliseconds and trailing Z", () => {
    expect(utcDateTimeSchema.safeParse("2024-06-15T12:30:45.123Z").success).toBe(true);
  });

  it("rejects a datetime without trailing Z", () => {
    expect(utcDateTimeSchema.safeParse("2024-01-01T08:00:00").success).toBe(false);
  });

  it("rejects a datetime with timezone offset instead of Z", () => {
    expect(utcDateTimeSchema.safeParse("2024-01-01T08:00:00+01:00").success).toBe(false);
  });

  it("rejects a plain date string", () => {
    expect(utcDateTimeSchema.safeParse("2024-01-01").success).toBe(false);
  });

  it("rejects a non-date string", () => {
    expect(utcDateTimeSchema.safeParse("not-a-date").success).toBe(false);
  });
});

describe("utcDateTimeNowDefaultSchema", () => {
  it("passes through a valid ISO 8601 UTC datetime", () => {
    const result = utcDateTimeNowDefaultSchema.safeParse("2024-01-01T08:00:00Z");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe("2024-01-01T08:00:00Z");
    }
  });

  it("applies a default ISO UTC datetime when input is undefined", () => {
    const result = utcDateTimeNowDefaultSchema.safeParse(undefined);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/);
    }
  });

  it("rejects a non-UTC datetime", () => {
    expect(utcDateTimeNowDefaultSchema.safeParse("2024-01-01T08:00:00+01:00").success).toBe(false);
  });
});
