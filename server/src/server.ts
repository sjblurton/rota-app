import dotenv from "dotenv";

import app from "./app";
import { logger } from "./lib/logger";

dotenv.config({ path: ".env.local" });
dotenv.config();

const PORT = process.env["PORT"] || 3000;
const ENV = process.env["NODE_ENV"] || "development";

app.listen(PORT, () => {
  if (ENV === "development") {
    logger.info(`Server running on port http://localhost:${PORT}`);
    logger.info(
      `API documentation available at http://localhost:${PORT}/api/docs`,
    );
  }
});
