import express from "express";

import { requireSuperadminApiKey } from "../../../lib/auth/require-superadmin-api-key";
import { seedSuperadminStore } from "../bootstrap/seed-superadmin-store";
import {
  createManagerForOrganisationController,
  createOrganisationController,
  updateManagerForOrganisationController,
  updateOrganisationController,
} from "../controllers/superadmin-controller";

const superadminRouter = express.Router();

export const initialiseSuperadminModule = () => {
  seedSuperadminStore();
};

superadminRouter.use(requireSuperadminApiKey);

superadminRouter.post("/organisations", createOrganisationController);

superadminRouter.patch("/organisations/:organisation_id", updateOrganisationController);

superadminRouter.post(
  "/organisations/:organisation_id/managers",
  createManagerForOrganisationController,
);

superadminRouter.patch(
  "/organisations/:organisation_id/managers/:manager_id",
  updateManagerForOrganisationController,
);

export { superadminRouter };
