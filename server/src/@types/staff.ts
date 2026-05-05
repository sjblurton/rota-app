import type z from 'zod'

import type {
  createStaffBodySchema,
  createStaffSchema,
  staffSchema,
} from '../libs/schemas/entities/staff'

export type CreateStaffInput = z.infer<typeof createStaffSchema>
export type CreateStaffBody = z.infer<typeof createStaffBodySchema>

export type Staff = z.infer<typeof staffSchema>
