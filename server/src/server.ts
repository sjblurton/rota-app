import dotenv from 'dotenv'

import app from './app/app'
import { PATHS } from './constants/paths'
import { logger } from './libs/logger/logger'
import { prisma } from './libs/prisma/prisma'

const ENV = process.env['NODE_ENV'] ?? 'development'
const PORT = process.env['PORT'] ?? 3000

dotenv.config({ path: ENV === 'test' ? '.env.test' : '.env.local', quiet: true })

async function verifyDatabaseConnection() {
  await prisma.$queryRaw`SELECT 1`
}

async function startServer() {
  await verifyDatabaseConnection()

  app.listen(PORT, () => {
    if (ENV === 'development') {
      logger.info(`Server running on port http://localhost:${PORT}`)
      logger.info(
        `API documentation available at http://localhost:${PORT}${PATHS.apiBaseV1}${PATHS.docs}`,
      )
    }
  })
}

void startServer().catch((error: unknown) => {
  logger.error(
    { err: error },
    'Database health check failed during startup. Ensure migrations are applied.',
  )
  process.exit(1)
})
