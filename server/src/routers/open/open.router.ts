import express from 'express'

import { OPEN_PATHS } from './constants/open.routes'

const openRouter = express.Router()

for (const { path, router } of OPEN_PATHS) {
  openRouter.use(path, router)
}

export { openRouter }
