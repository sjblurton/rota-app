import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import { COMMON_STATUS_NAMES } from "../../constants/status";
import { prisma } from "../../libs/prisma/prisma";
import { organisationsRouter } from "./organisations-router";

const app = express();
app.use(express.json());
app.use("/organisations", organisationsRouter);

beforeEach(async () => {
  await prisma.organisation.deleteMany();
});

describe("POST /organisations", () => {
  it("creates an organisation and returns 201 with the full resource shape", async () => {
    const res = await request(app).post("/organisations").send({ name: "Acme Corp" });

    expect(res.status).toBe(201);

    expect(res.body).toMatchObject({
      name: "Acme Corp",
      plan: "free",
      sms_limit: 100,
      sms_used_this_month: 0,
      status: COMMON_STATUS_NAMES.ACTIVE,
      stripe_customer_id: null,
    });

    expect(res.body.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    expect(res.body.created_at).toMatch(/Z$/);
    expect(res.body.updated_at).toMatch(/Z$/);
  });

  it("returns 400 when name is missing", async () => {
    const res = await request(app).post("/organisations").send({});

    expect(res.status).toBe(400);
  });

  it("returns 400 when name is an empty string", async () => {
    const res = await request(app).post("/organisations").send({ name: "" });

    expect(res.status).toBe(400);
  });

  it("returns 400 when name is whitespace only", async () => {
    const res = await request(app).post("/organisations").send({ name: "   " });

    expect(res.status).toBe(400);
  });

  it("strips unknown fields and returns 201", async () => {
    const res = await request(app)
      .post("/organisations")
      .send({ name: "Stripped Org", unknown_field: "should be ignored" });

    expect(res.status).toBe(201);
    expect(res.body.unknown_field).toBeUndefined();
  });

  it("persists the created organisation to the database", async () => {
    const res = await request(app).post("/organisations").send({ name: "Persisted Org" });

    expect(res.status).toBe(201);

    const found = await prisma.organisation.findUnique({ where: { id: res.body.id } });
    expect(found).not.toBeNull();
    expect(found?.name).toBe("Persisted Org");
  });
});

describe("GET /organisations", () => {
  it("returns 200 with an empty array when no organisations exist", async () => {
    const res = await request(app).get("/organisations");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("returns 200 with organisations", async () => {
    await prisma.organisation.createMany({
      data: [{ name: "Alpha Org" }, { name: "Beta Org" }],
    });

    const res = await request(app).get("/organisations");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
    expect(res.body.map((organisation: { name: string }) => organisation.name)).toEqual(
      expect.arrayContaining(["Alpha Org", "Beta Org"]),
    );
  });

  it("applies pagination and sorting query parameters", async () => {
    await prisma.organisation.createMany({
      data: [{ name: "Charlie Org" }, { name: "Alpha Org" }, { name: "Bravo Org" }],
    });

    const res = await request(app).get("/organisations").query({
      limit: 2,
      offset: 1,
      order_by_key: "name",
      direction: "asc",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body.map((organisation: { name: string }) => organisation.name)).toEqual([
      "Bravo Org",
      "Charlie Org",
    ]);
  });

  it("returns 400 for invalid direction query", async () => {
    const res = await request(app).get("/organisations").query({ direction: "up" });

    expect(res.status).toBe(400);
  });
});
