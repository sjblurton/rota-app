import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { organisationSchema } from "../../libs/schemas/entities/organisation";
import { createOrganisationService } from "./create-organisation-service";

const fixedDate = new Date("2026-04-27T16:15:35.071Z");

const validOrg = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "Test Org",
  plan: "free",
  sms_limit: 100,
  sms_used_this_month: 0,
  status: "active",
  stripe_customer_id: null,
  created_at: fixedDate,
  updated_at: fixedDate,
};

describe("createOrganisationService", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fixedDate);
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  it("returns parsed organisation from custom repo", async () => {
    const mockRepo = vi.fn().mockResolvedValue(validOrg);
    const result = await createOrganisationService({
      data: { name: "Test Org" },
      createOrganisation: mockRepo,
    });
    expect(mockRepo).toHaveBeenCalledWith({ data: { name: "Test Org" } });
    expect(result).toEqual(await organisationSchema.parseAsync(validOrg));
  });

  it("throws if repo returns invalid data", async () => {
    const mockRepo = vi.fn().mockResolvedValue({ id: 123 }); // id should be string
    await expect(
      createOrganisationService({ data: { name: "Test Org" }, createOrganisation: mockRepo }),
    ).rejects.toThrow();
  });
});
