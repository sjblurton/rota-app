import express from "express";

import { PATHS } from "../../constants/paths";
import { organisationsController } from "../../modules/organisations/controller/organisations-controller";

const organisationsRouter = express.Router();

organisationsRouter.post(PATHS.home, organisationsController.createOrganisation);
organisationsRouter.get(PATHS.home, organisationsController.getOrganisations);

export { organisationsRouter };
