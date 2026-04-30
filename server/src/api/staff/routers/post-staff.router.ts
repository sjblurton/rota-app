import express from 'express'

import { PATHS } from '../../../constants/paths'
import { postStaffController } from '../controllers/post-staff.controller'

const staffRouter = express.Router()

staffRouter.post(PATHS.organisation_id + PATHS.staff, (req, res) =>
  postStaffController({ request: req, response: res }),
)

export { staffRouter }
