import express from 'express'

import { PATHS } from '../../../constants/paths'
import { getInviteByIdController } from '../controllers/get-invite-by-id.controller'

const getInvitesRouter = express.Router()

getInvitesRouter.get(PATHS.invites_id, (req, res) =>
  getInviteByIdController({ request: req, response: res }),
)

export { getInvitesRouter }
