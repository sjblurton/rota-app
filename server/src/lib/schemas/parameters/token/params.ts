import { z } from "zod";

const createTokenParamSchema = (description: string) =>
  z.object({
    token: z.string().describe(description),
  });

export const tokenSchema = createTokenParamSchema(
  "A unique token associated with a shift, staff member, or other entity.",
);

export const tokenParamSchema = createTokenParamSchema(
  "Swap request access token from the SMS link",
);
