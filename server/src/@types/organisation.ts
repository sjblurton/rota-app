import type z from 'zod'

import type { createOrganisationSchema } from '../libs/schemas/entities/organisation'
import {
  type organisationsPaginationQuerySchema,
  type organisationStaffPaginationQuerySchema,
} from '../libs/schemas/pagination/pagination-options-query'

export type OrganisationsPaginationQuery = z.infer<typeof organisationsPaginationQuerySchema>
export type OrganisationStaffPaginationQuery = z.infer<
  typeof organisationStaffPaginationQuerySchema
>

export type CreateOrganisationInput = z.infer<typeof createOrganisationSchema>
