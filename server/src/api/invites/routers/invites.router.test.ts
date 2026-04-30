import express from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { patchInvitesController } from '../controllers/patch-invites.controller'
import { postInvitesController } from '../controllers/post-invites.controller'
import { patchInvitesRouter, postInvitesRouter } from './invites.router'

vi.mock('../controllers/patch-invites.controller', () => ({
  patchInvitesController: vi.fn(),
}))

vi.mock('../controllers/post-invites.controller', () => ({
  postInvitesController: vi.fn(),
}))

const inviteId = 'dcf6d793-9fe8-4964-aff4-b27b209052e5'
const organisationId = '123e4567-e89b-12d3-a456-426614174000'

describe('patchInvitesRouter', () => {
  let app: express.Express
  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use(patchInvitesRouter)
    ;(patchInvitesController as any).mockReset()
  })

  it('routes PATCH /:invite_id to patchInvitesController', async () => {
    ;(patchInvitesController as any).mockImplementation(({ request, response }: any) => {
      response.status(200).json({ ok: true, invite_id: request.params.invite_id })
    })
    const res = await request(app).patch(`/${inviteId}`).send({ status: 'accepted' })
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true, invite_id: inviteId })
    expect(patchInvitesController).toHaveBeenCalled()
  })

  it('returns 500 if controller throws', async () => {
    ;(patchInvitesController as any).mockImplementation(() => {
      throw new Error('fail')
    })
    const res = await request(app).patch(`/${inviteId}`).send({ status: 'accepted' })
    expect(res.status).toBe(500)
  })
})

describe('postInvitesRouter', () => {
  let app: express.Express
  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use(postInvitesRouter)
    ;(postInvitesController as any).mockReset()
  })

  it('routes POST / to postInvitesController', async () => {
    ;(postInvitesController as any).mockImplementation(({ request, response }: any) => {
      response.status(201).json({ ok: true, email: request.body.email })
    })
    const res = await request(app)
      .post(`/${organisationId}/invites`)
      .send({ email: 'test@example.com', role: 'admin' })
    expect(res.status).toBe(201)
    expect(res.body).toEqual({ ok: true, email: 'test@example.com' })
    expect(postInvitesController).toHaveBeenCalled()
  })

  it('returns 500 if controller throws', async () => {
    ;(postInvitesController as any).mockImplementation(() => {
      throw new Error('fail')
    })
    const res = await request(app)
      .post(`/${organisationId}/invites`)
      .send({ email: 'test@example.com', role: 'admin' })
    expect(res.status).toBe(500)
  })
})
