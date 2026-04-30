import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { PATHS } from '../constants/paths'
import app from './app'

const organisationsPath = `${PATHS.apiBaseV1}${PATHS.superadmin}${PATHS.organisations}`
const docsPath = `${PATHS.apiBaseV1}${PATHS.docs}`

describe('app routing', () => {
  it('enforces auth on the superadmin organisations route', async () => {
    const res = await request(app).post(organisationsPath).send()

    expect(res.status).toBe(401)
  })

  it('serves the OpenAPI docs', async () => {
    const res = await request(app).get(docsPath)

    expect(res.status).not.toBe(404)
  })

  it('returns 404 for an unknown route', async () => {
    const res = await request(app).get('/this-route-does-not-exist')

    expect(res.status).toBe(404)
  })
})
