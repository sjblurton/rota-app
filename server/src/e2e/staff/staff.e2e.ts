import { faker } from '@faker-js/faker'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { describe, expect, it } from 'vitest'

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
      const res = await request(testApp).post(`/organisations/${ORG_ID}/staff`).send({
        name: 'Jane Doe',
        email: TEST_USER_EMAIL,
        phone_number: '+447123456789',
        role: 'manager',
        status: 'active',
      })
      expect(res.status).toBe(201)

      expect(res.body).toHaveProperty('id')
      expect(res.body.name).toBe('Jane Doe')
      expect(res.body.email).toBe(TEST_USER_EMAIL)
      expect(res.body.phone_number).toBe('+447123456789')
      expect(res.body.role).toBe('manager')
      expect(res.body.status).toBe('active')
    })
  })
})
