import { beforeEach, describe, expect, it } from "vitest";

import { prisma } from "../../prisma/prisma";
import { OrganisationsRepository } from "./organisations-repository";

beforeEach(async () => {
  await prisma.organisation.deleteMany();
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

  it("paginates organisations with limit and offset", async () => {
    const repo = new OrganisationsRepository();
    for (let i = 1; i <= 5; i++) {
      await repo.createOrganisation({ name: `Org${i}` });
    }
    const page1 = await repo.getAllOrganisations({ limit: 2, offset: 0 });
    expect(page1.length).toBe(2);
    expect(page1[0].name).toBeDefined();
    const page2 = await repo.getAllOrganisations({ limit: 2, offset: 2 });
    expect(page2.length).toBe(2);
    const page3 = await repo.getAllOrganisations({ limit: 2, offset: 4 });
    expect(page3.length).toBe(1);
    const allNames = [...page1, ...page2, ...page3].map((o) => o.name);
    expect(new Set(allNames).size).toBe(5);
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
