import { describe, expect, it } from "vitest";

import { openApiDocument } from "./openapi";

describe("openApiDocument", () => {
  it("includes expected top-level metadata and key paths", () => {
    expect(openApiDocument.openapi).toBe("3.0.3");
    expect(openApiDocument.info.title).toBe("Rota App API");
    expect(openApiDocument.paths).toHaveProperty("/api/superadmin/organisations");
  });

  it("documents superadmin organisation routes", () => {
    const orgranisationPath = openApiDocument.paths["/api/superadmin/organisations"];

    expect(orgranisationPath).toBeDefined();
    expect(orgranisationPath).toHaveProperty("post");
    expect(orgranisationPath).toHaveProperty("get");
  });

  it("documents pagination query parameters for get organisations", () => {
    const organisationsPath = openApiDocument.paths["/api/superadmin/organisations"];
    const getOperation = organisationsPath.get;

    expect(getOperation).toBeDefined();

    const parameterNames = (getOperation.parameters ?? []).map(
      (parameter: { name: string }) => parameter.name,
    );

    expect(parameterNames).toEqual(
      expect.arrayContaining(["limit", "offset", "order_by_key", "direction"]),
    );
  });

  it("merges schema components and security schemes", () => {
    expect(openApiDocument.components.securitySchemes).toHaveProperty("SuperadminKey");

    const superadminKey = openApiDocument.components.securitySchemes.SuperadminKey;
    expect(superadminKey).toMatchObject({
      type: "apiKey",
      in: "header",
      name: "X-Superadmin-Key",
    });
  });
});
