import express from 'express'

import { postInvitesRouter } from '../../api/invites/routers/invites.router'
import { organisationsRouter } from '../../api/organisations/routers/organisations.router'
import { PATHS } from '../../constants/paths'
import { requireSuperadminApiKey } from './middleware/require-superadmin-api-key'

const superadminRouter = express.Router()

superadminRouter.use(requireSuperadminApiKey)

superadminRouter.use(PATHS.organisations, organisationsRouter)

superadminRouter.use(PATHS.organisations, postInvitesRouter)

export { superadminRouter }
