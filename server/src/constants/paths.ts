const BASE_V1_PATH = '/api/v1'

export const PATHS = {
  apiBaseV1: BASE_V1_PATH,
  superadmin: '/superadmin',
  admin: '/admin',
  organisations: '/organisations',
  organisation_id: '/:organisation_id',
  invites: '/invites',
  invites_id: '/:invite_id',
  docs: '/docs',
  home: '/',
  staff: '/staff',
} as const
