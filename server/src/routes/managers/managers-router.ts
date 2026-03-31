import express from "express";

import { requireSuperadminApiKey } from "../../lib/auth/require-superadmin-api-key";
import {
  createManagerForOrganisationController,
  updateManagerForOrganisationController,
} from "../../modules/superadmin/controllers/superadmin-controller";

const managersRouter = express.Router();

managersRouter.use(requireSuperadminApiKey);

managersRouter.post("/", createManagerForOrganisationController);
managersRouter.patch("/:manager_id", updateManagerForOrganisationController);

export { managersRouter };
