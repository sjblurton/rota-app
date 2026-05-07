import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PATHS } from '../../../constants/paths'
import { getStaffByIdController } from '../controllers/get-staff-by-id.controller'
import { patchStaffController } from '../controllers/patch-staff.controller'
import { staffRouter } from './staff.router'

vi.mock('../controllers/get-staff-by-id.controller', () => ({
  getStaffByIdController: vi.fn(),
}))

vi.mock('../controllers/patch-staff.controller', () => ({
  patchStaffController: vi.fn(),
}))

describe('staffRouter', () => {
  let app: express.Express

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use(staffRouter)
    ;(getStaffByIdController as any).mockReset()
    ;(patchStaffController as any).mockReset()
  })

  it('calls getStaffByIdController on GET', async () => {
    ;(getStaffByIdController as any).mockImplementation(({ request, response }: any) => {
      response.status(200).json({ ok: true, params: request.params })
    })
    const res = await request(app).get(PATHS.staff_id.replace(':staff_id', '123'))
    expect(getStaffByIdController).toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true, params: { staff_id: '123' } })
  })

  it('calls patchStaffController on PATCH', async () => {
    ;(patchStaffController as any).mockImplementation(({ request, response }: any) => {
      response.status(200).json({ ok: true, params: request.params, body: request.body })
    })
    const res = await request(app)
      .patch(PATHS.staff_id.replace(':staff_id', '123'))
      .send({ name: 'Updated Name' })
    expect(patchStaffController).toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      ok: true,
      params: { staff_id: '123' },
      body: { name: 'Updated Name' },
    })
  })
})
