import express from "express";

import { type SupabaseUser } from "../../@types/supabase_user";
import { ADMIN_PATHS } from "./constants/admin.routes";
import { createRequireJwtAuth } from "./middleware/require-jwt-auth";

export const createTestAdminRouter = (user: Partial<SupabaseUser>) => {
  const testAdminRouter = express.Router();

  testAdminRouter.use(createRequireJwtAuth(user));

  for (const { path, router } of ADMIN_PATHS) {
    testAdminRouter.use(path, router);
  }

  return testAdminRouter;
};
