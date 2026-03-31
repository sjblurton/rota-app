import { randomUUID } from "node:crypto";

import { hashPassword } from "../services/utils/superadmin-service-utils";
import type {
  CreateManager,
  DatabaseManager,
  Organisation,
  PublicManager,
  UpdateManager,
  UpdateOrganisation,
} from "../types/superadmin-service-types";

const organisations: Organisation[] = [];
const managers: DatabaseManager[] = [];

const nowUtc = () => new Date().toISOString();

export const resetSuperadminStore = () => {
  organisations.length = 0;
  managers.length = 0;
};

export const findOrganisationByNormalisedName = (name: string) =>
  organisations.find(
    (organisation) => organisation.name.trim().toLowerCase() === name.trim().toLowerCase(),
  );

export const createOrganisationRecord = (name: string): Organisation => {
  const organisation: Organisation = {
    id: randomUUID(),
    name,
    created_at: nowUtc(),
    is_active: true,
  };

  organisations.push(organisation);
  return organisation;
};

export const doesOrganisationExist = (organisationId: string) =>
  organisations.some((organisation) => organisation.id === organisationId);

export const findOrganisationById = (organisationId: string) =>
  organisations.find((organisation) => organisation.id === organisationId);

export const findManagerByNormalisedEmail = (email: string) =>
  managers.find((manager) => manager.email.trim().toLowerCase() === email.trim().toLowerCase());

export const findActiveManagerByNormalisedEmail = (email: string) =>
  managers.find(
    (manager) =>
      manager.is_active && manager.email.trim().toLowerCase() === email.trim().toLowerCase(),
  );

export const findManagerById = (managerId: string) =>
  managers.find((manager) => manager.id === managerId);

export const findManagerByIdForOrganisation = (organisationId: string, managerId: string) =>
  managers.find(
    (manager) => manager.organisation_id === organisationId && manager.id === managerId,
  );

export const createManagerRecord = (payload: CreateManager): PublicManager => {
  const managerRecord: DatabaseManager = {
    id: randomUUID(),
    created_at: nowUtc(),
    name: payload.name,
    phone_number: payload.phone_number,
    email: payload.email,
    is_active: true,
    password_hash: hashPassword(payload.password),
    organisation_id: payload.organisation_id,
  };

  managers.push(managerRecord);

  return {
    id: managerRecord.id,
    created_at: managerRecord.created_at,
    name: managerRecord.name,
    phone_number: managerRecord.phone_number,
    email: managerRecord.email,
    is_active: managerRecord.is_active,
    organisation_id: managerRecord.organisation_id,
  };
};

export const updateOrganisationRecord = (
  organisationId: string,
  payload: UpdateOrganisation,
): Organisation | null => {
  const organisationIndex = organisations.findIndex(
    (organisation) => organisation.id === organisationId,
  );

  if (organisationIndex === -1) {
    return null;
  }

  const existingOrganisation = organisations[organisationIndex];

  if (!existingOrganisation) {
    return null;
  }

  const updatedOrganisation: Organisation = {
    id: existingOrganisation.id,
    created_at: existingOrganisation.created_at,
    name: payload.name ?? existingOrganisation.name,
    is_active: payload.is_active ?? existingOrganisation.is_active,
  };

  organisations[organisationIndex] = updatedOrganisation;

  return updatedOrganisation;
};

export const updateManagerRecord = (
  organisationId: string,
  managerId: string,
  payload: UpdateManager,
): PublicManager | null => {
  const managerIndex = managers.findIndex(
    (manager) => manager.organisation_id === organisationId && manager.id === managerId,
  );

  if (managerIndex === -1) {
    return null;
  }

  const existingManager = managers[managerIndex]!;

  const updatedManager: DatabaseManager = {
    id: existingManager.id,
    created_at: existingManager.created_at,
    organisation_id: existingManager.organisation_id,
    name: payload.name ?? existingManager.name,
    phone_number: payload.phone_number ?? existingManager.phone_number,
    email: payload.email ?? existingManager.email,
    is_active: payload.is_active ?? existingManager.is_active,
    password_hash:
      payload.password !== undefined
        ? hashPassword(payload.password)
        : existingManager.password_hash,
  };

  managers[managerIndex] = updatedManager;

  return {
    id: updatedManager.id,
    created_at: updatedManager.created_at,
    name: updatedManager.name,
    phone_number: updatedManager.phone_number,
    email: updatedManager.email,
    is_active: updatedManager.is_active,
    organisation_id: updatedManager.organisation_id,
  };
};

export const deactivateManagersForOrganisation = (organisationId: string) => {
  for (const manager of managers) {
    if (manager.organisation_id === organisationId) {
      manager.is_active = false;
    }
  }
};
