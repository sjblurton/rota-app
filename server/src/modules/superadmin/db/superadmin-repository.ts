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
  };

  organisations.push(organisation);
  return organisation;
};

export const doesOrganisationExist = (organisationId: string) =>
  organisations.some((organisation) => organisation.id === organisationId);

export const findManagerByNormalisedEmail = (email: string) =>
  managers.find(
    (manager) =>
      manager.email.trim().toLowerCase() === email.trim().toLowerCase(),
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
    organisation_id: managerRecord.organisation_id,
  };
};
