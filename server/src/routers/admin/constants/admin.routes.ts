import { type Router } from 'express'

import { patchInvitesRouter } from '../../../api/invites/routers/invites.router'
import { staffRouter } from '../../../api/staff/routers/post-staff.router'
import { PATHS } from '../../../constants/paths'

export const ADMIN_PATHS: { path: string; router: Router }[] = [
  { path: PATHS.invites, router: patchInvitesRouter },
  { path: PATHS.organisations, router: staffRouter },
]

export const ADMIN_BASE_PATH = `${PATHS.apiBaseV1}${PATHS.admin}`
