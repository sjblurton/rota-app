import z from "zod";
import { utcDateTimeSchema } from "../time/dateTime";
import { baseSchema } from "./base";

export const organisationSchema = baseSchema.extend({
  name: z.string(),
  created_at: utcDateTimeSchema,
});

export const createOrganisationSchema = organisationSchema.omit({
  id: true,
  created_at: true,
});
