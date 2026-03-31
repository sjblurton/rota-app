import { createHash } from "node:crypto";

import type { UpdateManager, UpdateOrganisation } from "../../types/superadmin-service-types";

export const hashPassword = (password: string) =>
  createHash("sha256").update(password).digest("base64");

export const shouldCheckManagerEmailConflict = (payload: UpdateManager, managerIsActive: boolean) =>
  payload.email !== undefined || (payload.is_active === true && managerIsActive === false);

export const buildOrganisationUpdatePayload = (payload: UpdateOrganisation) => ({
  ...(payload.name !== undefined ? { name: payload.name } : {}),
  ...(payload.is_active !== undefined ? { is_active: payload.is_active } : {}),
});

export const buildManagerUpdatePayload = (payload: UpdateManager): UpdateManager => ({
  ...(payload.name !== undefined ? { name: payload.name } : {}),
  ...(payload.phone_number !== undefined ? { phone_number: payload.phone_number } : {}),
  ...(payload.email !== undefined ? { email: payload.email } : {}),
  ...(payload.is_active !== undefined ? { is_active: payload.is_active } : {}),
  ...(payload.password !== undefined ? { password_hash: hashPassword(payload.password) } : {}),
});
