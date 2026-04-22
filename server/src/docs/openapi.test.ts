const patchInvitePath = `${PATHS.apiBaseV1}${PATHS.invites}/{invite_id}`;

describe("Invites OpenAPI", () => {
  it("documents PATCH /api/v1/invites/{invite_id} path", () => {
    const patchInvite = openApiDocument["paths"][patchInvitePath];
    expect(patchInvite).toBeDefined();
    expect(patchInvite).toHaveProperty("patch");
    expect(patchInvite?.patch?.summary).toMatch(/Accept or reject an invite/i);
    expect(patchInvite?.patch?.security).toEqual([{ BearerAuth: [] }]);
    expect(patchInvite?.patch?.parameters?.[0]).toMatchObject({
      name: "invite_id",
      in: "path",
      required: true,
      schema: { type: "string", format: "uuid" },
    });
  });

  it("documents correct request and response schemas for PATCH /api/v1/invites/{invite_id}", () => {
    const patchInvite = openApiDocument?.["paths"]?.[patchInvitePath]?.patch;
    expect(patchInvite).toBeDefined();
    const requestBody = patchInvite?.requestBody;
    const hasContent = requestBody && "content" in requestBody;
    expect(hasContent && requestBody.content?.["application/json"]?.schema).toBeDefined();
    expect(patchInvite?.responses?.["200"]?.content?.["application/json"]?.schema).toBeDefined();
  });

  it("documents error responses for PATCH /api/v1/invites/{invite_id}", () => {
    const patchInvite = openApiDocument?.["paths"]?.[patchInvitePath]?.patch;
    expect(patchInvite?.responses?.["400"]).toBeDefined();
    expect(patchInvite?.responses?.["401"]).toBeDefined();
    expect(patchInvite?.responses?.["404"]).toBeDefined();
  });
});
import { describe, expect, it } from "vitest";

import { PATHS } from "../constants/paths";
import { openApiDocument } from "./openapi";

const organisationsPath = `${PATHS.apiBaseV1}${PATHS.superadmin}${PATHS.organisations}`;

describe("openApiDocument", () => {
  it("includes expected top-level metadata and key paths", () => {
    expect(openApiDocument["openapi"]).toBe("3.0.3");
    expect(openApiDocument["info"].title).toBe("Rota App API");
    expect(openApiDocument["paths"]).toHaveProperty(organisationsPath);
  });

  it("documents superadmin organisation routes", () => {
    const organisationPathItem = openApiDocument["paths"][organisationsPath];

    expect(organisationPathItem).toBeDefined();
    expect(organisationPathItem).toHaveProperty("post");
    expect(organisationPathItem).toHaveProperty("get");
  });

  it("documents pagination query parameters for get organisations", () => {
    const organisationPathItem = openApiDocument["paths"][organisationsPath];
    const getOperation = organisationPathItem?.get;

    expect(getOperation).toBeDefined();

    const parameterNames = (getOperation?.parameters ?? [])
      .map((parameter) => ("name" in parameter ? parameter.name : undefined))
      .filter(Boolean);

    expect(parameterNames).toEqual(
      expect.arrayContaining(["limit", "offset", "order_by_key", "direction"]),
    );
  });

  it("merges schema components and security schemes", () => {
    expect(openApiDocument["security"]).toEqual(expect.arrayContaining([{ SuperadminKey: [] }]));
    expect(openApiDocument["security"]).toEqual(expect.arrayContaining([{ BearerAuth: [] }]));
  });
});
