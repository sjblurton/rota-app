import { beforeAll, afterAll } from "vitest";
import { execa } from "execa";
import { requireEnv } from "../src/utils/env/requireEnv";

const workerId = requireEnv("VITEST_WORKER_ID") || "0";
const dbName = `rota_test_${workerId}`;
const baseUrl = "postgresql://postgres:pass123@localhost:5432/";
process.env["DATABASE_URL"] = `${baseUrl}${dbName}`;

beforeAll(async () => {
  console.log(`[setup-db] Worker ${workerId}: Starting DB setup for ${dbName}`);
  try {
    console.log(`[setup-db] Creating database ${dbName}...`);
    await execa("psql", ["-U", "postgres", "-c", `CREATE DATABASE ${dbName};`]).catch(() => {});
    console.log(`[setup-db] Set DATABASE_URL to ${process.env["DATABASE_URL"]}`);
    console.log(`[setup-db] Running prisma migrate deploy...`);
    await execa("prisma", ["migrate", "deploy"]);
    console.log(`[setup-db] Running prisma db seed...`);
    await execa("prisma", ["db", "seed"]);
    console.log(`[setup-db] DB setup complete for ${dbName}`);
  } catch (err) {
    console.error(`[setup-db] Error during DB setup for ${dbName}:`, err);
    throw err;
  }
});

afterAll(async () => {
  console.log(`[setup-db] Worker ${workerId}: Dropping database ${dbName}...`);
  try {
    await execa("psql", ["-U", "postgres", "-c", `DROP DATABASE IF EXISTS ${dbName};`]);
    console.log(`[setup-db] Dropped database ${dbName}`);
  } catch (err) {
    console.error(`[setup-db] Error dropping database ${dbName}:`, err);
  }
});
