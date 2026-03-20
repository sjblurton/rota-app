import z from "zod";

export const baseSchema = z.object({
  id: z.string(),
});

export const organizationBaseSchema = baseSchema.extend({
  organization_id: z.string(),
});

export const createdAtBaseSchema = baseSchema.extend({
  created_at: z.iso.datetime().default(() => new Date().toISOString()),
});
