import type { Request, Response } from 'express'
import { v4 as uudiV4 } from 'uuid'
import { describe, expect, it, vi } from 'vitest'

import { type Staff } from '../../../@types/staff'
import { getAllOrganisationStaffController } from './get-all-organisation-staff.controller'

const mockRequest = (params = {}, query = {}) =>
  ({
    params,
    query,
  }) as Request

const mockResponse = () => {
  const res = { json: vi.fn() }
  return res as unknown as Response
}

const orgId = uudiV4()
const staffId = uudiV4()

describe('getAllOrganisationStaffController', () => {
  it('calls getOrganisationStaff with correct arguments and returns staff', async () => {
    const staff = [
      {
        id: staffId,
        created_at: new Date(),
        name: 'John Doe',
        role: 'manager',
        status: 'active',
        organisation_id: orgId,
        email: 'john.doe@example.com',
        phone_number: '+447123456789',
        updated_at: new Date(),
      },
    ] satisfies Staff[]

    const getOrganisationStaff = vi.fn().mockResolvedValue(staff)
    const request = mockRequest({ organisation_id: orgId }, { limit: 5 })
    const response = mockResponse()

    await getAllOrganisationStaffController({
      request,
      response,
      getOrganisationStaff,
    })

    expect(getOrganisationStaff).toHaveBeenCalledWith({
      organisationId: orgId,
      paginationQuery: { limit: 5 },
    })
    expect(response.json).toHaveBeenCalledWith(staff)
  })

  it('throws if organisation_id is invalid', async () => {
    const getOrganisationStaff = vi.fn()
    const request = mockRequest({ organisation_id: 'not-a-uuid' }, {})
    const response = mockResponse()

    await expect(
      getAllOrganisationStaffController({ request, response, getOrganisationStaff }),
    ).rejects.toThrow()
  })
})
