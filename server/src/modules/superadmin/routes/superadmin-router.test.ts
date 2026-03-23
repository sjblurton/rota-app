import express from "express";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { superadminRouter } from "./superadmin-router";
import { randomUUID } from "node:crypto";

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
      is_active: true,
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
      is_active: true,
      organisation_id: organisationResponse.body.id,
    });
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("password_hash");
  });

  it("returns not found when creating a manager for an unknown organisation", async () => {
    const response = await request(testApp)
      .post(`/api/superadmin/organisations/${randomUUID()}/managers`)
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

  it("returns conflict when creating a manager for an inactive organisation", async () => {
    const organisationResponse = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: uniqueOrganisationName() });

    await request(testApp)
      .patch(`/api/superadmin/organisations/${organisationResponse.body.id}`)
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ is_active: false });

    const response = await request(testApp)
      .post(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: uniqueManagerEmail(),
        password: "strong-password",
      });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: "Organisation is inactive" });
  });

  it("returns a 400 if the org id is not a valid uuid", async () => {
    const response = await request(testApp)
      .post(`/api/superadmin/organisations/invalid-uuid/managers`)
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: uniqueManagerEmail(),
        password: "strong-password",
      });

    expect(response.status).toBe(400);
  });

  it("updates an organisation", async () => {
    const organisationResponse = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: uniqueOrganisationName() });

    const response = await request(testApp)
      .patch(`/api/superadmin/organisations/${organisationResponse.body.id}`)
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: `${uniqueOrganisationName()} Updated`, is_active: false });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: organisationResponse.body.id,
      name: `${uniqueOrganisationName()} Updated`,
      is_active: false,
    });
  });

  it("deactivates an organisation", async () => {
    const organisationResponse = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: uniqueOrganisationName() });

    const response = await request(testApp)
      .patch(`/api/superadmin/organisations/${organisationResponse.body.id}`)
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ is_active: false });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: organisationResponse.body.id,
      is_active: false,
    });
  });

  it("updates a manager in an organisation", async () => {
    const organisationResponse = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: uniqueOrganisationName() });

    const managerEmail = uniqueManagerEmail();

    const managerResponse = await request(testApp)
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

    const response = await request(testApp)
      .patch(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers/${managerResponse.body.id}`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: "Updated Manager", is_active: false });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: managerResponse.body.id,
      name: "Updated Manager",
      is_active: false,
      organisation_id: organisationResponse.body.id,
    });
  });

  it("deactivates a manager in an organisation", async () => {
    const organisationResponse = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: uniqueOrganisationName() });

    const managerResponse = await request(testApp)
      .post(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: uniqueManagerEmail(),
        password: "strong-password",
      });

    const response = await request(testApp)
      .patch(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers/${managerResponse.body.id}`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ is_active: false });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: managerResponse.body.id,
      is_active: false,
    });
  });

  it("returns conflict when updating a manager in an inactive organisation", async () => {
    const organisationResponse = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: uniqueOrganisationName() });

    const managerResponse = await request(testApp)
      .post(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "Jane Manager",
        phone_number: "+447700900123",
        email: uniqueManagerEmail(),
        password: "strong-password",
      });

    await request(testApp)
      .patch(`/api/superadmin/organisations/${organisationResponse.body.id}`)
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ is_active: false });

    const response = await request(testApp)
      .patch(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers/${managerResponse.body.id}`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: "Blocked Update" });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: "Organisation is inactive" });
  });

  it("allows reusing an email from an inactive manager", async () => {
    const organisationResponse = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: uniqueOrganisationName() });

    const reusableEmail = uniqueManagerEmail();

    const firstManagerResponse = await request(testApp)
      .post(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "First Manager",
        phone_number: "+447700900123",
        email: reusableEmail,
        password: "strong-password",
      });

    await request(testApp)
      .patch(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers/${firstManagerResponse.body.id}`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ is_active: false });

    const secondManagerResponse = await request(testApp)
      .post(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "Second Manager",
        phone_number: "+447700900124",
        email: reusableEmail,
        password: "another-strong-password",
      });

    expect(secondManagerResponse.status).toBe(201);
    expect(secondManagerResponse.body).toMatchObject({
      email: reusableEmail,
      is_active: true,
    });
  });

  it("returns conflict when reactivating a manager whose email is now used by another active manager", async () => {
    const organisationResponse = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: uniqueOrganisationName() });

    const sharedEmail = uniqueManagerEmail();

    const originalManagerResponse = await request(testApp)
      .post(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "Original Manager",
        phone_number: "+447700900123",
        email: sharedEmail,
        password: "strong-password",
      });

    await request(testApp)
      .patch(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers/${originalManagerResponse.body.id}`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ is_active: false });

    await request(testApp)
      .post(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "Replacement Manager",
        phone_number: "+447700900124",
        email: sharedEmail,
        password: "another-strong-password",
      });

    const response = await request(testApp)
      .patch(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers/${originalManagerResponse.body.id}`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ is_active: true });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      message: "Manager with this email already exists",
    });
  });

  it("deactivates existing managers when an organisation is deactivated", async () => {
    const organisationResponse = await request(testApp)
      .post("/api/superadmin/organisations")
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ name: uniqueOrganisationName() });

    const sharedEmail = uniqueManagerEmail();

    await request(testApp)
      .post(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "Original Manager",
        phone_number: "+447700900123",
        email: sharedEmail,
        password: "strong-password",
      });

    await request(testApp)
      .patch(`/api/superadmin/organisations/${organisationResponse.body.id}`)
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ is_active: false });

    await request(testApp)
      .patch(`/api/superadmin/organisations/${organisationResponse.body.id}`)
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({ is_active: true });

    const response = await request(testApp)
      .post(
        `/api/superadmin/organisations/${organisationResponse.body.id}/managers`,
      )
      .set("X-Superadmin-Key", "superadmin-test-key")
      .send({
        name: "Replacement Manager",
        phone_number: "+447700900124",
        email: sharedEmail,
        password: "another-strong-password",
      });

    expect(response.status).toBe(201);
  });
});
