import { nonEmptyTrimmedStringSchema } from "../strings/non-empty-trimmed-string";
import { phoneNumberSchema } from "../strings/phone-number";
import { createdAtBaseSchema } from "./base";

export const staffSchema = createdAtBaseSchema.extend({
  name: nonEmptyTrimmedStringSchema,
  phone_number: phoneNumberSchema,
});
