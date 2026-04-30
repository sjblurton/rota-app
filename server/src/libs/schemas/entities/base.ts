import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROLES } from '../../../constants/roles'

extendZodWithOpenApi(z)

const baseSchema = z.object({
  id: z.uuid(),
})

export const baseWithTimestampsSchema = baseSchema.extend({
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
})

export const userRoleEnum = z.enum([ROLES.ADMIN])
