import z from "zod";
import { utcDateTimeSchema } from "../dateTime";
import { baseSchema } from "./base";

export const organizationSchema = baseSchema.extend({
  name: z.string(),
  created_at: utcDateTimeSchema,
});

export const createOrganizationSchema = organizationSchema.omit({
  id: true,
  created_at: true,
});
