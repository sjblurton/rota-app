import express from 'express'

import { PATHS } from '../../../constants/paths'
import { getAllOrganisationStaffController } from '../controllers/get-all-organisation-staff.controller'
import { postStaffController } from '../controllers/post-staff.controller'

const organisationStaffRouter = express.Router()

organisationStaffRouter.post(PATHS.organisation_id + PATHS.staff, (req, res) =>
  postStaffController({ request: req, response: res }),
)

organisationStaffRouter.get(PATHS.organisation_id + PATHS.staff, (req, res) =>
  getAllOrganisationStaffController({ request: req, response: res }),
)

export { organisationStaffRouter }
