import { AuthError } from '@supabase/supabase-js'
import { describe, expect, it, vi } from 'vitest'

import { HttpErrorByCode } from '../utils/http/HttpErrorByCode'
import * as handlers from './errorHandlers'

describe('errorHandlers', () => {
  describe('notFoundHandler', () => {
    it('returns 404 with correct body', () => {
      const req = { method: 'GET', originalUrl: '/foo' } as any
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any
      handlers.notFoundHandler(req, res)
      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        code: 'not_found',
        message: 'Route not found',
        detail: 'No route found for GET /foo',
      })
    })
  })

  describe('httpErrorHandler', () => {
    it('handles HttpErrorByCode', () => {
      const err = new HttpErrorByCode('bad_request', 'fail')
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any
      const next = vi.fn()
      handlers.httpErrorHandler(err, {} as any, res, next)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        code: 'bad_request',
        message: 'Bad Request',
        detail: 'fail',
      })
      expect(next).not.toHaveBeenCalled()
    })
    it('calls next for non-HttpErrorByCode', () => {
      const err = new Error('fail')
      const res = { status: vi.fn(), json: vi.fn() } as any
      const next = vi.fn()
      handlers.httpErrorHandler(err, {} as any, res, next)
      expect(next).toHaveBeenCalledWith(err)
    })
  })

  describe('supabaseAuthErrorHandler', () => {
    it('handles AuthError', () => {
      const err = new AuthError('fail', 401, 'auth_code')
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any
      const next = vi.fn()
      handlers.supabaseAuthErrorHandler(err, {} as any, res, next)
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({
        code: 'auth_code',
        message: 'Superbase authentication error',
        detail: 'fail',
      })
      expect(next).not.toHaveBeenCalled()
    })
    it('calls next for non-AuthError', () => {
      const err = new Error('fail')
      const res = { status: vi.fn(), json: vi.fn() } as any
      const next = vi.fn()
      handlers.supabaseAuthErrorHandler(err, {} as any, res, next)
      expect(next).toHaveBeenCalledWith(err)
    })
  })

  describe('unknownErrorHandler', () => {
    it('returns 500 with error message if Error', () => {
      const err = new Error('fail')
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any
      handlers.unknownErrorHandler(err, {} as any, res, {} as any)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        code: 'internal_server_error',
        message: 'fail',
      })
    })
    it('returns 500 with generic message otherwise', () => {
      const err = 'not an error'
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any
      handlers.unknownErrorHandler(err, {} as any, res, {} as any)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        code: 'internal_server_error',
        message: 'Internal Server Error',
      })
    })
  })
})
