import z from "zod";

import { ROLES } from "../../../constants/roles";
import { COMMON_STATUS_NAMES } from "../../../constants/status";
import { emailSchema } from "../strings/email";
import { phoneNumberSchema } from "../strings/phone-number";

const staffStatusEnum = z.enum([COMMON_STATUS_NAMES.ACTIVE, COMMON_STATUS_NAMES.INACTIVE]);

const staffRoleEnum = z.enum([ROLES.STAFF, ROLES.MANAGER]);

export const createStaffSchema = z
  .object({
    name: z.string().min(1).max(255).describe("Staff member's name"),
    email: emailSchema
      .optional()
      .nullable()
      .describe("Staff member's email address (optional, unique)"),
    phone_number: phoneNumberSchema
      .optional()
      .nullable()
      .describe("Staff member's phone number in E.164 format (optional, unique)"),
    role: staffRoleEnum.default(ROLES.STAFF).describe("Staff role: staff or manager"),
    status: staffStatusEnum
      .default(COMMON_STATUS_NAMES.ACTIVE)
      .describe("Staff status: active or inactive"),
  })
  .openapi({
    example: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone_number: "+447123456789",
      role: "manager",
      status: "active",
    },
  });

export const staffSchema = z
  .object({
    id: z.uuid().describe("Staff member UUID"),
    name: z.string().min(1).max(255).describe("Staff member's name"),
    email: emailSchema
      .optional()
      .nullable()
      .describe("Staff member's email address (optional, unique)"),
    phone_number: phoneNumberSchema
      .optional()
      .nullable()
      .describe("Staff member's phone number in E.164 format (optional, unique)"),
    role: staffRoleEnum.default(ROLES.STAFF).describe("Staff role: staff or manager"),
    status: staffStatusEnum
      .default(COMMON_STATUS_NAMES.ACTIVE)
      .describe("Staff status: active or inactive"),
    organisation_id: z.uuid().describe("Organisation UUID"),
    created_at: z.date(),
    updated_at: z.date(),
  })
  .openapi({
    example: {
      id: "b1e2c3d4-e5f6-7890-abcd-1234567890ef",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone_number: "+447123456789",
      role: "manager",
      status: "active",
      organisation_id: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
      created_at: "2026-04-29T10:00:00Z",
      updated_at: "2026-04-29T10:00:00Z",
    },
  });
