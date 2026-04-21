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
    const getOperation = organisationPathItem.get;

    expect(getOperation).toBeDefined();

    const parameterNames = (getOperation.parameters ?? []).map(
      (parameter: { name: string }) => parameter.name,
    );

    expect(parameterNames).toEqual(
      expect.arrayContaining(["limit", "offset", "order_by_key", "direction"]),
    );
  });

  it("merges schema components and security schemes", () => {
    expect(openApiDocument["components"].securitySchemes).toHaveProperty("SuperadminKey");

    const superadminKey = openApiDocument["components"].securitySchemes.SuperadminKey;
    expect(superadminKey).toMatchObject({
      type: "apiKey",
      in: "header",
      name: "X-Superadmin-Key",
    });

    expect(openApiDocument["security"]).toEqual([{ SuperadminKey: [] }]);
  });
});
