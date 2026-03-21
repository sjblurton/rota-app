import { timingSafeEqual } from "node:crypto";
import express from "express";
import {
  createManagerForOrganisationController,
  createOrganisationController,
} from "../controllers/superadmin-controller";

const superadminRouter = express.Router();

const isSuperadminKeyValid = (providedKey: string, expectedKey: string) => {
  const provided = Buffer.from(providedKey);
  const expected = Buffer.from(expectedKey);

  if (provided.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(provided, expected);
};

superadminRouter.use((request, response, next) => {
  const configuredKey = process.env["SUPERADMIN_API_KEY"];

  if (!configuredKey) {
    response
      .status(500)
      .json({ message: "Superadmin API key is not configured" });
    return;
  }

  const providedKey = request.header("X-Superadmin-Key");

  if (!providedKey || !isSuperadminKeyValid(providedKey, configuredKey)) {
    response.status(401).json({ message: "Invalid superadmin API key" });
    return;
  }

  next();
});

superadminRouter.post("/organisations", createOrganisationController);

superadminRouter.post(
  "/organisations/:organisation_id/managers",
  createManagerForOrganisationController,
);

export { superadminRouter };
