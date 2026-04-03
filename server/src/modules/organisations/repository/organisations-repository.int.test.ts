import { execa } from "execa";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "../../../libs/prisma/prisma";
import { OrganisationsRepository } from "./organisations-repository";

beforeAll(async () => {
  await execa("npm", ["run", "db:reset:force"], {
    cwd: process.cwd(),
    stdio: "inherit",
  });
});

beforeEach(async () => {
  await prisma.organisation.deleteMany();
});

afterAll(async () => {
  await execa("npm", ["run", "db:reset:force"], {
    cwd: process.cwd(),
    stdio: "inherit",
  });
  await prisma.$disconnect();
});

describe("OrganisationsRepository (integration)", () => {
  it("should be running in test environment", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });

  it("creates an organisation in the DB", async () => {
    const repo = new OrganisationsRepository();
    const input = { name: "Test Org" };
    const org = await repo.createOrganisation(input);
    expect(org.name).toBe("Test Org");

    const found = await prisma.organisation.findUnique({ where: { id: org.id } });
    expect(found).not.toBeNull();
  });

  it("gets an organisation by id", async () => {
    const repo = new OrganisationsRepository();
    const input = { name: "Find Me" };
    const created = await repo.createOrganisation(input);
    const found = await repo.getOrganisationById(created.id);
    expect(found).not.toBeNull();
    expect(found?.id).toBe(created.id);
    expect(found?.name).toBe("Find Me");
  });

  it("gets all organisations", async () => {
    const repo = new OrganisationsRepository();
    await repo.createOrganisation({ name: "Org1" });
    await repo.createOrganisation({ name: "Org2" });
    const all = await repo.getAllOrganisations();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThanOrEqual(2);
    const names = all.map((o) => o.name);
    expect(names).toContain("Org1");
    expect(names).toContain("Org2");
  });

  it("updates an organisation", async () => {
    const repo = new OrganisationsRepository();
    const created = await repo.createOrganisation({ name: "ToUpdate" });
    const updated = await repo.updateOrganisation(created.id, { name: "UpdatedName" });
    expect(updated.name).toBe("UpdatedName");
    const found = await repo.getOrganisationById(created.id);
    expect(found?.name).toBe("UpdatedName");
  });

  it("gets organisations by name", async () => {
    const repo = new OrganisationsRepository();
    await repo.createOrganisation({ name: "UniqueName" });
    const found = await repo.getOrganisationByName("UniqueName");
    expect(Array.isArray(found)).toBe(true);
    expect(found.length).toBeGreaterThanOrEqual(1);
    expect(found[0].name).toBe("UniqueName");
  });
});
