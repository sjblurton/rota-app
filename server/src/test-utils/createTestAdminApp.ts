import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";

import { patchInvitesRouter } from "../api/invites/routes/invites-router";
import { PATHS } from "../constants/paths";
import { logger } from "../libs/logger/logger";
import { createRequireJwtAuth } from "../routes/admin/middleware/require-jwt-auth";
import { type SupabaseUser } from "../types/supabase_user";

/**
 * Creates an Express app with admin routes and a mock SupabaseUser for testing.
 * @param user Partial<SupabaseUser> to inject as the authenticated user
 */
export function createTestAdminApp(user: Partial<SupabaseUser>) {
  const testRouter = express.Router();
  testRouter.use(createRequireJwtAuth(user));
  testRouter.use(`${PATHS.apiBaseV1}${PATHS.admin}${PATHS.invites}`, patchInvitesRouter);

  const testApp = express();
  testApp.use(pinoHttp({ logger }));
  testApp.use(cors());
  testApp.use(express.json());
  testApp.use(testRouter);
  return testApp;
}
