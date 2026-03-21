import z from "zod";
import { createdAtBaseSchema } from "./base";

export const staffSchema = createdAtBaseSchema.extend({
  name: z.string(),
  phone_number: z.string(),
});

export const managerSchema = staffSchema.extend({
  email: z.email(),
  password_hash: z.string(),
});

export const createManagerSchema = managerSchema
  .omit({
    id: true,
    created_at: true,
    password_hash: true,
  })
  .extend({
    password: z.string().min(8),
  });

export const managerWithOrganisationSchema = managerSchema
  .omit({
    password_hash: true,
  })
  .extend({
    organisation_id: z.string(),
  });
