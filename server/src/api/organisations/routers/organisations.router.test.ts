import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { organisationsRouter } from "./organisations.router";

vi.mock("../controllers/get-organisations.controller", () => ({
  getOrganisations: vi.fn(({ response }) => {
    response.status(200).json(["mocked-get"]);
  }),
}));
vi.mock("../controllers/post-organisations.controller", () => ({
  postOrganisations: vi.fn(({ response }) => {
    response.status(201).json({ id: "mocked-post" });
  }),
}));

describe("organisationsRouter", () => {
  let app: express.Express;
  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/organisations", organisationsRouter);
  });

  it("POST /organisations calls postOrganisations controller", async () => {
    const res = await request(app).post("/organisations").send({});
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: "mocked-post" });
  });

  it("GET /organisations calls getOrganisations controller", async () => {
    const res = await request(app).get("/organisations");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(["mocked-get"]);
  });
});
