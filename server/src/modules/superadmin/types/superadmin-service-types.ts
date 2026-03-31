import type z from "zod";

import {
  type createManagerBodySchema,
  type createManagerSchema,
  type managerSchema,
  type publicManagerSchema,
  type updateManagerSchema,
} from "../../../lib/schemas/entities/manager";
import {
  type createOrganisationSchema,
  type organisationSchema,
  type updateOrganisationSchema,
} from "../../../lib/schemas/entities/organisation";
import { type SUPERADMIN_RESULT_KINDS } from "../services/constants/superadmin-result-kinds";

export type DatabaseManager = z.infer<typeof managerSchema>;
export type PublicManager = z.infer<typeof publicManagerSchema>;
export type CreateManager = z.infer<typeof createManagerSchema>;
export type CreateManagerBody = z.infer<typeof createManagerBodySchema>;
export type UpdateManager = z.infer<typeof updateManagerSchema>;

export type Organisation = z.infer<typeof organisationSchema>;
export type CreateOrganisation = z.infer<typeof createOrganisationSchema>;
export type UpdateOrganisation = z.infer<typeof updateOrganisationSchema>;

export type CreateOrganisationResult = Organisation | null;

export type CreateManagerForOrganisationResult =
  | { kind: typeof SUPERADMIN_RESULT_KINDS.organisationNotFound }
  | { kind: typeof SUPERADMIN_RESULT_KINDS.organisationInactive }
  | { kind: typeof SUPERADMIN_RESULT_KINDS.managerEmailConflict }
  | {
      kind: typeof SUPERADMIN_RESULT_KINDS.created;
      manager: PublicManager;
    };

export type UpdateOrganisationResult =
  | { kind: typeof SUPERADMIN_RESULT_KINDS.organisationNotFound }
  | { kind: typeof SUPERADMIN_RESULT_KINDS.organisationNameConflict }
  | {
      kind: typeof SUPERADMIN_RESULT_KINDS.updated;
      organisation: Organisation;
    };

export type UpdateManagerForOrganisationResult =
  | { kind: typeof SUPERADMIN_RESULT_KINDS.organisationNotFound }
  | { kind: typeof SUPERADMIN_RESULT_KINDS.organisationInactive }
  | { kind: typeof SUPERADMIN_RESULT_KINDS.managerNotFound }
  | { kind: typeof SUPERADMIN_RESULT_KINDS.managerEmailConflict }
  | {
      kind: typeof SUPERADMIN_RESULT_KINDS.updated;
      manager: PublicManager;
    };
