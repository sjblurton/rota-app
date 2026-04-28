import { faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import { describe, expect, it } from "vitest";

import app from "../../app";
import { PATHS } from "../../constants/paths";
import { requireEnv } from "../../utils/env/requireEnv";

const INVITE_ID = uuidv4();
const ORG_ID = "00000000-0000-0000-0000-000000000000";
const TEST_USER_EMAIL = faker.internet.email();

const supabase = createClient(requireEnv("SUPABASE_URL"), requireEnv("SUPABASE_SERVICE_ROLE_KEY"));

describe("/organisations/:id/invites", () => {
  describe("POST /organisations/:id/invites", () => {
    it("creates an invite for an organisation", async () => {
      const res = await request(app)
        .post(
          `${PATHS.apiBaseV1}${PATHS.superadmin}${PATHS.organisations}/${ORG_ID}${PATHS.invites}`,
        )
        .set("x-superadmin-key", requireEnv("SUPERADMIN_API_KEY"))
        .send({
          id: INVITE_ID,
          email: TEST_USER_EMAIL,
          role: "admin",
        });
      expect(res.status).toBe(201);

      expect(res.body).toHaveProperty("id");
      expect(res.body.email).toBe(TEST_USER_EMAIL);
      expect(res.body.role).toBe("admin");
    });
  });
  describe("PATCH /invites/:invite_id", () => {
    it("accepts an invite", async () => {
      const user = await supabase.auth.signInWithPassword({
        email: "user@test.com",
        password: "test123",
      });

      const res = await request(app)
        .patch(`${PATHS.apiBaseV1}${PATHS.admin}${PATHS.invites}/${INVITE_ID}`)
        .set("Authorization", `Bearer ${user.data.session?.access_token}`)
        .send({
          status: "accepted",
        });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("invite");
      expect(res.body).toHaveProperty("user");
    });
  });
});
