import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PATHS } from '../../../constants/paths'
import { postStaffController } from '../controllers/post-staff.controller'
import { staffRouter } from './post-staff.router'

const dummyStaff = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone_number: '+447123456789',
  role: 'manager',
  status: 'active',
}

vi.mock('../controllers/post-staff.controller', () => ({
  postStaffController: vi.fn(),
}))

describe('staffRouter', () => {
  let app: express.Express

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use(staffRouter)
    ;(postStaffController as any).mockReset()
  })

  it('calls postStaffController on POST', async () => {
    ;(postStaffController as any).mockImplementation(({ request, response }: any) => {
      response.status(201).json({ ok: true, body: request.body })
    })
    const res = await request(app)
      .post(PATHS.organisation_id + PATHS.staff)
      .send(dummyStaff)
    expect(res.status).toBe(201)
    expect(res.body).toEqual({
      ok: true,
      body: dummyStaff,
    })
  })

  it('returns error if controller throws', async () => {
    ;(postStaffController as any).mockImplementation(async () => {
      throw new Error('fail')
    })
    const res = await request(app)
      .post(PATHS.organisation_id + PATHS.staff)
      .send({})
    expect(res.status).toBe(500)
  })
})
