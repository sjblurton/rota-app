import { beforeAll } from "vitest";

import { execa } from "execa";

beforeAll(async () => {
  await execa("prisma", ["migrate", "reset", "--force"]);
  await execa("prisma", ["db", "seed"]);
});
