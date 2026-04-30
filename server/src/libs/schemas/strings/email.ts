import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import z from 'zod'

extendZodWithOpenApi(z)

export const emailSchema = z
  .string()
  .transform((email) => email.trim().toLowerCase())
  .refine((email) => z.email().safeParse(email).success, {
    message: 'Invalid email',
  })
  .describe('A valid email address, which will be trimmed and converted to lowercase')
