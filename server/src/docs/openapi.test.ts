import { describe, expect, it } from 'vitest'

import { OpenApiPaths } from './constants/docs.routes'
import { openApiDocument } from './openapi'

describe('Staff PATCH OpenAPI', () => {
  it(`documents PATCH ${OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ID} path`, () => {
    const patchStaff = openApiDocument['paths']?.[OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ID]
    expect(patchStaff).toBeDefined()
    expect(patchStaff).toHaveProperty('patch')
    expect(patchStaff?.patch?.summary).toMatch(/update staff member/i)
    expect(patchStaff?.patch?.security).toEqual([{ BearerAuth: [] }])
    expect(patchStaff?.patch?.parameters?.[0]).toMatchObject({
      name: 'staff_id',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    })
  })

  it(`documents correct request and response schemas for PATCH ${OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ID}`, () => {
    const patchStaff = openApiDocument?.['paths']?.[OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ID]?.patch
    expect(patchStaff).toBeDefined()
    const requestBody = patchStaff?.requestBody
    const hasContent = requestBody && 'content' in requestBody
    expect(hasContent && requestBody.content?.['application/json']?.schema).toBeDefined()
    expect(patchStaff?.responses?.['200']?.content?.['application/json']?.schema).toBeDefined()
  })

  it(`documents error responses for PATCH ${OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ID}`, () => {
    const patchStaff = openApiDocument?.['paths']?.[OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ID]?.patch
    expect(patchStaff?.responses?.['400']).toBeDefined()
    expect(patchStaff?.responses?.['401']).toBeDefined()
    expect(patchStaff?.responses?.['403']).toBeDefined()
    expect(patchStaff?.responses?.['404']).toBeDefined()
    expect(patchStaff?.responses?.['409']).toBeDefined()
  })
})

describe('Staff OpenAPI', () => {
  it(`documents POST ${OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ORGANISATION} path`, () => {
    const postStaff = openApiDocument['paths']?.[OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ORGANISATION]
    expect(postStaff).toBeDefined()
    expect(postStaff).toHaveProperty('post')
    expect(postStaff?.post?.summary).toMatch(/Create a staff member/i)
    expect(postStaff?.post?.security).toEqual([{ BearerAuth: [] }])
    expect(postStaff?.post?.parameters?.[0]).toMatchObject({
      name: 'organisation_id',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    })
  })

  it(`documents correct request and response schemas for POST ${OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ORGANISATION}`, () => {
    const postStaff =
      openApiDocument?.['paths']?.[OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ORGANISATION]?.post
    expect(postStaff).toBeDefined()
    const requestBody = postStaff?.requestBody
    const hasContent = requestBody && 'content' in requestBody
    expect(hasContent && requestBody.content?.['application/json']?.schema).toBeDefined()
    expect(postStaff?.responses?.['201']?.content?.['application/json']?.schema).toBeDefined()
  })
})

describe('Invites OpenAPI', () => {
  it(`documents PATCH ${OpenApiPaths.OPENAPI_PATHS.INVITE_BY_ID} path`, () => {
    const patchInvite = openApiDocument['paths'][OpenApiPaths.OPENAPI_PATHS.INVITE_BY_ID]
    expect(patchInvite).toBeDefined()
    expect(patchInvite).toHaveProperty('patch')
    expect(patchInvite?.patch?.summary).toMatch(/Accept an invite/i)
    expect(patchInvite?.patch?.security).toEqual([{ BearerAuth: [] }])
    expect(patchInvite?.patch?.parameters?.[0]).toMatchObject({
      name: 'invite_id',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    })
  })

  it(`documents correct request and response schemas for PATCH ${OpenApiPaths.OPENAPI_PATHS.INVITE_BY_ID}`, () => {
    const patchInvite = openApiDocument?.['paths']?.[OpenApiPaths.OPENAPI_PATHS.INVITE_BY_ID]?.patch
    expect(patchInvite).toBeDefined()
    const requestBody = patchInvite?.requestBody
    const hasContent = requestBody && 'content' in requestBody
    expect(hasContent && requestBody.content?.['application/json']?.schema).toBeDefined()
    expect(patchInvite?.responses?.['200']?.content?.['application/json']?.schema).toBeDefined()
  })

  it(`documents error responses for PATCH ${OpenApiPaths.OPENAPI_PATHS.INVITE_BY_ID}`, () => {
    const patchInvite = openApiDocument?.['paths']?.[OpenApiPaths.OPENAPI_PATHS.INVITE_BY_ID]?.patch
    expect(patchInvite?.responses?.['400']).toBeDefined()
    expect(patchInvite?.responses?.['401']).toBeDefined()
    expect(patchInvite?.responses?.['404']).toBeDefined()
  })

  it(`documents POST ${OpenApiPaths.OPENAPI_PATHS.ORGANISATION_INVITES} path`, () => {
    const postInvite = openApiDocument['paths']?.[OpenApiPaths.OPENAPI_PATHS.ORGANISATION_INVITES]
    expect(postInvite).toBeDefined()
    expect(postInvite).toHaveProperty('post')
    expect(postInvite?.post?.summary).toMatch(/Invite a user to an organisation/i)
    expect(postInvite?.post?.security).toEqual([{ SuperadminKey: [] }])
    expect(postInvite?.post?.parameters?.[0]).toMatchObject({
      name: 'organisation_id',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    })
  })
})

describe('Organisations OpenAPI', () => {
  it('includes expected top-level metadata and key paths', () => {
    expect(openApiDocument['openapi']).toBe('3.0.3')
    expect(openApiDocument['info'].title).toBe('Rota App API')
    expect(openApiDocument['paths']).toHaveProperty(OpenApiPaths.OPENAPI_PATHS.ORGANISATIONS)
  })

  it('documents superadmin organisation routes', () => {
    const organisationPathItem = openApiDocument['paths'][OpenApiPaths.OPENAPI_PATHS.ORGANISATIONS]

    expect(organisationPathItem).toBeDefined()
    expect(organisationPathItem).toHaveProperty('post')
    expect(organisationPathItem).toHaveProperty('get')
  })

  it('documents pagination query parameters for get organisations', () => {
    const organisationPathItem = openApiDocument['paths'][OpenApiPaths.OPENAPI_PATHS.ORGANISATIONS]
    const getOperation = organisationPathItem?.get

    expect(getOperation).toBeDefined()

    const parameterNames = (getOperation?.parameters ?? [])
      .map((parameter: any) => ('name' in parameter ? parameter.name : undefined))
      .filter(Boolean)

    expect(parameterNames).toEqual(
      expect.arrayContaining(['limit', 'offset', 'order_by_key', 'direction']),
    )
  })

  it('merges schema components and security schemes', () => {
    expect(openApiDocument['security']).toEqual(expect.arrayContaining([{ SuperadminKey: [] }]))
    expect(openApiDocument['security']).toEqual(expect.arrayContaining([{ BearerAuth: [] }]))
  })
})
