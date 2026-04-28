import { beforeAll, afterAll } from "vitest";
import { execa } from "execa";
import { requireEnv } from "../src/utils/env/requireEnv";

const workerId = requireEnv("VITEST_WORKER_ID") || "0";
const dbName = `rota_test_${workerId}`;
const baseUrl = "postgresql://postgres:pass123@localhost:5432/";

beforeAll(async () => {
  await execa("psql", ["-U", "postgres", "-c", `CREATE DATABASE ${dbName};`]).catch(() => {});
  process.env["DATABASE_URL"] = `${baseUrl}${dbName}`;
  await execa("prisma", ["migrate", "deploy"]);
  await execa("prisma", ["db", "seed"]);
});

afterAll(async () => {
  await execa("psql", ["-U", "postgres", "-c", `DROP DATABASE IF EXISTS ${dbName};`]);
});
