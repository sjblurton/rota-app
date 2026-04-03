import "dotenv/config";

import { defineConfig } from "prisma/config";

import { requireEnv } from "./src/utils/env/requireEnv";
import dotenv from "dotenv";

dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: requireEnv("DATABASE_URL"),
  },
});
