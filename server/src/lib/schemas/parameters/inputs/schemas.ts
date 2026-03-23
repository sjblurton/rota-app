import z from "zod";
import { nonEmptyTrimmedStringSchema } from "../../strings/non-empty-trimmed-string";
import { utcDateTimeSchema } from "../../time/dateTime";
import {
  hasAtLeastOneDefinedField,
  hasValidTimeRangeWhenProvided,
  toEpochMilliseconds,
} from "./shared";
import { phoneNumberSchema } from "../../strings/phone-number";

export const shiftResponseBodySchema = z.object({
  status: z
    .enum(["confirmed", "declined"])
    .describe("Set the shift response status for this token"),
});

export const swapRequestBodySchema = z.object({
  target_staff_id: z.uuid().describe("Staff member selected for the swap"),
});

export const swapTargetDecisionBodySchema = z.object({
  decision: z
    .enum(["accept", "reject"])
    .describe("Target staff decision for the swap request"),
});

export const swapManagerDecisionBodySchema = z.object({
  decision: z
    .enum(["approve", "reject"])
    .describe("Manager decision for the accepted swap request"),
});

export const createStaffBodySchema = z.object({
  name: nonEmptyTrimmedStringSchema.describe("Full name of the staff member"),
  phone_number: phoneNumberSchema.describe(
    "Staff mobile number in international format (for example, +447123456789)",
  ),
});

export const updateStaffBodySchema = z
  .object({
    name: nonEmptyTrimmedStringSchema.optional().describe("Updated staff name"),
    phone_number: phoneNumberSchema
      .optional()
      .describe(
        "Updated staff mobile number in international format (for example, +447123456789)",
      ),
  })
  .refine((payload) => hasAtLeastOneDefinedField(payload), {
    message: "At least one field must be provided to update staff",
  });

export const createShiftBodySchema = z
  .object({
    staff_id: z.uuid().describe("Assigned staff member ID"),
    start_time: utcDateTimeSchema.describe(
      "Shift start datetime in ISO 8601 UTC format (trailing Z)",
    ),
    end_time: utcDateTimeSchema.describe(
      "Shift end datetime in ISO 8601 UTC format (trailing Z)",
    ),
  })
  .refine(
    (payload) =>
      toEpochMilliseconds(payload.start_time) <
      toEpochMilliseconds(payload.end_time),
    {
      message: "start_time must be before end_time",
    },
  );

export const updateShiftBodySchema = z
  .object({
    start_time: utcDateTimeSchema
      .optional()
      .describe(
        "Updated shift start datetime in ISO 8601 UTC format (trailing Z)",
      ),
    end_time: utcDateTimeSchema
      .optional()
      .describe(
        "Updated shift end datetime in ISO 8601 UTC format (trailing Z)",
      ),
  })
  .refine((payload) => hasAtLeastOneDefinedField(payload), {
    message: "At least one field must be provided to update a shift",
  })
  .refine(
    (payload) =>
      hasValidTimeRangeWhenProvided(payload.start_time, payload.end_time),
    {
      message: "start_time must be before end_time when both are provided",
    },
  );
