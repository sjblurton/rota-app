import express from "express";

import { PATHS } from "../../../constants/paths";
import { patchInvitesController } from "../controllers/patch-invites-controller";
import { postInvitesController } from "../controllers/post-invites-controller";

const patchInvitesRouter = express.Router();

const postInvitesRouter = express.Router();

patchInvitesRouter.patch(PATHS.invites_id, (req, res) =>
  patchInvitesController({ request: req, response: res }),
);

postInvitesRouter.post(PATHS.organisation_id + PATHS.invites, (req, res) =>
  postInvitesController({ request: req, response: res }),
);

export { patchInvitesRouter, postInvitesRouter };
