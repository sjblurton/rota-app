import { logger } from "../../../../lib/logger";
import { type CreateManagerForOrganisationResult } from "../../services/types/superadmin-service-types";

export const handleManagerCreationResult = (result: CreateManagerForOrganisationResult) => {
  if ("manager" in result) {
    logger.info(`✅ Created manager: ${result.manager.name} (${result.manager.id})`);
    return;
  }

  if (result.kind === "manager_email_conflict") {
    logger.warn("Manager email already exists, skipping manager creation");
    return;
  }

  logger.warn(`Manager creation failed: ${result.kind}`);
};
