import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { patchInvitesController } from "../controllers/patch-invites-controller";
import { invitesRouter } from "./invites-router";

vi.mock("../../controllers/invites/patch-invites-controller", () => ({
  patchInvitesController: vi.fn(),
}));

const app = express();
app.use(express.json());
app.use(invitesRouter);

describe("invitesRouter", () => {
  beforeEach(() => {
    (patchInvitesController as any).mockReset();
  });

  it("routes PATCH /:invite_id to patchInvitesController", async () => {
    (patchInvitesController as any).mockImplementation(({ request, response }: any) => {
      response.status(200).json({ ok: true, invite_id: request.params.invite_id });
    });
    const res = await request(app)
      .patch("/dcf6d793-9fe8-4964-aff4-b27b209052e5")
      .send({ status: "accepted" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true, invite_id: "dcf6d793-9fe8-4964-aff4-b27b209052e5" });
    expect(patchInvitesController).toHaveBeenCalled();
  });

  it("returns 500 if controller throws", async () => {
    (patchInvitesController as any).mockImplementation(() => {
      throw new Error("fail");
    });
    const res = await request(app)
      .patch("/dcf6d793-9fe8-4964-aff4-b27b209052e5")
      .send({ status: "accepted" });
    expect(res.status).toBe(500);
  });
});
