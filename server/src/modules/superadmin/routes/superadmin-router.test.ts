import express from "express";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { superadminRouter } from "./superadmin-router";

const testApp = express();

testApp.use(express.json());
testApp.use("/api/superadmin", superadminRouter);

describe("superadminRouter", () => {
  const originalSuperadminKey = process.env["SUPERADMIN_API_KEY"];

  let testRunId = 0;

  const uniqueOrganisationName = () => `Acme Hospital ${testRunId}`;

  const uniqueManagerEmail = () => `jane.manager+${testRunId}@example.com`;

  beforeEach(() => {
    testRunId += 1;
    process.env["SUPERADMIN_API_KEY"] = "superadmin-test-key";
  });

  afterEach(() => {
    if (originalSuperadminKey === undefined) {
      delete process.env["SUPERADMIN_API_KEY"];
    } else {
      process.env["SUPERADMIN_API_KEY"] = originalSuperadminKey;
    }
  });

  it("rejects requests with a missing superadmin key", async () => {
    const response = await request(testApp)
      .post("/api/superadmin/organisations")
      .send({ name: uniqueOrganisationName() });

    expect(response.status).toBe(401);
  });

  it("returns a server error when the superadmin key is not configured", async () => {
    delete process.env["SUPERADMIN_API_KEY"];

    const response = await request(testApp)
      .post("/api/superadmin/organisations")
      .send({ name: uniqueOrganisationName() });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Superadmin API key is not configured",
    });
  });

  it("rejects requests with a superadmin key of the wrong length", async () => {
    const response = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "short-key")
      .send({ name: uniqueOrganisationName() });

    expect(response.status).toBe(401);
  });

  it("creates an organisation with a valid key", async () => {
    const response = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: uniqueOrganisationName() });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      name: uniqueOrganisationName(),
    });
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("created_at");
  });

  it("rejects duplicate organisation names", async () => {
    const duplicateOrganisationName = uniqueOrganisationName();

    await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: duplicateOrganisationName });

    const response = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: duplicateOrganisationName.toLowerCase() });

    expect(response.status).toBe(409);
  });

  it("creates a manager linked to an organisation", async () => {
    const organisationResponse = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: uniqueOrganisationName() });

    const managerEmail = uniqueManagerEmail();

    const response = await request(testApp)
      .post(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: managerEmail,
        password: "strong-password",
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      name: "Jane Manager",
      email: managerEmail,
      organisation_id: organisationResponse.body.id,
    });
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("password_hash");
  });

  it("returns not found when creating a manager for an unknown organisation", async () => {
    const response = await request(testApp)
      .post("/api/superadmin/organisations/unknown-id/managers")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: uniqueManagerEmail(),
        password: "strong-password",
      });

    expect(response.status).toBe(404);
  });

  it("returns conflict when manager email already exists", async () => {
    const organisationResponse = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: uniqueOrganisationName() });

    const managerEmail = uniqueManagerEmail();

    await request(testApp)
      .post(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: managerEmail,
        password: "strong-password",
      });

    const duplicateResponse = await request(testApp)
      .post(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "John Manager",
        phone_number: "+447700900124",
        email: managerEmail,
        password: "another-strong-password",
      });

    expect(duplicateResponse.status).toBe(409);
  });
});
