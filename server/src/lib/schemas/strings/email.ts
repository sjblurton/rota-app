import z from "zod";

export const emailSchema = z
  .string()
  .transform((email) => email.trim().toLowerCase())
  .refine((email) => z.email().safeParse(email).success, {
    message: "Invalid email",
  });
