import dotenv from 'dotenv'
import { requireEnv } from '../src/utils/env/requireEnv'
dotenv.config({ path: '.env.test', quiet: true })

if (requireEnv('VITEST_WORKER_ID') !== undefined) {
  const workerId = requireEnv('VITEST_WORKER_ID') || '0'
  const dbName = `rota_test_${workerId}`
  const baseUrl = 'postgresql://postgres:pass123@localhost:5432/'
  process.env['DATABASE_URL'] = `${baseUrl}${dbName}`
}
