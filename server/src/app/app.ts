import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { OpenApiPaths } from '../docs/constants/docs.routes'
import { openApiDocument } from '../docs/openapi'
import { applyErrorHandlers, notFoundHandler } from '../middleware/errorHandlers'
import { applyMiddlewares } from '../middleware/middleware'
import { ROOT_ROUTES } from './constants/routes'

const app = express()

applyMiddlewares(app)

app.use(OpenApiPaths.SWAGGER_DOCS_BASE_PATH, swaggerUi.serve, swaggerUi.setup(openApiDocument))

for (const { path, router } of ROOT_ROUTES) {
  app.use(path, router)
}

app.use(notFoundHandler)

applyErrorHandlers(app)

export default app
