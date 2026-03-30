import { z } from "zod";

export const utcDateTimeSchema = z.iso
  .datetime()
  .describe("ISO 8601 datetime in UTC with trailing Z (for example, 2026-03-21T09:30:00Z)");

export const utcDateTimeNowDefaultSchema = utcDateTimeSchema.default(() =>
  new Date().toISOString(),
);
