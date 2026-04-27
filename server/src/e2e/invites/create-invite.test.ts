import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../app";
import { PATHS } from "../../constants/paths";
import { requireEnv } from "../../utils/env/requireEnv";

describe("POST /organisations/:id/invites", () => {
  it("creates an invite for an organisation", async () => {
    const res = await request(app)
      .post(
        `${PATHS.apiBaseV1}${PATHS.superadmin}${PATHS.organisations}/00000000-0000-0000-0000-000000000000${PATHS.invites}`,
      )
      .set("x-superadmin-key", requireEnv("SUPERADMIN_API_KEY"))
      .send({
        email: "new.user@example.com",
        role: "admin",
      });
    expect(res.status).toBe(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe("new.user@example.com");
    expect(res.body.role).toBe("admin");
  });
});
