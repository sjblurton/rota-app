import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

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
      status: "invited",
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
