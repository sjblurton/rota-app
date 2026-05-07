import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getInviteByIdController } from '../controllers/get-invite-by-id.controller'
import { getInvitesRouter } from './open-invites.router'

vi.mock('../controllers/get-invite-by-id.controller', () => ({
  getInviteByIdController: vi.fn(),
}))

const inviteId = 'dcf6d793-9fe8-4964-aff4-b27b209052e5'

describe('getInvitesRouter', () => {
  let app: express.Express

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use(getInvitesRouter)
    ;(getInviteByIdController as any).mockReset()
  })

  it('routes GET /:invite_id to getInviteByIdController', async () => {
    ;(getInviteByIdController as any).mockImplementation(({ request, response }: any) => {
      response.status(200).json({ ok: true, invite_id: request.params.invite_id })
    })

    const res = await request(app).get(`/${inviteId}`).send()

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true, invite_id: inviteId })
    expect(getInviteByIdController).toHaveBeenCalled()
  })

  it('returns 500 if controller throws', async () => {
    ;(getInviteByIdController as any).mockImplementation(() => {
      throw new Error('fail')
    })

    const res = await request(app).get(`/${inviteId}`).send()

    expect(res.status).toBe(500)
  })
})
