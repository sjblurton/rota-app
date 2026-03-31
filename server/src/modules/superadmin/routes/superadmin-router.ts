import express from "express";

import { requireSuperadminApiKey } from "../../../lib/auth/require-superadmin-api-key";
import { seedSuperadminStore } from "../bootstrap/seed-superadmin-store";

const superadminRouter = express.Router();

export const initialiseSuperadminModule = () => {
  seedSuperadminStore();
};

superadminRouter.use(requireSuperadminApiKey);

// Organisations and managers endpoints moved to new routers

export { superadminRouter };
