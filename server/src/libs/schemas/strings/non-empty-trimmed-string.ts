import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import z from 'zod'

extendZodWithOpenApi(z)

export const nonEmptyTrimmedStringSchema = z
  .string()
  .trim()
  .nonempty()
  .describe('A non-empty string that will be trimmed of whitespace')
