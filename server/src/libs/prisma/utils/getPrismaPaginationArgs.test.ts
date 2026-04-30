import { describe, expect, it } from 'vitest'

import { getPrismaPaginationArgs } from './getPrismaPaginationArgs'

describe('getPrismaPaginationArgs', () => {
  it('returns default pagination args when no input provided', () => {
    const result = getPrismaPaginationArgs({})
    expect(result).toEqual({
      skip: 0,
      take: 20,
      orderBy: { created_at: 'desc' },
    })
  })

  it('applies custom limit and offset', () => {
    const result = getPrismaPaginationArgs({ limit: 10, offset: 5 })
    expect(result).toEqual({
      skip: 5,
      take: 10,
      orderBy: { created_at: 'desc' },
    })
  })

  it('applies custom order_by_key and direction', () => {
    const result = getPrismaPaginationArgs({ order_by_key: 'name', direction: 'asc' })
    expect(result).toEqual({
      skip: 0,
      take: 20,
      orderBy: { name: 'asc' },
    })
  })

  it('handles all custom values together', () => {
    const result = getPrismaPaginationArgs({
      limit: 7,
      offset: 2,
      order_by_key: 'status',
      direction: 'asc',
    })
    expect(result).toEqual({
      skip: 2,
      take: 7,
      orderBy: { status: 'asc' },
    })
  })
})
