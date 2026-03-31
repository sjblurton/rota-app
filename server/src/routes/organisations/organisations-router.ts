import express from "express";

import { requireSuperadminApiKey } from "../../lib/auth/require-superadmin-api-key";
import {
  createOrganisationController,
  updateOrganisationController,
} from "../../modules/superadmin/controllers/superadmin-controller";

const organisationsRouter = express.Router();

organisationsRouter.use(requireSuperadminApiKey);

organisationsRouter.post("/", createOrganisationController);
organisationsRouter.patch("/:organisation_id", updateOrganisationController);

export { organisationsRouter };
