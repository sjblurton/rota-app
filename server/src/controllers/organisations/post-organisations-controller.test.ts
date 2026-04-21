import { beforeEach, describe, expect, it, vi } from "vitest";

import { createOrganisationSchema } from "../../libs/schemas/entities/organisation";
import { postOrganisations } from "./post-organisations-controller";

const mockRequest = (body = {}) => ({ body }) as any;
const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("postOrganisations controller", () => {
  let request: any;
  let response: any;
  let createOrganisation: any;

  beforeEach(() => {
    request = mockRequest({ name: "Test Org" });
    response = mockResponse();
    createOrganisation = vi.fn().mockResolvedValue({ id: "org-1", name: "Test Org" });
  });

  it("parses body and creates organisation", async () => {
    await postOrganisations({ request, response, createOrganisation });
    expect(createOrganisation).toHaveBeenCalledWith({
      data: createOrganisationSchema.parse(request.body),
    });
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({ id: "org-1", name: "Test Org" });
  });

  it("uses default createOrganisation if not provided", async () => {
    await expect(postOrganisations({ request, response })).resolves.not.toThrow();
  });
});
