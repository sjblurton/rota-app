import { PATHS } from '../../constants/paths'

export class OpenApiPaths {
  private static readonly apiBaseV1 = PATHS.apiBaseV1
  static readonly SWAGGER_DOCS = `${OpenApiPaths.apiBaseV1}${PATHS.docs}`

  private static readonly ORGANISATION_ID_PARAM = '/{organisation_id}'
  private static readonly STAFF_ID_PARAM = '/{staff_id}'
  private static readonly INVITE_ID_PARAM = '/{invite_id}'

  private static readonly ADMIN_PATH = PATHS.admin
  private static readonly SUPERADMIN_PATH = PATHS.superadmin

  private static readonly ORGANISATION_STAFF_PATH =
    `${PATHS.organisations}${OpenApiPaths.ORGANISATION_ID_PARAM}${PATHS.staff}` as const

  private static readonly STAFF_BY_ID_PATH = `${PATHS.staff}${OpenApiPaths.STAFF_ID_PARAM}` as const

  private static readonly INVITE_BY_ID_PATH =
    `${PATHS.invites}${OpenApiPaths.INVITE_ID_PARAM}` as const

  private static readonly ORGANISATIONS_PATH = PATHS.organisations

  private static readonly ORGANISATION_INVITES_PATH =
    `${PATHS.organisations}${OpenApiPaths.ORGANISATION_ID_PARAM}${PATHS.invites}` as const

  static readonly OPENAPI_PATHS = {
    ADMIN_STAFF_BY_ORGANISATION: `${OpenApiPaths.apiBaseV1}${OpenApiPaths.ADMIN_PATH}${OpenApiPaths.ORGANISATION_STAFF_PATH}`,
    ADMIN_STAFF_BY_ID: `${OpenApiPaths.apiBaseV1}${OpenApiPaths.ADMIN_PATH}${OpenApiPaths.STAFF_BY_ID_PATH}`,
    ADMIN_INVITE_BY_ID: `${OpenApiPaths.apiBaseV1}${OpenApiPaths.ADMIN_PATH}${OpenApiPaths.INVITE_BY_ID_PATH}`,
    SUPERADMIN_ORGANISATIONS: `${OpenApiPaths.apiBaseV1}${OpenApiPaths.SUPERADMIN_PATH}${OpenApiPaths.ORGANISATIONS_PATH}`,
    SUPERADMIN_ORGANISATION_INVITES: `${OpenApiPaths.apiBaseV1}${OpenApiPaths.SUPERADMIN_PATH}${OpenApiPaths.ORGANISATION_INVITES_PATH}`,
    INVITE_BY_ID: `${OpenApiPaths.apiBaseV1}${OpenApiPaths.INVITE_BY_ID_PATH}`,
  }
}
