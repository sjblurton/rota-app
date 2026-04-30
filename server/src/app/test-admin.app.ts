import express from "express";

import { type SupabaseUser } from "../@types/supabase_user";
import { logger } from "../libs/logger/logger";
import { applyErrorHandlers, notFoundHandler } from "../middleware/errorHandlers";
import { applyMiddlewares } from "../middleware/middleware";
import { ADMIN_BASE_PATH } from "../routers/admin/constants/admin.routes";
import { createTestAdminRouter } from "../routers/admin/test-admin.router";

export function createTestAdminApp(user: Partial<SupabaseUser>) {
  const testApp = express();

  applyMiddlewares(testApp, {
    logger,
    customProps: () => ({ testApp: true }),
  });

  testApp.use(ADMIN_BASE_PATH, createTestAdminRouter(user));

  testApp.use(notFoundHandler);

  applyErrorHandlers(testApp);

  return testApp;
}
