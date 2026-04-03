import express from "express";

import { requireSuperadminApiKey } from "../../libs/auth/require-superadmin-api-key";
import { organisationsRouter } from "../organisations/organisations-router";

const superadminRouter = express.Router();

superadminRouter.use(requireSuperadminApiKey);

superadminRouter.use("/organisations", organisationsRouter);

export { superadminRouter };
