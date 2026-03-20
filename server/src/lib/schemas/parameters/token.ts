import z from "zod";

export const tokenSchema = z.object({
  token: z
    .string()
    .describe(
      "A unique token associated with a shift, staff member, or other entity.",
    ),
});

export const tokenParamSchema = z.object({
  token: z.string().describe("Swap request access token from the SMS link"),
});
