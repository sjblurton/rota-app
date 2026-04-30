import type z from "zod";

import type { createOrganisationSchema } from "../libs/schemas/entities/organisation";
import { type organisationsPaginationQuerySchema } from "../libs/schemas/pagination/pagination-options-query";

export type OrganisationsPaginationQuery = z.infer<typeof organisationsPaginationQuerySchema>;

export type CreateOrganisationInput = z.infer<typeof createOrganisationSchema>;
