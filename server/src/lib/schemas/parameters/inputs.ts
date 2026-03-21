import z from "zod";
import { utcDateTimeSchema } from "../dateTime";

const toEpochMilliseconds = (isoUtcDateTime: string) =>
  Date.parse(isoUtcDateTime);

export const shiftResponseBodySchema = z.object({
  status: z
    .enum(["confirmed", "declined"])
    .describe("Set the shift response status for this token"),
});

export const swapRequestBodySchema = z.object({
  target_staff_id: z.string().describe("Staff member selected for the swap"),
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
  name: z.string().min(1).describe("Full name of the staff member"),
  phone_number: z
    .string()
    .min(1)
    .describe("Staff mobile number in E.164 format"),
});

export const updateStaffBodySchema = z
  .object({
    name: z.string().min(1).optional().describe("Updated staff name"),
    phone_number: z
      .string()
      .min(1)
      .optional()
      .describe("Updated staff mobile number in E.164 format"),
  })
  .refine(
    (payload) =>
      payload.name !== undefined || payload.phone_number !== undefined,
    {
      message: "At least one field must be provided to update staff",
    },
  );

export const createShiftBodySchema = z
  .object({
    staff_id: z.string().describe("Assigned staff member ID"),
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
    staff_id: z
      .string()
      .optional()
      .describe("Updated assigned staff member ID"),
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
  .refine(
    (payload) =>
      payload.staff_id !== undefined ||
      payload.start_time !== undefined ||
      payload.end_time !== undefined,
    {
      message: "At least one field must be provided to update a shift",
    },
  )
  .refine(
    (payload) =>
      payload.start_time === undefined ||
      payload.end_time === undefined ||
      toEpochMilliseconds(payload.start_time) <
        toEpochMilliseconds(payload.end_time),
    {
      message: "start_time must be before end_time when both are provided",
    },
  );
