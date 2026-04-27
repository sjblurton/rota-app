import express from "express";

import { PATHS } from "../../../constants/paths";
import { getOrganisations } from "../controllers/get-organisations-controller";
import { postOrganisationIdInvitesController } from "../controllers/post-organisation-id-invites-controller";
import { postOrganisations } from "../controllers/post-organisations-controller";

const organisationsRouter = express.Router();

organisationsRouter.post(PATHS.home, (req, res) =>
  postOrganisations({ request: req, response: res }),
);
organisationsRouter.get(PATHS.home, (req, res) =>
  getOrganisations({ request: req, response: res }),
);
organisationsRouter.use(PATHS.organisation_id + PATHS.invites, (req, res) =>
  postOrganisationIdInvitesController({ request: req, response: res }),
);

export { organisationsRouter };
