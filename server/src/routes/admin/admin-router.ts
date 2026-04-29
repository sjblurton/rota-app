import express from "express";

import { patchInvitesRouter } from "../../api/invites/routes/invites-router";
import { PATHS } from "../../constants/paths";
import { requireJwtAuth } from "./middleware/require-jwt-auth";

const adminRouter = express.Router();

adminRouter.use(requireJwtAuth);

adminRouter.use(PATHS.invites, patchInvitesRouter);

export { adminRouter };
