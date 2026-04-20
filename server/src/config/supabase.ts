import { createClient } from "@supabase/supabase-js";

import { requireEnv } from "../utils/env/requireEnv";

export const supabase = createClient(
  requireEnv("SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
);
