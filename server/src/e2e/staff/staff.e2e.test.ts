import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { describe, expect, it } from 'vitest'

import { type CreateStaffBody } from '../../@types/staff'
import { createTestAdminApp } from '../../app/test-admin.app'
import { PATHS } from '../../constants/paths'
import { mockUser } from '../__mocks__/supabaseUser'

const INVITE_ID = uuidv4()

const STAFF_ID = uuidv4()
const ORG_ID = '00000000-0000-0000-0000-000000000000'

const testApp = createTestAdminApp(
  mockUser({
    user_metadata: {
      invite_id: INVITE_ID,
      organisation_id: ORG_ID,
    },
  }),
)

const postOrganisationStaffPath = `${PATHS.apiBaseV1}${PATHS.admin}${PATHS.organisations}/${ORG_ID}${PATHS.staff}`

describe('/organisations/:organisation_id/staff', () => {
  describe('staff org router', () => {
    describe('POST /organisations/:organisation_id/staff', () => {
      it('creates a staff member for an organisation', async () => {
        const res = await request(testApp)
          .post(postOrganisationStaffPath)
          .send({
            id: STAFF_ID,
            name: 'Jane Doe',
            role: 'manager',
            status: 'active',
          } satisfies CreateStaffBody)

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body.name).toBe('Jane Doe')
        expect(res.body.role).toBe('manager')
        expect(res.body.status).toBe('active')
      })
    })

    describe('GET /organisations/:organisation_id/staff', () => {
      it('returns a list of staff for the organisation', async () => {
        const res = await request(testApp).get(postOrganisationStaffPath).expect(200)

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

  describe('staff router', () => {
    const staffByIdPath = `${PATHS.apiBaseV1}${PATHS.admin}${PATHS.staff}/${STAFF_ID}`
    describe("PATCH /staff/:staff_id - update staff member's status", () => {
      it('updates the staff member status', async () => {
        const patchRes = await request(testApp).patch(staffByIdPath).send({ status: 'inactive' })
        expect(patchRes.status).toBe(200)
        expect(patchRes.body).toHaveProperty('id', STAFF_ID)
        expect(patchRes.body).toHaveProperty('status', 'inactive')
      })
    })

    describe('GET /staff/:staff_id', () => {
      it('returns the staff member details', async () => {
        const res = await request(testApp).get(staffByIdPath).expect(200)

        expect(res.body).toHaveProperty('id', STAFF_ID)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('phone_number')
        expect(res.body).toHaveProperty('role')
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('organisation_id', ORG_ID)
      })
    })
  })
})
