import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import z from 'zod'

extendZodWithOpenApi(z)

export const getInviteIdParamsSchema = z.object({
  invite_id: z.uuid().describe('Invite UUID').openapi({
    example: '00000000-0000-0000-0000-000000000000',
  }),
})
