import type z from "zod";

import type {
  createOrganisationSchema,
  organisationSchema,
  updateOrganisationStatusSchema,
} from "../libs/schemas/entities/organisation";
import { type organisationsPaginationQuerySchema } from "../libs/schemas/pagination/pagination-options-query";

export type OrganisationsPaginationQuery = z.infer<typeof organisationsPaginationQuerySchema>;

export type Organisation = z.infer<typeof organisationSchema>;

export type CreateOrganisationInput = z.infer<typeof createOrganisationSchema>;

export type UpdateOrganisationInput = z.infer<typeof updateOrganisationStatusSchema>;
