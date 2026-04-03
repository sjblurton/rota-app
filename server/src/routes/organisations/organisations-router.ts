import express from "express";

import { organisationsController } from "../../modules/organisations/controller/organisations-controller";

const organisationsRouter = express.Router();

organisationsRouter.post("/", organisationsController.createOrganisation);

export { organisationsRouter };
