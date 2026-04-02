import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";

import { superadminRouter } from "./superadmin-router";

describe("superadminRouter API key enforcement", () => {
  const app = express();
  app.use(express.json());
  app.use("/api/superadmin", superadminRouter);

  it("rejects requests without the API key", async () => {
    const res = await request(app).get("/api/superadmin/organisations").send();
    expect(res.status).toBe(401);
  });

  it("rejects requests with an incorrect API key", async () => {
    const res = await request(app)
      .get("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "invalid-key")
      .send();

    expect(res.status).toBe(403);
  });

  it("accepts requests with the correct API key", async () => {
    const apiKey = process.env.SUPERADMIN_API_KEY;

    if (!apiKey) {
      throw new Error("SUPERADMIN_API_KEY is not set in environment variables");
    }

    const res = await request(app)
      .get("/api/superadmin/organisations")
      .set("X-Superadmin-Key", apiKey)
      .send();

    expect([401, 403]).not.toContain(res.status);
  });
});
