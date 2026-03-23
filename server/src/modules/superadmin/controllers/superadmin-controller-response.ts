import { Response } from "express";
import type {
  CreateManagerForOrganisationResult,
  CreateOrganisationResult,
  UpdateManagerForOrganisationResult,
  UpdateOrganisationResult,
} from "../services/types/superadmin-service-types";
import { SUPERADMIN_MESSAGES } from "../../../lib/constants/superadmin-messages";
import { SUPERADMIN_RESULT_KINDS } from "../services/constants/superadmin-result-kinds";

export const sendCreateOrganisationResponse = (
  response: Response,
  result: CreateOrganisationResult,
) => {
  if (!result) {
    response
      .status(409)
      .json({ message: SUPERADMIN_MESSAGES.organisationAlreadyExists });
    return;
  }

  response.status(201).json(result);
};

export const sendCreateManagerForOrganisationResponse = (
  response: Response,
  result: CreateManagerForOrganisationResult,
) => {
  if (result.kind === SUPERADMIN_RESULT_KINDS.organisationNotFound) {
    response
      .status(404)
      .json({ message: SUPERADMIN_MESSAGES.organisationNotFound });
    return;
  }

  if (result.kind === SUPERADMIN_RESULT_KINDS.organisationInactive) {
    response
      .status(409)
      .json({ message: SUPERADMIN_MESSAGES.organisationInactive });
    return;
  }

  if (result.kind === SUPERADMIN_RESULT_KINDS.managerEmailConflict) {
    response.status(409).json({
      message: SUPERADMIN_MESSAGES.managerEmailAlreadyExists,
    });
    return;
  }

  response.status(201).json(result.manager);
};

export const sendUpdateOrganisationResponse = (
  response: Response,
  result: UpdateOrganisationResult,
) => {
  if (result.kind === SUPERADMIN_RESULT_KINDS.organisationNotFound) {
    response
      .status(404)
      .json({ message: SUPERADMIN_MESSAGES.organisationNotFound });
    return;
  }

  if (result.kind === SUPERADMIN_RESULT_KINDS.organisationNameConflict) {
    response
      .status(409)
      .json({ message: SUPERADMIN_MESSAGES.organisationAlreadyExists });
    return;
  }

  response.status(200).json(result.organisation);
};

export const sendUpdateManagerForOrganisationResponse = (
  response: Response,
  result: UpdateManagerForOrganisationResult,
) => {
  if (result.kind === SUPERADMIN_RESULT_KINDS.organisationNotFound) {
    response
      .status(404)
      .json({ message: SUPERADMIN_MESSAGES.organisationNotFound });
    return;
  }

  if (result.kind === SUPERADMIN_RESULT_KINDS.organisationInactive) {
    response
      .status(409)
      .json({ message: SUPERADMIN_MESSAGES.organisationInactive });
    return;
  }

  if (result.kind === SUPERADMIN_RESULT_KINDS.managerNotFound) {
    response.status(404).json({ message: SUPERADMIN_MESSAGES.managerNotFound });
    return;
  }

  if (result.kind === SUPERADMIN_RESULT_KINDS.managerEmailConflict) {
    response.status(409).json({
      message: SUPERADMIN_MESSAGES.managerEmailAlreadyExists,
    });
    return;
  }

  response.status(200).json(result.manager);
};
