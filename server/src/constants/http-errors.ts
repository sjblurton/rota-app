export const HTTP_ERRORS = {
  badRequest: { status: 400, message: 'Bad Request', code: 'bad_request' },
  unauthorised: { status: 401, message: 'Unauthorised', code: 'unauthorised' },
  forbidden: { status: 403, message: 'Forbidden', code: 'forbidden' },
  notFound: { status: 404, message: 'Not Found', code: 'not_found' },
  conflict: { status: 409, message: 'Conflict', code: 'conflict' },
  internalServerError: {
    status: 500,
    message: 'Internal Server Error',
    code: 'internal_server_error',
  },
} as const

export type HttpErrorCodes = (typeof HTTP_ERRORS)[keyof typeof HTTP_ERRORS]['code']

export const getHttpErrorByCode = (code: HttpErrorCodes) => {
  return Object.values(HTTP_ERRORS).find((error) => error.code === code)
}
