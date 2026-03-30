import { logger } from "../../../lib/logger";
import { seedAcmeHospital } from "./utils/seed-acme-hospital";

/**
 * Development-only seed that populates the superadmin store with sample data.
 * Data is not persisted in development mode and resets on restart.
 *
 * Only runs when NODE_ENV=development AND ENABLE_DEV_SEED=true.
 */

export const seedSuperadminStore = () => {
  const isDevMode = process.env["NODE_ENV"] === "development";
  const enableSeed = process.env["ENABLE_DEV_SEED"] === "true";

  if (!isDevMode || !enableSeed) {
    return;
  }

  try {
    logger.info("🌱 Seeding superadmin store with development data...");

    seedAcmeHospital();

    logger.info("✅ Superadmin store seed complete");
  } catch (error) {
    logger.error({ error }, "❌ Error seeding superadmin store");
  }
};
