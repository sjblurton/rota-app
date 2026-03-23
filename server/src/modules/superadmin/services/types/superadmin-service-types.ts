import z from "zod";
import {
  createOrganisationSchema,
  organisationSchema,
  updateOrganisationSchema,
} from "../../../../lib/schemas/entities/organisation";
import {
  createManagerSchema,
  managerWithOrganisationSchema,
  updateManagerSchema,
} from "../../../../lib/schemas/entities/staff";
import { SUPERADMIN_RESULT_KINDS } from "../constants/superadmin-result-kinds";

export type CreateOrganisation = z.infer<typeof createOrganisationSchema>;
export type Organisation = z.infer<typeof organisationSchema>;
export type CreateManager = z.infer<typeof createManagerSchema>;
export type UpdateOrganisation = z.infer<typeof updateOrganisationSchema>;
export type UpdateManager = z.infer<typeof updateManagerSchema>;
export type ManagerWithOrganisation = z.infer<
  typeof managerWithOrganisationSchema
>;

export type OrganisationUpdateRecordPayload = {
  name?: string;
  is_active?: boolean;
};

export type ManagerUpdateRecordPayload = {
  name?: string;
  phone_number?: string;
  email?: string;
  is_active?: boolean;
  password_hash?: string;
};

export type CreateOrganisationResult = Organisation | null;

export type CreateManagerForOrganisationResult =
  | { kind: typeof SUPERADMIN_RESULT_KINDS.organisationNotFound }
  | { kind: typeof SUPERADMIN_RESULT_KINDS.organisationInactive }
  | { kind: typeof SUPERADMIN_RESULT_KINDS.managerEmailConflict }
  | {
      kind: typeof SUPERADMIN_RESULT_KINDS.created;
      manager: ManagerWithOrganisation;
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
      manager: ManagerWithOrganisation;
    };
