import type z from "zod";

import type {
  createOrganisationSchema,
  organisationSchema,
} from "../libs/schemas/entities/organisation";

export type Organisation = z.infer<typeof organisationSchema>;

export type CreateOrganisationInput = z.infer<typeof createOrganisationSchema>;
