import express from "express";

import { requireSuperadminApiKey } from "../../lib/auth/require-superadmin-api-key";
import { managersRouter } from "../managers/managers-router";
import { organisationsRouter } from "../organisations/organisations-router";

const superadminRouter = express.Router();

superadminRouter.use(requireSuperadminApiKey);

superadminRouter.use("/organisations", organisationsRouter);
superadminRouter.use("/organisations/:organisation_id/managers", managersRouter);

export { superadminRouter };
