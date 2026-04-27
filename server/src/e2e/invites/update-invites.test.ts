import { createClient } from "@supabase/supabase-js";
import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../app";
import { PATHS } from "../../constants/paths";
import { requireEnv } from "../../utils/env/requireEnv";

export const supabase = createClient(
  requireEnv("SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
);

describe("PATCH /invites/:invite_id", () => {
  it("accepts an invite", async () => {
    const user = await supabase.auth.signInWithPassword({
      email: "user@test.com",
      password: "test123",
    });

    const res = await request(app)
      .patch(
        `${PATHS.apiBaseV1}${PATHS.admin}${PATHS.invites}/00000000-0000-0000-0000-000000000000`,
      )
      .set("Authorization", `Bearer ${user.data.session?.access_token}`)
      .send({
        status: "accepted",
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("invite");
    expect(res.body).toHaveProperty("user");
  });
});
