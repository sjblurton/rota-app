import z from "zod";

const INVALID_PHONE_NUMBER_ERROR =
  "Phone number must be in international format including country code (for example, +447123456789)";

export const phoneNumberSchema = z
  .string()
  .trim()
  .nonempty()
  .max(16, { message: INVALID_PHONE_NUMBER_ERROR })
  .min(10, { message: INVALID_PHONE_NUMBER_ERROR })
  .refine((value) => /^\+[1-9]\d{9,14}$/.test(value), {
    message: INVALID_PHONE_NUMBER_ERROR,
  });
