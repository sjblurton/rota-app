import z from "../../docs/zod-openapi";
import { baseSchema } from "./base";

export const organizationSchema = baseSchema.extend({
  name: z.string(),
});
