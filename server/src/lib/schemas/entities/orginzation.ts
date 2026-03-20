import z from "zod";
import { baseSchema } from "./base";

export const organizationSchema = baseSchema.extend({
  name: z.string(),
  created_at: z.iso.datetime(),
});

export const createOrganizationSchema = organizationSchema.omit({
  id: true,
  created_at: true,
});
