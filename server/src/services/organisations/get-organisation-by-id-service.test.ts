import { describe, expect, it, vi } from "vitest";

import { HttpErrorByCode } from "../../utils/http/HttpErrorByCode";
import { getOrganisationByIdService } from "./get-organisation-by-id-service";

const validOrg = { id: "org-1", name: "Test Org" };

vi.mock("../../libs/schemas/entities/organisation", () => ({
  organisationSchema: { parseAsync: (org: any) => Promise.resolve(org) },
}));

describe("getOrganisationByIdService", () => {
  it("returns parsed organisation if found", async () => {
    const getOrganisationById = vi.fn().mockResolvedValue(validOrg);

    const result = await getOrganisationByIdService({ id: "org-1", getOrganisationById });
    expect(result).toEqual(validOrg);
  });

  it("throws HttpErrorByCode if not found", async () => {
    const getOrganisationById = vi.fn().mockResolvedValue(null);
    await expect(
      getOrganisationByIdService({ id: "missing", getOrganisationById }),
    ).rejects.toThrow(HttpErrorByCode);
  });
});
