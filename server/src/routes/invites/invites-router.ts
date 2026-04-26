import express from "express";

import { PATHS } from "../../constants/paths";
import { patchInvitesController } from "../../controllers/invites/patch-invites-controller";

const invitesRouter = express.Router();

invitesRouter.patch(PATHS.home + PATHS.invites_id, (req, res) =>
  patchInvitesController({ request: req, response: res }),
);

export { invitesRouter };
