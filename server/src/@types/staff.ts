import type z from 'zod'

import type {
  createStaffBodySchema,
  createStaffSchema,
  staffSchema,
  updateStaffBodySchema,
  updateStaffSchema,
} from '../libs/schemas/entities/staff'

export type CreateStaffInput = z.infer<typeof createStaffSchema>
export type CreateStaffBody = z.infer<typeof createStaffBodySchema>
export type UpdateStaffInput = z.infer<typeof updateStaffSchema>
export type UpdateStaffBody = z.infer<typeof updateStaffBodySchema>

export type Staff = z.infer<typeof staffSchema>
