import z from "../../docs/zod-openapi";
import { createdAtBaseSchema } from "./base";

export const staffSchema = createdAtBaseSchema.extend({
  name: z.string(),
  phone_number: z.string(),
});

export const managerSchema = staffSchema.extend({
  email: z.email(),
  password_hash: z.string(),
});
