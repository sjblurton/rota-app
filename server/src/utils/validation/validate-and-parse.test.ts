import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import { validateAndParse } from './validate-and-parse'

describe('validateAndParse', () => {
  it('returns parsed data when validation succeeds', () => {
    const schema = z.object({
      name: z.string(),
    })

    const result = validateAndParse(schema, { name: 'Acme Hospital' })

    expect(result).toEqual({ name: 'Acme Hospital' })
  })

  it('throws an error when validation fails', () => {
    const schema = z.object({
      name: z.string(),
    })

    expect(() => validateAndParse(schema, {})).toThrow()
  })

  it('throws an error when a constrained string is empty', () => {
    const schema = z.object({
      name: z.string().min(1),
    })

    expect(() => validateAndParse(schema, { name: '' })).toThrow()
  })
})
