import type z from "zod";

import type {
  createManagerBodySchema,
  managerSchema,
  publicManagerSchema,
  updateManagerSchema,
} from "../lib/schemas/entities/manager";

export type DatabaseManager = z.infer<typeof managerSchema>;
export type PublicManager = z.infer<typeof publicManagerSchema>;

export type CreateManagerBody = z.infer<typeof createManagerBodySchema>;
export type UpdateManager = z.infer<typeof updateManagerSchema>;
