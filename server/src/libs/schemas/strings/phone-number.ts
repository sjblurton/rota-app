import { nonEmptyTrimmedStringSchema } from './non-empty-trimmed-string'

const INVALID_PHONE_NUMBER_ERROR =
  'Phone number must be in international format including country code (for example, +447123456789)'
const PHONE_NUMBER_MIN_LENGTH = 10
const PHONE_NUMBER_MAX_LENGTH = 16
const E164_PHONE_NUMBER_REGEX = /^\+[1-9]\d{9,14}$/

export const phoneNumberSchema = nonEmptyTrimmedStringSchema
  .max(PHONE_NUMBER_MAX_LENGTH, { message: INVALID_PHONE_NUMBER_ERROR })
  .min(PHONE_NUMBER_MIN_LENGTH, { message: INVALID_PHONE_NUMBER_ERROR })
  .refine((value) => E164_PHONE_NUMBER_REGEX.test(value), {
    message: INVALID_PHONE_NUMBER_ERROR,
  })
  .describe(
    'A valid phone number in E.164 format, which must start with a + followed by the country code and subscriber number (for example, +447123456789). The total length must be between 10 and 16 characters.',
  )
