import z from "zod";
import { baseSchema } from "./base";

export const organizationSchema = baseSchema.extend({
  name: z.string(),
});
