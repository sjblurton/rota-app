import { faker } from '@faker-js/faker'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { describe, expect, it } from 'vitest'

import { type CreateStaffBody } from '../../@types/staff'
import { createTestAdminApp } from '../../app/test-admin.app'
import { mockUser } from '../__mocks__/supabaseUser'

const INVITE_ID = uuidv4()
const ORG_ID = '00000000-0000-0000-0000-000000000000'
const TEST_USER_EMAIL = faker.internet.email()

const testApp = createTestAdminApp(
  mockUser({
    email: TEST_USER_EMAIL,
    user_metadata: {
      invite_id: INVITE_ID,
      organisation_id: ORG_ID,
    },
  }),
)

describe('/organisations/:organisation_id/staff', () => {
  describe('POST /organisations/:organisation_id/staff', () => {
    it('creates a staff member for an organisation', async () => {
      const res = await request(testApp)
        .post(`/organisations/${ORG_ID}/staff`)
        .send({
          name: 'Jane Doe',
          email: TEST_USER_EMAIL,
          phone_number: '+447123456789',
          role: 'manager',
          status: 'active',
        } satisfies CreateStaffBody)
      expect(res.status).toBe(201)

      expect(res.body).toHaveProperty('id')
      expect(res.body.name).toBe('Jane Doe')
      expect(res.body.email).toBe(TEST_USER_EMAIL)
      expect(res.body.phone_number).toBe('+447123456789')
      expect(res.body.role).toBe('manager')
      expect(res.body.status).toBe('active')
    })
  })

  describe('GET /organisations/:organisation_id/staff', () => {
    it('returns a list of staff for the organisation', async () => {
      const res = await request(testApp).get(`/organisations/${ORG_ID}/staff`).expect(200)

      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBeGreaterThan(0)
      expect(res.body[0]).toHaveProperty('id')
      expect(res.body[0]).toHaveProperty('name')
      expect(res.body[0]).toHaveProperty('email')
      expect(res.body[0]).toHaveProperty('role')
      expect(res.body[0]).toHaveProperty('status')
      expect(res.body[0]).toHaveProperty('organisation_id', ORG_ID)
    })
  })
})
