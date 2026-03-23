import z from "zod";

const INVALID_PHONE_NUMBER_ERROR =
  "Phone number must be in international format including country code (for example, +447123456789)";
const PHONE_NUMBER_MIN_LENGTH = 10;
const PHONE_NUMBER_MAX_LENGTH = 16;
const E164_PHONE_NUMBER_REGEX = /^\+[1-9]\d{9,14}$/;

export const phoneNumberSchema = z
  .string()
  .trim()
  .nonempty()
  .max(PHONE_NUMBER_MAX_LENGTH, { message: INVALID_PHONE_NUMBER_ERROR })
  .min(PHONE_NUMBER_MIN_LENGTH, { message: INVALID_PHONE_NUMBER_ERROR })
  .refine((value) => E164_PHONE_NUMBER_REGEX.test(value), {
    message: INVALID_PHONE_NUMBER_ERROR,
  });
