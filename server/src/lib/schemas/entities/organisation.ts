import { nonEmptyTrimmedStringSchema } from "../strings/non-empty-trimmed-string";
import { utcDateTimeSchema } from "../time/dateTime";
import { baseSchema } from "./base";

export const organisationSchema = baseSchema.extend({
  name: nonEmptyTrimmedStringSchema,
  created_at: utcDateTimeSchema,
});

export const createOrganisationSchema = organisationSchema.omit({
  id: true,
  created_at: true,
});
