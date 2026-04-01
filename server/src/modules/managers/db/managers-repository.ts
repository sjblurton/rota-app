import { createHash, randomUUID } from "node:crypto";

import type z from "zod";

import {
  createManagerBodySchema,
  managerSchema,
  publicManagerSchema,
  updateManagerSchema,
} from "../../../lib/schemas/entities/manager";

type DatabaseManager = z.infer<typeof managerSchema>;
type PublicManager = z.infer<typeof publicManagerSchema>;

type CreateManagerBody = z.infer<typeof createManagerBodySchema>;
type UpdateManager = z.infer<typeof updateManagerSchema>;

const managers: DatabaseManager[] = [];

const nowUtc = () => new Date().toISOString();

const hashPassword = (password: string) => createHash("sha256").update(password).digest("base64");

const normaliseEmail = (email: string) => email.trim().toLowerCase();

export const resetManagersStore = () => {
  managers.length = 0;
};

export const findManagerByNormalisedEmail = (email: string) =>
  managers.find((manager) => normaliseEmail(manager.email) === normaliseEmail(email));

export const findActiveManagerByNormalisedEmail = (email: string) =>
  managers.find(
    (manager) => manager.is_active && normaliseEmail(manager.email) === normaliseEmail(email),
  );

export const findManagerById = (managerId: string) =>
  managers.find((manager) => manager.id === managerId);

export const createManagerRecord = (
  organisationId: string,
  payload: CreateManagerBody,
): PublicManager => {
  const parsedPayload = createManagerBodySchema.parse(payload);

  const existingManagerWithEmail = findManagerByNormalisedEmail(parsedPayload.email);

  if (existingManagerWithEmail) {
    throw new Error("A manager with this email already exists");
  }

  const managerRecord = managerSchema.parse({
    id: randomUUID(),
    created_at: nowUtc(),
    name: parsedPayload.name,
    phone_number: parsedPayload.phone_number,
    email: normaliseEmail(parsedPayload.email),
    is_active: true,
    password_hash: hashPassword(parsedPayload.password),
    organisation_id: organisationId,
  });

  managers.push(managerRecord);

  return publicManagerSchema.parse({
    id: managerRecord.id,
    created_at: managerRecord.created_at,
    name: managerRecord.name,
    phone_number: managerRecord.phone_number,
    email: managerRecord.email,
    is_active: managerRecord.is_active,
    organisation_id: managerRecord.organisation_id,
  });
};

export const updateManagerRecord = (
  organisationId: string,
  managerId: string,
  payload: UpdateManager,
): PublicManager | null => {
  const parsedPayload = updateManagerSchema.parse(payload);
  const managerIndex = managers.findIndex(
    (manager) => manager.organisation_id === organisationId && manager.id === managerId,
  );

  if (managerIndex === -1) {
    throw new Error("Not found");
  }

  const existingManager = managers[managerIndex]!;

  const updatedManager = managerSchema.parse({
    id: existingManager.id,
    created_at: existingManager.created_at,
    organisation_id: existingManager.organisation_id,
    name: parsedPayload.name ?? existingManager.name,
    phone_number: parsedPayload.phone_number ?? existingManager.phone_number,
    email: parsedPayload.email ? normaliseEmail(parsedPayload.email) : existingManager.email,
    is_active: parsedPayload.is_active ?? existingManager.is_active,
    password_hash:
      parsedPayload.password !== undefined
        ? hashPassword(parsedPayload.password)
        : existingManager.password_hash,
  });

  managers[managerIndex] = updatedManager;

  return publicManagerSchema.parse({
    id: updatedManager.id,
    created_at: updatedManager.created_at,
    name: updatedManager.name,
    phone_number: updatedManager.phone_number,
    email: updatedManager.email,
    is_active: updatedManager.is_active,
    organisation_id: updatedManager.organisation_id,
  });
};
