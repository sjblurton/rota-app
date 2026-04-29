import { beforeEach, describe, expect, it, vi } from "vitest";

import { supabase } from "../../../libs/auth/supabase";
import { HttpErrorByCode } from "../../../utils/http/HttpErrorByCode";
import { createRequireJwtAuth, requireJwtAuth } from "./require-jwt-auth";

vi.mock("../../../libs/auth/supabase", () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
  },
}));

describe("requireJwtAuth middleware", () => {
  let request: any;
  let response: any;
  let next: any;

  beforeEach(() => {
    request = { headers: {}, superbaseUser: undefined };
    response = {};
    next = vi.fn();
    (supabase.auth.getUser as any).mockReset();
  });

  it("throws if no Authorization header", async () => {
    await expect(requireJwtAuth(request, response, next)).rejects.toThrow(HttpErrorByCode);
  });

  it("throws if Authorization header does not start with Bearer", async () => {
    request.headers.authorization = "Token abc";
    await expect(requireJwtAuth(request, response, next)).rejects.toThrow(HttpErrorByCode);
  });

  it("throws if token is missing after Bearer", async () => {
    request.headers.authorization = "Bearer ";
    await expect(requireJwtAuth(request, response, next)).rejects.toThrow(HttpErrorByCode);
  });

  it("throws if supabase returns error", async () => {
    request.headers.authorization = "Bearer validtoken";
    (supabase.auth.getUser as any).mockResolvedValue({
      data: { user: null },
      error: { message: "fail" },
    });
    await expect(requireJwtAuth(request, response, next)).rejects.toThrow(HttpErrorByCode);
  });

  it("throws if supabase returns no user", async () => {
    request.headers.authorization = "Bearer validtoken";
    (supabase.auth.getUser as any).mockResolvedValue({ data: { user: null }, error: null });
    await expect(requireJwtAuth(request, response, next)).rejects.toThrow(HttpErrorByCode);
  });

  it("sets request.superbaseUser and calls next on success", async () => {
    request.headers.authorization = "Bearer validtoken";
    const fakeUser = { id: "user-1" };
    (supabase.auth.getUser as any).mockResolvedValue({ data: { user: fakeUser }, error: null });
    await requireJwtAuth(request, response, next);
    expect(request.superbaseUser).toEqual(fakeUser);
    expect(next).toHaveBeenCalled();
  });

  it("sets request.superbaseUser and calls next if mockUser is provided and NODE_ENV is 'test'", async () => {
    process.env["NODE_ENV"] = "test";
    const mockUser = { id: "mock-id", email: "mock@test.com" };
    const middleware = createRequireJwtAuth(mockUser);
    await middleware(request, response, next);
    expect(request.superbaseUser).toMatchObject(mockUser);
    expect(next).toHaveBeenCalled();
  });

  it("throws if mockUser is provided and NODE_ENV is not 'test'", async () => {
    process.env["NODE_ENV"] = "production";
    const mockUser = { id: "mock-id", email: "mock@test.com" };
    const middleware = createRequireJwtAuth(mockUser);
    await expect(middleware(request, response, next)).rejects.toThrow();
  });
});
