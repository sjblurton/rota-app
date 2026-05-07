import express from 'express'

import { PATHS } from '../../../constants/paths'
import { getStaffByIdController } from '../controllers/get-staff-by-id.controller'
import { patchStaffController } from '../controllers/patch-staff.controller'

const staffRouter = express.Router()

staffRouter.get(PATHS.staff_id, (req, res) =>
  getStaffByIdController({ request: req, response: res }),
)

staffRouter.patch(PATHS.staff_id, (req, res) =>
  patchStaffController({ request: req, response: res }),
)

export { staffRouter }
