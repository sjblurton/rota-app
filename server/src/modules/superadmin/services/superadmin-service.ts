import { createHash } from "node:crypto";
import z from "zod";
import { createOrganisationSchema } from "../../../lib/schemas/entities/organisation";
import {
  createManagerSchema,
  managerWithOrganisationSchema,
} from "../../../lib/schemas/entities/staff";
import {
  createManagerRecord,
  createOrganisationRecord,
  doesOrganisationExist,
  findManagerByNormalisedEmail,
  findOrganisationByNormalisedName,
} from "../db/superadmin-repository";

type CreateOrganisation = z.infer<typeof createOrganisationSchema>;
type CreateManager = z.infer<typeof createManagerSchema>;
type ManagerWithOrganisation = z.infer<typeof managerWithOrganisationSchema>;

const hashPassword = (password: string) =>
  createHash("sha256").update(password).digest("hex");

export const createOrganisation = (payload: CreateOrganisation) => {
  const duplicateOrganisation = findOrganisationByNormalisedName(payload.name);

  if (duplicateOrganisation) {
    return null;
  }

  return createOrganisationRecord(payload.name);
};

export const createManagerForOrganisation = (
  organisationId: string,
  payload: CreateManager,
):
  | { kind: "organisation_not_found" }
  | { kind: "manager_email_conflict" }
  | { kind: "created"; manager: ManagerWithOrganisation } => {
  if (!doesOrganisationExist(organisationId)) {
    return { kind: "organisation_not_found" };
  }

  const duplicateManager = findManagerByNormalisedEmail(payload.email);

  if (duplicateManager) {
    return { kind: "manager_email_conflict" };
  }

  const manager = createManagerRecord({
    name: payload.name,
    phone_number: payload.phone_number,
    email: payload.email,
    password_hash: hashPassword(payload.password),
    organisation_id: organisationId,
  });

  return {
    kind: "created",
    manager,
  };
};
