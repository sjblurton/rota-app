import { beforeEach, describe, expect, it, vi } from 'vitest'

import { organisationsPaginationQuerySchema } from '../../../libs/schemas/pagination/pagination-options-query'
import { getOrganisations } from './get-organisations.controller'

const mockRequest = (query = {}) => ({ query }) as any
const mockResponse = () => {
  const res: any = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('getOrganisations controller', () => {
  let request: any
  let response: any
  let getAllOrganisations: any

  beforeEach(() => {
    request = mockRequest({ page: 1, pageSize: 10 })
    response = mockResponse()
    getAllOrganisations = vi.fn().mockResolvedValue([{ id: 'org-1' }])
  })

  it('parses query and returns organisations', async () => {
    await getOrganisations({ request, response, getAllOrganisations })
    expect(getAllOrganisations).toHaveBeenCalledWith({
      paginationQuery: organisationsPaginationQuerySchema.parse(request.query),
    })
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledWith([{ id: 'org-1' }])
  })
})
