import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { type Organisation, type Staff } from '../../../generated/prisma/client'

extendZodWithOpenApi(z)

function createPaginationOptionsQuerySchema<
  const TOrderByKeys extends readonly (keyof Organisation)[] | readonly (keyof Staff)[],
>(orderByKeys: TOrderByKeys) {
  return z.object({
    limit: z.coerce.number().int().positive().max(100).optional(),
    offset: z.coerce.number().int().nonnegative().optional(),
    order_by_key: z.enum(orderByKeys).optional(),
    direction: z.enum(['asc', 'desc']).optional(),
  })
}

const baseKeys = ['created_at', 'updated_at'] as const

const organisationOrderByKeys = [
  ...baseKeys,
  'name',
  'status',
  'plan',
] satisfies readonly (keyof Organisation)[]

const staffOrderByKeys = [...baseKeys, 'name', 'status', 'email'] satisfies readonly (keyof Staff)[]

export const organisationsPaginationQuerySchema =
  createPaginationOptionsQuerySchema(organisationOrderByKeys)

export const organisationStaffPaginationQuerySchema =
  createPaginationOptionsQuerySchema(staffOrderByKeys)
