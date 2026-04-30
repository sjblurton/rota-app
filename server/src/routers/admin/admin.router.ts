import express from "express";

import { ADMIN_PATHS } from "./constants/admin.routes";
import { requireJwtAuth } from "./middleware/require-jwt-auth";

const adminRouter = express.Router();

adminRouter.use(requireJwtAuth);

for (const { path, router } of ADMIN_PATHS) {
  adminRouter.use(path, router);
}

export { adminRouter };
