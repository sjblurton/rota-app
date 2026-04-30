import { AuthError } from '@supabase/supabase-js'
import type { Express, NextFunction, Request, Response } from 'express'

import { HttpErrorByCode } from '../utils/http/HttpErrorByCode'

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    code: 'not_found',
    message: 'Route not found',
    detail: `No route found for ${req.method} ${req.originalUrl}`,
  })
}

export const httpErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpErrorByCode) {
    res.status(err.status).json({
      code: err.code,
      message: err.message,
      detail: err.detail,
    })
    return
  }
  next(err)
}

export const supabaseAuthErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AuthError) {
    res.status(err.status ?? 500).json({
      code: err.code ?? 'supabase_auth_error',
      message: 'Superbase authentication error',
      detail: err.message,
    })
    return
  }
  next(err)
}

export const unknownErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(500).json({
    code: 'internal_server_error',
    message: err instanceof Error ? err.message : 'Internal Server Error',
  })
}

export const applyErrorHandlers = (app: Express) => [
  app.use(supabaseAuthErrorHandler),
  app.use(httpErrorHandler),
  app.use(unknownErrorHandler),
]
