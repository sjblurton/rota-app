import { randomUUID } from "node:crypto";
import z from "zod";
import { organisationSchema } from "../../../lib/schemas/entities/organisation";

type Organisation = z.infer<typeof organisationSchema>;

type ManagerRecord = {
  id: string;
  created_at: string;
  name: string;
  phone_number: string;
  email: string;
  is_active: boolean;
  password_hash: string;
  organisation_id: string;
};

const organisations: Organisation[] = [];
const managers: ManagerRecord[] = [];

const nowUtc = () => new Date().toISOString();

export const resetSuperadminStore = () => {
  organisations.length = 0;
  managers.length = 0;
};

export const findOrganisationByNormalisedName = (name: string) =>
  organisations.find(
    (organisation) =>
      organisation.name.trim().toLowerCase() === name.trim().toLowerCase(),
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
  managers.find(
    (manager) =>
      manager.email.trim().toLowerCase() === email.trim().toLowerCase(),
  );

export const findActiveManagerByNormalisedEmail = (email: string) =>
  managers.find(
    (manager) =>
      manager.is_active &&
      manager.email.trim().toLowerCase() === email.trim().toLowerCase(),
  );

export const findManagerById = (managerId: string) =>
  managers.find((manager) => manager.id === managerId);

export const findManagerByIdForOrganisation = (
  organisationId: string,
  managerId: string,
) =>
  managers.find(
    (manager) =>
      manager.organisation_id === organisationId && manager.id === managerId,
  );

export const createManagerRecord = (payload: {
  name: string;
  phone_number: string;
  email: string;
  password_hash: string;
  organisation_id: string;
}): Omit<ManagerRecord, "password_hash"> => {
  const managerRecord: ManagerRecord = {
    id: randomUUID(),
    created_at: nowUtc(),
    name: payload.name,
    phone_number: payload.phone_number,
    email: payload.email,
    is_active: true,
    password_hash: payload.password_hash,
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
  payload: { name?: string; is_active?: boolean },
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
  payload: {
    name?: string;
    phone_number?: string;
    email?: string;
    is_active?: boolean;
    password_hash?: string;
  },
): Omit<ManagerRecord, "password_hash"> | null => {
  const managerIndex = managers.findIndex(
    (manager) =>
      manager.organisation_id === organisationId && manager.id === managerId,
  );

  if (managerIndex === -1) {
    return null;
  }

  const existingManager = managers[managerIndex];

  if (!existingManager) {
    return null;
  }

  const updatedManager: ManagerRecord = {
    id: existingManager.id,
    created_at: existingManager.created_at,
    organisation_id: existingManager.organisation_id,
    name: payload.name ?? existingManager.name,
    phone_number: payload.phone_number ?? existingManager.phone_number,
    email: payload.email ?? existingManager.email,
    is_active: payload.is_active ?? existingManager.is_active,
    password_hash: payload.password_hash ?? existingManager.password_hash,
  };

  managers[managerIndex] = updatedManager;

  const managerRecord = managers[managerIndex];

  if (!managerRecord) {
    return null;
  }

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

export const deactivateManagersForOrganisation = (organisationId: string) => {
  for (const manager of managers) {
    if (manager.organisation_id === organisationId) {
      manager.is_active = false;
    }
  }
};
