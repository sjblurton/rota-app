import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import z from 'zod'

extendZodWithOpenApi(z)

export const getOrganisationIdParamsSchema = z.object({
  organisation_id: z.uuid().describe('Organisation UUID').openapi({
    example: '00000000-0000-0000-0000-000000000000',
  }),
})
