import z from "zod";

import { nonEmptyTrimmedStringSchema } from "../strings/non-empty-trimmed-string";
import { utcDateTimeSchema } from "../time/dateTime";
import { baseSchema } from "./base";

export const organisationSchema = baseSchema.extend({
  name: nonEmptyTrimmedStringSchema,
  created_at: utcDateTimeSchema,
  is_active: z.boolean(),
});

export const createOrganisationSchema = z.object({
  name: nonEmptyTrimmedStringSchema,
});

export const updateOrganisationSchema = createOrganisationSchema
  .extend({
    is_active: z.boolean().optional(),
  })
  .partial()
  .refine((payload) => Object.values(payload).some((value) => value !== undefined), {
    message: "At least one field must be provided to update organisation",
  });
