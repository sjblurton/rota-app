const BASE_V1_PATH = "/api/v1";

export const PATHS = {
  apiBaseV1: BASE_V1_PATH,
  superadmin: "/superadmin",
  organisations: "/organisations",
  organisation_id: "/:organisation_id",
  invites: "/invites",
  docs: "/docs",
  home: "/",
} as const;
