import {
  createManagerRecord,
  createOrganisationRecord,
  deactivateManagersForOrganisation,
  findActiveManagerByNormalisedEmail,
  findManagerByIdForOrganisation,
  findOrganisationById,
  findOrganisationByNormalisedName,
  updateManagerRecord,
  updateOrganisationRecord,
} from "../db/superadmin-repository";
import { SUPERADMIN_RESULT_KINDS } from "./constants/superadmin-result-kinds";
import type {
  CreateManager,
  CreateManagerForOrganisationResult,
  CreateOrganisation,
  CreateOrganisationResult,
  OrganisationUpdateRecordPayload,
  UpdateManager,
  UpdateManagerForOrganisationResult,
  UpdateOrganisation,
  UpdateOrganisationResult,
} from "./types/superadmin-service-types";
import {
  buildManagerUpdatePayload,
  buildOrganisationUpdatePayload,
  hashPassword,
  shouldCheckManagerEmailConflict,
} from "./utils/superadmin-service-utils";

export const createOrganisation = (
  payload: CreateOrganisation,
): CreateOrganisationResult => {
  const duplicateOrganisation = findOrganisationByNormalisedName(payload.name);

  if (duplicateOrganisation) {
    return null;
  }

  return createOrganisationRecord(payload.name);
};

export const createManagerForOrganisation = (
  organisationId: string,
  payload: CreateManager,
): CreateManagerForOrganisationResult => {
  const organisation = findOrganisationById(organisationId);

  if (!organisation) {
    return { kind: SUPERADMIN_RESULT_KINDS.organisationNotFound };
  }

  if (!organisation.is_active) {
    return { kind: SUPERADMIN_RESULT_KINDS.organisationInactive };
  }

  const duplicateManager = findActiveManagerByNormalisedEmail(payload.email);

  if (duplicateManager) {
    return { kind: SUPERADMIN_RESULT_KINDS.managerEmailConflict };
  }

  const manager = createManagerRecord({
    name: payload.name,
    phone_number: payload.phone_number,
    email: payload.email,
    password_hash: hashPassword(payload.password),
    organisation_id: organisationId,
  });

  return {
    kind: SUPERADMIN_RESULT_KINDS.created,
    manager,
  };
};

export const updateOrganisation = (
  organisationId: string,
  payload: UpdateOrganisation,
): UpdateOrganisationResult => {
  const organisation = findOrganisationById(organisationId);

  if (!organisation) {
    return { kind: SUPERADMIN_RESULT_KINDS.organisationNotFound };
  }

  if (payload.name) {
    const duplicateOrganisation = findOrganisationByNormalisedName(
      payload.name,
    );

    if (duplicateOrganisation && duplicateOrganisation.id !== organisationId) {
      return { kind: SUPERADMIN_RESULT_KINDS.organisationNameConflict };
    }
  }

  const organisationUpdatePayload: OrganisationUpdateRecordPayload =
    buildOrganisationUpdatePayload(payload);

  const updatedOrganisation = updateOrganisationRecord(
    organisationId,
    organisationUpdatePayload,
  );

  if (!updatedOrganisation) {
    return { kind: SUPERADMIN_RESULT_KINDS.organisationNotFound };
  }

  if (updatedOrganisation.is_active === false && payload.is_active === false) {
    deactivateManagersForOrganisation(organisationId);
  }

  return {
    kind: SUPERADMIN_RESULT_KINDS.updated,
    organisation: updatedOrganisation,
  };
};

export const updateManagerForOrganisation = (
  organisationId: string,
  managerId: string,
  payload: UpdateManager,
): UpdateManagerForOrganisationResult => {
  const organisation = findOrganisationById(organisationId);

  if (!organisation) {
    return { kind: SUPERADMIN_RESULT_KINDS.organisationNotFound };
  }

  if (!organisation.is_active) {
    return { kind: SUPERADMIN_RESULT_KINDS.organisationInactive };
  }

  const manager = findManagerByIdForOrganisation(organisationId, managerId);

  if (!manager) {
    return { kind: SUPERADMIN_RESULT_KINDS.managerNotFound };
  }

  const shouldCheckEmailConflict = shouldCheckManagerEmailConflict(
    payload,
    manager.is_active,
  );

  if (shouldCheckEmailConflict) {
    const emailToCheck = payload.email ?? manager.email;
    const duplicateManager = findActiveManagerByNormalisedEmail(emailToCheck);

    if (duplicateManager && duplicateManager.id !== managerId) {
      return { kind: SUPERADMIN_RESULT_KINDS.managerEmailConflict };
    }
  }

  const managerUpdatePayload = buildManagerUpdatePayload(payload);

  const updatedManager = updateManagerRecord(
    organisationId,
    managerId,
    managerUpdatePayload,
  );

  if (!updatedManager) {
    return { kind: SUPERADMIN_RESULT_KINDS.managerNotFound };
  }

  return {
    kind: SUPERADMIN_RESULT_KINDS.updated,
    manager: updatedManager,
  };
};
