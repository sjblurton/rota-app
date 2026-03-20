import z from "zod";

export const tokenSchema = z.object({
  token: z
    .string()
    .describe(
      "A unique token associated with a shift, staff member, or other entity.",
    ),
});
