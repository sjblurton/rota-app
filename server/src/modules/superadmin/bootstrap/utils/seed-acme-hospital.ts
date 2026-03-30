import { logger } from "../../../../lib/logger";
import { findOrganisationByNormalisedName } from "../../db/superadmin-repository";
import {
  createManagerForOrganisation,
  createOrganisation,
} from "../../services/superadmin-service";
import { handleManagerCreationResult } from "./handle-manager-creation-result";

export const seedAcmeHospital = () => {
  const organisation = createOrganisation({
    name: "Acme Hospital",
  });

  if (!organisation) {
    logger.warn("Organisation 'Acme Hospital' already exists, skipping creation");
  } else {
    logger.info(`✅ Created organisation: ${organisation.name} (${organisation.id})`);
  }

  const existingOrganisation = findOrganisationByNormalisedName("Acme Hospital");

  if (!existingOrganisation) {
    logger.error("Failed to find organisation for manager creation");
    return;
  }

  const managerResult = createManagerForOrganisation(existingOrganisation.id, {
    name: "Sarah Manager",
    phone_number: "+447700900000",
    email: "sarah@acmehospital.example",
    password: "DevPassword123",
  });

  handleManagerCreationResult(managerResult);
};
