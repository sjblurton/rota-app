import z from "zod";

import { ROLES } from "../../../constants/roles";
import { COMMON_STATUS_NAMES } from "../../../constants/status";
import { baseWithTimestampsSchema, userRoleEnum } from "./base";

export const userSchema = baseWithTimestampsSchema
  .extend({
    id: z.uuid(),
    email: z.email(),
    name: z.string().nullable().optional().default(null),
    supabase_user_id: z.string(),
    role: userRoleEnum,
    organisation_id: z.uuid(),
    status: z.enum([
      COMMON_STATUS_NAMES.ACTIVE,
      COMMON_STATUS_NAMES.INACTIVE,
      COMMON_STATUS_NAMES.INVITED,
    ]),
    created_at: z.date().default(() => new Date()),
    updated_at: z.date().default(() => new Date()),
  })
  .openapi({
    example: {
      id: "123e4567-e89b-12d3-a456-426614174000",
      email: "user@example.com",
      name: "John Doe",
      supabase_user_id: "supabase_user_id_123",
      role: ROLES.ADMIN,
      organisation_id: "123e4567-e89b-12d3-a456-426614174000",
      status: COMMON_STATUS_NAMES.ACTIVE,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

export const createUserSchema = userSchema
  .pick({
    email: true,
    name: true,
    role: true,
    supabase_user_id: true,
    organisation_id: true,
    status: true,
  })
  .openapi({
    example: {
      email: "user@example.com",
      name: "John Doe",
      role: ROLES.ADMIN,
      supabase_user_id: "supabase_user_id_123",
      organisation_id: "123e4567-e89b-12d3-a456-426614174000",
      status: COMMON_STATUS_NAMES.ACTIVE,
    },
  });
