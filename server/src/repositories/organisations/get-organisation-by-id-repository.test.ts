import { describe, expect, it, vi } from 'vitest'

import { getOrganisationByIdRepository } from './get-organisation-by-id-repository'

describe('getOrganisationByIdRepository', () => {
  it('calls organisationRepo.findUnique with correct id', async () => {
    const organisationRepo = {
      findUnique: vi.fn().mockResolvedValue({ id: 'org-1', name: 'Test Org' }),
    } as any
    const result = await getOrganisationByIdRepository({ id: 'org-1', organisationRepo })
    expect(organisationRepo.findUnique).toHaveBeenCalledWith({ where: { id: 'org-1' } })
    expect(result).toEqual({ id: 'org-1', name: 'Test Org' })
  })

  it('returns null if organisation not found', async () => {
    const organisationRepo = {
      findUnique: vi.fn().mockResolvedValue(null),
    } as any
    const result = await getOrganisationByIdRepository({ id: 'missing', organisationRepo })
    expect(result).toBeNull()
  })
})
