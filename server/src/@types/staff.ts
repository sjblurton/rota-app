import type z from 'zod'

import type { createStaffSchema } from '../libs/schemas/entities/staff'

export type CreateStaffInput = z.infer<typeof createStaffSchema>
