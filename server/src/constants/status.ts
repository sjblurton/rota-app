export const COMMON_STATUS_NAMES = {
  /** Active status - the entity is currently active and operational */
  ACTIVE: "active",
  /** Inactive status - the entity is currently inactive and not operational */
  INACTIVE: "inactive",
  /** Invited status - the entity has been invited but has not yet accepted */
  INVITED: "invited",
  /** Accepted status - the entity has accepted the invitation and is now active */
  ACCEPTED: "accepted",
  /** Revoked status - the entity's access has been revoked and is no longer active */
  REVOKED: "revoked",
  /** Expired status - the entity's access has expired and is no longer active */
  EXPIRED: "expired",
} as const;
