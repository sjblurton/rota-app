import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { PLAN_TYPES } from "../../../constants/plan-type";
import { COMMON_STATUS_NAMES } from "../../../constants/status";
import { nonEmptyTrimmedStringSchema } from "../strings/non-empty-trimmed-string";
import { baseWithTimestampsSchema } from "./base";
import { userSchema } from "./user";

extendZodWithOpenApi(z);

const organisationStatusEnum = z.enum([COMMON_STATUS_NAMES.ACTIVE, COMMON_STATUS_NAMES.INACTIVE]);
const planTypeEnum = z.enum(Object.values(PLAN_TYPES)).default(PLAN_TYPES.FREE);

export const organisationSchema = baseWithTimestampsSchema
  .extend({
    name: nonEmptyTrimmedStringSchema,
    plan: planTypeEnum,
    sms_limit: z.number().int().nonnegative().default(100),
    sms_used_this_month: z.number().int().nonnegative().default(0),
    status: organisationStatusEnum.default(COMMON_STATUS_NAMES.ACTIVE),
    stripe_customer_id: z.string().nullable().default(null),
    users: userSchema.nullable().array().optional().default([]),
  })
  .openapi({
    example: {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Acme Corporation",
      plan: "free",
      sms_limit: 100,
      sms_used_this_month: 20,
      status: "active",
      stripe_customer_id: "cus_1234567890abcdef",
      users: [],
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T12:34:56Z",
    },
  });

export const createOrganisationSchema = organisationSchema
  .pick({
    name: true,
  })
  .openapi({
    example: {
      name: "Acme Corporation",
    },
  });
