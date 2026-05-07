import { type Router } from 'express'

import { getInvitesRouter } from '../../../api/invites/routers/open-invites.router'
import { PATHS } from '../../../constants/paths'

export const OPEN_PATHS: { path: string; router: Router }[] = [
  {
    path: PATHS.invites,
    router: getInvitesRouter,
  },
]

export const OPEN_BASE_PATH = `${PATHS.apiBaseV1}`
