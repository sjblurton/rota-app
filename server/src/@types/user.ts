import type z from 'zod'

import type { createUserSchema } from '../libs/schemas/entities/user'

export type CreateUserInput = z.infer<typeof createUserSchema>
