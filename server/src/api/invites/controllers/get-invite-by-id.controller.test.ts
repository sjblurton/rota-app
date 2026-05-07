import { beforeEach, describe, expect, it, vi } from 'vitest'

import { HttpErrorByCode } from '../../../utils/http/HttpErrorByCode'
import { getInviteByIdController } from './get-invite-by-id.controller'

const validParams = { invite_id: 'dcf6d793-9fe8-4964-aff4-b27b209052e5' }

const mockRequest = (params = validParams) => ({ params })

const mockResponse = () => {
  const res: any = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('getInviteByIdController', () => {
  let request: any
  let response: any
  let getInviteById: any

  beforeEach(() => {
    request = mockRequest()
    response = mockResponse()
    getInviteById = vi.fn().mockResolvedValue({
      id: validParams.invite_id,
      email: 'test@example.com',
      role: 'admin',
      status: 'invited',
    })
  })

  it('calls getInviteById and responds with 200 on success', async () => {
    await getInviteByIdController({ request, response, getInviteById })

    expect(getInviteById).toHaveBeenCalledWith({ id: validParams.invite_id })
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: validParams.invite_id }),
    )
  })

  it('throws if invite_id is invalid', async () => {
    request = mockRequest({ invite_id: 'not-a-uuid' })

    await expect(getInviteByIdController({ request, response, getInviteById })).rejects.toThrow(
      HttpErrorByCode,
    )
  })
})
