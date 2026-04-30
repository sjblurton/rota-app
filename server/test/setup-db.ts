import { beforeAll, afterAll } from 'vitest'
import { execa } from 'execa'
import { logger } from '../src/libs/logger/logger'
import { prisma } from '../src/libs/prisma/prisma'
import { requireEnv } from '../src/utils/env/requireEnv'

const workerId = requireEnv('VITEST_WORKER_ID') || '0'
const dbName = `rota_test_${workerId}`

beforeAll(async () => {
  logger.info(`[setup-db] Worker ${workerId}: Starting DB setup for ${dbName}`)
  try {
    logger.info(`[setup-db] Creating database ${dbName}...`)
    await execa('psql', ['-U', 'postgres', '-c', `CREATE DATABASE ${dbName};`]).catch(() => {})

    logger.info(`[setup-db] Set DATABASE_URL to ${process.env['DATABASE_URL']}`)
    logger.info(`[setup-db] Running prisma migrate deploy...`)
    await execa('prisma', ['migrate', 'deploy'])
    logger.info(`[setup-db] Running prisma db seed...`)
    await execa('prisma', ['db', 'seed'])
    logger.info(`[setup-db] DB setup complete for ${dbName}`)
  } catch (err) {
    logger.error({ err }, `[setup-db] Error during DB setup for ${dbName}`)
    throw err
  }
})

afterAll(async () => {
  logger.info(`[setup-db] Worker ${workerId}: Dropping database ${dbName}...`)
  try {
    await prisma.$disconnect()
    await execa('psql', ['-U', 'postgres', '-c', `DROP DATABASE IF EXISTS ${dbName};`])
    logger.info(`[setup-db] Dropped database ${dbName}`)
  } catch (err) {
    logger.error({ err }, `[setup-db] Error dropping database ${dbName}`)
  }
})
