import { type Router } from 'express'

import { adminRouter } from '../../routers/admin/admin.router'
import { ADMIN_BASE_PATH } from '../../routers/admin/constants/admin.routes'
import { SUPERADMIN_BASE_ROUTE } from '../../routers/superadmin/constants/superadmin.routes'
import { superadminRouter } from '../../routers/superadmin/superadmin.router'

export const ROOT_ROUTES: { path: string; router: Router }[] = [
  {
    path: SUPERADMIN_BASE_ROUTE,
    router: superadminRouter,
  },
  {
    path: ADMIN_BASE_PATH,
    router: adminRouter,
  },
]
