import express from "express";

import { PATHS } from "../../constants/paths";
import { requireSuperadminApiKey } from "../../libs/middleware/superadmin/require-superadmin-api-key";
import { organisationsRouter } from "../organisations/organisations-router";

const superadminRouter = express.Router();

superadminRouter.use(requireSuperadminApiKey);

superadminRouter.use(PATHS.organisations, organisationsRouter);

export { superadminRouter };
