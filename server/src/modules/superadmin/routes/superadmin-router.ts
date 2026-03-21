import express from "express";
import {
  createManagerForOrganisationController,
  createOrganisationController,
} from "../controllers/superadmin-controller";
import { requireSuperadminApiKey } from "./require-superadmin-api-key";

const superadminRouter = express.Router();

superadminRouter.use(requireSuperadminApiKey);

superadminRouter.post("/organisations", createOrganisationController);

superadminRouter.post(
  "/organisations/:organisation_id/managers",
  createManagerForOrganisationController,
);

export { superadminRouter };
