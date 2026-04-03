import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

import { PrismaClient } from "../../generated/prisma/client";
import { requireEnv } from "../../utils/env/requireEnv";

dotenv.config({
  path: process.env["NODE_ENV"] === "test" ? ".env.test" : ".env.local",
  quiet: true,
});

const connectionString = requireEnv("DATABASE_URL");
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
