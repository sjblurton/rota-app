import { v4 as uuidV4 } from 'uuid'
import { describe, expect, it, vi } from 'vitest'

import { getOrganisationStaffService } from './get-organisation-staff.service'

const organisationId = uuidV4()
const paginationQuery = { limit: 10, offset: 0 }

describe('getOrganisationStaffService', () => {
  it('calls repository with correct arguments and returns result', async () => {
    const mockResult = [{ id: 'staff-1' }, { id: 'staff-2' }]
    const getOrganisationStaff = vi.fn().mockResolvedValue(mockResult)

    const result = await getOrganisationStaffService({
      organisationId,
      paginationQuery,
      getOrganisationStaff,
    })

    expect(getOrganisationStaff).toHaveBeenCalledWith({ organisationId, paginationQuery })
    expect(result).toBe(mockResult)
  })

  it('uses empty paginationQuery if not provided', async () => {
    const getOrganisationStaff = vi.fn().mockResolvedValue([])
    await getOrganisationStaffService({ organisationId, getOrganisationStaff })
    expect(getOrganisationStaff).toHaveBeenCalledWith({ organisationId, paginationQuery: {} })
  })
})
