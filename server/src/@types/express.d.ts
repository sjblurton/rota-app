import type { SupabaseUser } from "./supabase_user";

declare module "express-serve-static-core" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Request {
    superbaseUser?: SupabaseUser;
  }
}
