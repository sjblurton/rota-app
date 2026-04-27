import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../app";
import { PATHS } from "../../constants/paths";
import { requireEnv } from "../../utils/env/requireEnv";

describe("GET /organisations", () => {
  it("retrieves organisations", async () => {
    const res = await request(app)
      .get(`${PATHS.apiBaseV1}${PATHS.superadmin}${PATHS.organisations}`)
      .set("x-superadmin-key", requireEnv("SUPERADMIN_API_KEY"))
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body.some((org: any) => org.name === "Acme Corporation")).toBe(true);
  });
});
