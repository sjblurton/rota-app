import express from "express";

import { seedSuperadminStore } from "../bootstrap/seed-superadmin-store";
import {
  createManagerForOrganisationController,
  createOrganisationController,
  updateManagerForOrganisationController,
  updateOrganisationController,
} from "../controllers/superadmin-controller";
import { requireSuperadminApiKey } from "./utils/require-superadmin-api-key";

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
