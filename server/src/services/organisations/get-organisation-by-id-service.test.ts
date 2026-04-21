import { describe, expect, it, vi } from "vitest";

import { HttpErrorByCode } from "../../utils/http/HttpErrorByCode";
import { getOrganisationByIdService } from "./get-organisation-by-id-service";

const validOrg = { id: "org-1", name: "Test Org" };

vi.mock("../../libs/schemas/entities/organisation", () => ({
  organisationSchema: { parseAsync: (org: any) => Promise.resolve(org) },
}));

describe("getOrganisationByIdService", () => {
  it("returns parsed organisation if found", async () => {
    const organisationRepo = {
      findUnique: vi.fn().mockResolvedValue(validOrg),
    } as any;
    const result = await getOrganisationByIdService({ id: "org-1", organisationRepo });
    expect(result).toEqual(validOrg);
    expect(organisationRepo.findUnique).toHaveBeenCalledWith({ where: { id: "org-1" } });
  });

  it("throws HttpErrorByCode if not found", async () => {
    const organisationRepo = {
      findUnique: vi.fn().mockResolvedValue(null),
    } as any;
    await expect(getOrganisationByIdService({ id: "missing", organisationRepo })).rejects.toThrow(
      HttpErrorByCode,
    );
  });
});
