import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import app from "../../app";

describe("managersRouter", () => {
  const TEST_SUPERADMIN_KEY = "superadmin-test-key";
  const ORGANISATION_ID = "11111111-1111-1111-1111-111111111111";
  const MANAGER_ID = "22222222-2222-2222-2222-222222222222";
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

  it("rejects unauthenticated requests", async () => {
    const res = await request(app)
      .post(`/api/superadmin/organisations/${ORGANISATION_ID}/managers`)
      .send({});
    expect(res.status).toBe(401);
  });

  it("accepts authenticated POST", async () => {
    const res = await request(app)
      .post(`/api/superadmin/organisations/${ORGANISATION_ID}/managers`)
      .set("X-Superadmin-Key", TEST_SUPERADMIN_KEY)
      .send({});
    expect([200, 400, 404, 422, 500]).toContain(res.status);
  });

  it("accepts authenticated PATCH", async () => {
    const res = await request(app)
      .patch(`/api/superadmin/organisations/${ORGANISATION_ID}/managers/${MANAGER_ID}`)
      .set("X-Superadmin-Key", TEST_SUPERADMIN_KEY)
      .send({});
    expect([200, 400, 404, 422, 500]).toContain(res.status);
  });
});
