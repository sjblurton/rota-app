import type z from "zod";

import type { organisationSchema } from "../libs/schemas/entities/organisation";

export type Organisation = z.infer<typeof organisationSchema>;
