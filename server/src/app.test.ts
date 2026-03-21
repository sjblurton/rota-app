import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "./app";

describe("GET /api/docs", () => {
  it("serves Swagger UI", async () => {
    const response = await request(app).get("/api/docs/");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.text.toLowerCase()).toContain("swagger ui");
  });
});
