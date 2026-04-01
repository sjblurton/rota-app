import { z } from "zod";

import { emailSchema } from "../strings/email";
import { staffSchema } from "./staff";

export const managerSchema = staffSchema.extend({
  email: emailSchema,
  is_active: z.boolean(),
  password_hash: z.hash("sha256", { enc: "base64" }),
  organisation_id: z.uuid(),
});

export const publicManagerSchema = managerSchema.omit({ password_hash: true });

export const createManagerSchema = managerSchema
  .omit({
    is_active: true,
    password_hash: true,
    created_at: true,
    id: true,
  })
  .extend({
    password: z.string().min(8),
  });

export const createManagerBodySchema = createManagerSchema.omit({ organisation_id: true });

export const updateManagerSchema = managerSchema
  .omit({
    password_hash: true,
    organisation_id: true,
  })
  .extend({
    password: z.string().min(8).optional(),
  })
  .partial()
  .refine((payload) => Object.values(payload).some((value) => value !== undefined), {
    message: "At least one field must be provided to update manager",
  });
