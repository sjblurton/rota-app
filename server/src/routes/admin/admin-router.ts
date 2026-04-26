import express from "express";

import { PATHS } from "../../constants/paths";
import { requireJwtAuth } from "../../libs/middleware/jwt/require-jwt-auth";
import { invitesRouter } from "../invites/invites-router";

const adminRouter = express.Router();

adminRouter.use(requireJwtAuth);

adminRouter.use(PATHS.invites, invitesRouter);

export { adminRouter };
