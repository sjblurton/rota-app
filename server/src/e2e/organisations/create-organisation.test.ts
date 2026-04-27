import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../app";
import { PATHS } from "../../constants/paths";
import { requireEnv } from "../../utils/env/requireEnv";

describe("POST /organisations", () => {
  it("creates an organisation", async () => {
    const res = await request(app)
      .post(`${PATHS.apiBaseV1}${PATHS.superadmin}${PATHS.organisations}`)
      .set("x-superadmin-key", requireEnv("SUPERADMIN_API_KEY"))
      .send({ name: "Test Org" })
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test Org");
  });
});
