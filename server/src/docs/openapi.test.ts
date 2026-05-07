import { describe, expect, it } from 'vitest'

import { OpenApiPaths } from './constants/docs.routes'
import { openApiDocument } from './openapi'

describe('OpenAPI routes exist', () => {
  const noneDocsRoutes = Object.values(OpenApiPaths.OPENAPI_PATHS).filter(
    (route) => route !== OpenApiPaths.OPENAPI_PATHS.SWAGGER_DOCS,
  )
  const routesToTest = noneDocsRoutes

  routesToTest.forEach((route) => {
    it(`should have a route for ${route}`, () => {
      const pathExists = Object.keys(openApiDocument.paths).includes(route)
      expect(pathExists).toBe(true)
    })
  })
})
