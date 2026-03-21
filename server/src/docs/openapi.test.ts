import { describe, expect, it } from "vitest";

import { openApiDocument } from "./openapi";

describe("openApiDocument", () => {
  it("includes expected top-level metadata and key paths", () => {
    expect(openApiDocument.openapi).toBe("3.0.3");
    expect(openApiDocument.info.title).toBe("Rota App API");
    expect(openApiDocument.paths).toHaveProperty(
      "/api/superadmin/organisations",
    );
    expect(openApiDocument.paths).toHaveProperty("/api/admin/staff");
    expect(openApiDocument.paths).toHaveProperty("/api/t/{token}");
    expect(openApiDocument.paths).toHaveProperty("/api/swaps/t/{token}");
    expect(openApiDocument.paths).toHaveProperty("/api/webhooks/sms");
  });

  it("merges schema components and security schemes", () => {
    expect(openApiDocument.components.schemas).toHaveProperty("Staff");
    expect(openApiDocument.components.schemas).toHaveProperty(
      "PaginationMetadata",
    );
    expect(openApiDocument.components.securitySchemes).toHaveProperty(
      "SuperadminKey",
    );

    const superadminKey =
      openApiDocument.components.securitySchemes.SuperadminKey;
    expect(superadminKey).toMatchObject({
      type: "apiKey",
      in: "header",
      name: "X-Superadmin-Key",
    });
  });
});
