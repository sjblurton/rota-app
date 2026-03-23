import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import app from "./app";

describe("GET /api/docs", () => {
  it("serves Swagger UI", async () => {
    const response = await request(app).get("/api/docs/");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.text.toLowerCase()).toContain("swagger ui");
  });
});

describe("superadmin route mounting", () => {
  const ORGANISATION_ID = "11111111-1111-1111-1111-111111111111";
  const MANAGER_ID = "22222222-2222-2222-2222-222222222222";
  const TEST_SUPERADMIN_KEY = "superadmin-test-key";
  const ALLOWED_MOUNT_STATUSES = [401, 500];
  let originalSuperadminApiKey: string | undefined;

  beforeEach(() => {
    originalSuperadminApiKey = process.env["SUPERADMIN_API_KEY"];
    process.env["SUPERADMIN_API_KEY"] = TEST_SUPERADMIN_KEY;
  });

  afterEach(() => {
    if (originalSuperadminApiKey === undefined) {
      delete process.env["SUPERADMIN_API_KEY"];
      return;
    }

    process.env["SUPERADMIN_API_KEY"] = originalSuperadminApiKey;
  });

  it.each([
    {
      label: "POST /organisations",
      call: () => request(app).post("/api/superadmin/organisations").send({}),
    },
    {
      label: "PATCH /organisations/:organisation_id",
      call: () =>
        request(app)
          .patch(`/api/superadmin/organisations/${ORGANISATION_ID}`)
          .send({}),
    },
    {
      label: "POST /organisations/:organisation_id/managers",
      call: () =>
        request(app)
          .post(`/api/superadmin/organisations/${ORGANISATION_ID}/managers`)
          .send({}),
    },
    {
      label: "PATCH /organisations/:organisation_id/managers/:manager_id",
      call: () =>
        request(app)
          .patch(
            `/api/superadmin/organisations/${ORGANISATION_ID}/managers/${MANAGER_ID}`,
          )
          .send({}),
    },
  ])("mounts $label under /api/superadmin", async ({ call }) => {
    const response = await call();

    expect(response.status).not.toBe(404);
    expect(ALLOWED_MOUNT_STATUSES).toContain(response.status);
  });
});
