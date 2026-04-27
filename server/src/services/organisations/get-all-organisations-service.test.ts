import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { organisationSchema } from "../../libs/schemas/entities/organisation";
import { getAllOrganisationsService } from "./get-all-organisations-service";

const validOrg = { id: "00000000-0000-0000-0000-000000000000", name: "Test Org" };

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-04-27T16:15:35.071Z"));
});
afterAll(() => {
  vi.useRealTimers();
});

describe("getAllOrganisationsService", () => {
  it("returns parsed organisations from custom repo", async () => {
    const mockRepo = vi.fn().mockResolvedValue([validOrg]);
    const result = await getAllOrganisationsService({ getAllOrganisations: mockRepo });
    expect(mockRepo).toHaveBeenCalledWith({ paginationQuery: {} });
    expect(result).toEqual(await organisationSchema.array().parseAsync([validOrg]));
  });

  it("passes paginationQuery to repo", async () => {
    const mockRepo = vi.fn().mockResolvedValue([validOrg]);
    const paginationQuery = { offset: 2, limit: 5 };
    await getAllOrganisationsService({
      getAllOrganisations: mockRepo,
      paginationQuery,
    });
    expect(mockRepo).toHaveBeenCalledWith({ paginationQuery });
  });

  it("throws if repo returns invalid data", async () => {
    const mockRepo = vi.fn().mockResolvedValue([{ id: 123 }]);
    await expect(getAllOrganisationsService({ getAllOrganisations: mockRepo })).rejects.toThrow();
  });
});
