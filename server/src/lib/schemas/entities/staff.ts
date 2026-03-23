import z from "zod";
import { nonEmptyTrimmedStringSchema } from "../strings/non-empty-trimmed-string";
import { createdAtBaseSchema } from "./base";
import { phoneNumberSchema } from "../strings/phone-number";

export const staffSchema = createdAtBaseSchema.extend({
  name: nonEmptyTrimmedStringSchema,
  phone_number: phoneNumberSchema,
});

export const managerSchema = staffSchema.extend({
  email: z.email(),
  password_hash: z.hash("sha256", { enc: "base64" }),
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
    organisation_id: z.uuid(),
  });
