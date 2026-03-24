import z from "zod";

import { nonEmptyTrimmedStringSchema } from "../strings/non-empty-trimmed-string";
import { phoneNumberSchema } from "../strings/phone-number";
import { createdAtBaseSchema } from "./base";

export const staffSchema = createdAtBaseSchema.extend({
  name: nonEmptyTrimmedStringSchema,
  phone_number: phoneNumberSchema,
});

export const managerSchema = staffSchema.extend({
  email: z.email(),
  is_active: z.boolean(),
  password_hash: z.hash("sha256", { enc: "base64" }),
});

export const createManagerSchema = z.object({
  name: nonEmptyTrimmedStringSchema,
  phone_number: phoneNumberSchema,
  email: z.email(),
  password: z.string().min(8),
});

export const updateManagerSchema = createManagerSchema
  .extend({
    is_active: z.boolean().optional(),
  })
  .partial()
  .refine((payload) => Object.values(payload).some((value) => value !== undefined), {
    message: "At least one field must be provided to update manager",
  });

export const managerWithOrganisationSchema = managerSchema
  .omit({
    password_hash: true,
  })
  .extend({
    organisation_id: z.uuid(),
  });
