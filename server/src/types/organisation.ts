import type z from "zod";

import type {
  createOrganisationSchema,
  organisationSchema,
  updateOrganisationSchema,
} from "../lib/schemas/entities/organisation";

export type Organisation = z.infer<typeof organisationSchema>;
export type CreateOrganisationBody = z.infer<typeof createOrganisationSchema>;
export type UpdateOrganisationBody = z.infer<typeof updateOrganisationSchema>;
