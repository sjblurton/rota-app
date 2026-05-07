import { beforeEach, describe, expect, it, vi } from 'vitest'

import { postStaffController } from './post-staff.controller'

const validBody = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone_number: '+447123456789',
  role: 'manager',
  status: 'active',
}

const validParams = {
  organisation_id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
}

describe('postStaffController', () => {
  let request: any
  let response: any
  let createStaff: any
  let getOrganisationById: any

  beforeEach(() => {
    request = {
      params: { ...validParams },
      body: { ...validBody },
    }
    response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    }
    createStaff = vi.fn().mockResolvedValue({
      id: 'staff-id',
      ...validBody,
      organisation_id: validParams.organisation_id,
    })
    getOrganisationById = vi.fn().mockResolvedValue({ id: validParams.organisation_id })
  })

  it('creates staff and returns 201', async () => {
    await postStaffController({ request, response, createStaff, getOrganisationById })
    expect(getOrganisationById).toHaveBeenCalledWith({ id: validParams.organisation_id })
    expect(createStaff).toHaveBeenCalledWith({
      data: { ...validBody, organisation_id: validParams.organisation_id },
    })
    expect(response.status).toHaveBeenCalledWith(201)
    expect(response.json).toHaveBeenCalledWith({
      id: 'staff-id',
      ...validBody,
      organisation_id: validParams.organisation_id,
    })
  })

  it('returns validation error for invalid body', async () => {
    request.body = { ...validBody, name: '' }
    await expect(
      postStaffController({ request, response, createStaff, getOrganisationById }),
    ).rejects.toThrow()
  })

  it('returns validation error for invalid params', async () => {
    request.params = { organisation_id: 'not-a-uuid' }
    await expect(
      postStaffController({ request, response, createStaff, getOrganisationById }),
    ).rejects.toThrow()
  })

  it('returns error if organisation not found', async () => {
    getOrganisationById.mockRejectedValueOnce(new Error('Not found'))
    await expect(
      postStaffController({ request, response, createStaff, getOrganisationById }),
    ).rejects.toThrow('Not found')
  })

  it('returns error if createStaff fails', async () => {
    createStaff.mockRejectedValueOnce(new Error('Create failed'))
    await expect(
      postStaffController({ request, response, createStaff, getOrganisationById }),
    ).rejects.toThrow('Create failed')
  })
})
