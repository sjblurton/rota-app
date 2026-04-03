import dotenv from "dotenv";

import app from "./app";
import { logger } from "./libs/logger/logger";

const ENV = process.env["NODE_ENV"] ?? "development";
const PORT = process.env["PORT"] ?? 3000;

dotenv.config({ path: ENV === "test" ? ".env.test" : ".env.local", quiet: true });

app.listen(PORT, () => {
  if (ENV === "development") {
    logger.info(`Server running on port http://localhost:${PORT}`);
    logger.info(`API documentation available at http://localhost:${PORT}/api/docs`);
  }
});
