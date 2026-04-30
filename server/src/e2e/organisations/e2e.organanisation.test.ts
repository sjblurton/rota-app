import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import { describe, expect, it } from "vitest";

import app from "../../app/app";
import { PATHS } from "../../constants/paths";
import { requireEnv } from "../../utils/env/requireEnv";

const ORG_ID = uuidv4();

describe("/organisations", () => {
  describe("POST /organisations", () => {
    it("creates an organisation", async () => {
      const res = await request(app)
        .post(`${PATHS.apiBaseV1}${PATHS.superadmin}${PATHS.organisations}`)
        .set("x-superadmin-key", requireEnv("SUPERADMIN_API_KEY"))
        .send({ name: "Test Org", id: ORG_ID })
        .expect(201);

      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toBe("Test Org");
    });
  });
  describe("GET /organisations", () => {
    it("retrieves organisations", async () => {
      const res = await request(app)
        .get(`${PATHS.apiBaseV1}${PATHS.superadmin}${PATHS.organisations}`)
        .set("x-superadmin-key", requireEnv("SUPERADMIN_API_KEY"))
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
      expect(res.body.some((org: any) => org.name === "Test Org")).toBe(true);
    });
  });
});
