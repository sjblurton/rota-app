import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "./app";

describe("app routing", () => {
  it("enforces auth on the superadmin organisations route", async () => {
    const res = await request(app).post("/api/v1/superadmin/organisations").send();

    expect(res.status).toBe(401);
  });

  it("serves the OpenAPI docs", async () => {
    const res = await request(app).get("/api/docs");

    expect(res.status).not.toBe(404);
  });

  it("returns 404 for an unknown route", async () => {
    const res = await request(app).get("/this-route-does-not-exist");

    expect(res.status).toBe(404);
  });
});
