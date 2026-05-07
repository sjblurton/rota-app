import { PATHS } from '../../constants/paths'

export class OpenApiPaths {
  static readonly SWAGGER_DOCS_BASE_PATH = `${PATHS.apiBaseV1}${PATHS.docs}`

  static readonly ORGANISATION_ID_PARAM = '/{organisation_id}'
  static readonly STAFF_ID_PARAM = '/{staff_id}'
  static readonly INVITE_ID_PARAM = '/{invite_id}'

  static readonly ADMIN_PATH = `${PATHS.apiBaseV1}${PATHS.admin}` as const
  static readonly SUPERADMIN_PATH = `${PATHS.apiBaseV1}${PATHS.superadmin}` as const

  static readonly ORGANISATION_STAFF_PATH =
    `${OpenApiPaths.ADMIN_PATH}${PATHS.organisations}${OpenApiPaths.ORGANISATION_ID_PARAM}${PATHS.staff}` as const

  static readonly STAFF_BY_ID_PATH =
    `${OpenApiPaths.ADMIN_PATH}${PATHS.staff}${OpenApiPaths.STAFF_ID_PARAM}` as const

  static readonly INVITE_BY_ID_PATH =
    `${OpenApiPaths.ADMIN_PATH}${PATHS.invites}${OpenApiPaths.INVITE_ID_PARAM}` as const

  static readonly ORGANISATIONS_PATH =
    `${OpenApiPaths.SUPERADMIN_PATH}${PATHS.organisations}` as const

  static readonly ORGANISATION_INVITES_PATH =
    `${OpenApiPaths.SUPERADMIN_PATH}${PATHS.organisations}${OpenApiPaths.ORGANISATION_ID_PARAM}${PATHS.invites}` as const

  static readonly OPENAPI_PATHS = {
    STAFF_BY_ORGANISATION: OpenApiPaths.ORGANISATION_STAFF_PATH,
    STAFF_BY_ID: OpenApiPaths.STAFF_BY_ID_PATH,
    INVITE_BY_ID: OpenApiPaths.INVITE_BY_ID_PATH,
    ORGANISATIONS: OpenApiPaths.ORGANISATIONS_PATH,
    ORGANISATION_INVITES: OpenApiPaths.ORGANISATION_INVITES_PATH,
  }
}
