import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("server entrypoint", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("starts the app and logs startup messages in development", async () => {
    const listenMock = vi.fn((_port, callback?: () => void) => {
      callback?.();
    });
    const infoMock = vi.fn();
    const dotenvConfigMock = vi.fn();

    vi.doMock("./app", () => ({
      default: {
        listen: listenMock,
      },
    }));

    vi.doMock("./libs/logger/logger", () => ({
      logger: {
        info: infoMock,
      },
    }));

    vi.doMock("dotenv", () => ({
      default: {
        config: dotenvConfigMock,
      },
    }));

    process.env["NODE_ENV"] = "development";
    process.env["PORT"] = "4123";

    await import("./server");

    expect(dotenvConfigMock).toHaveBeenCalledWith({ path: ".env.local", quiet: true });
    expect(listenMock).toHaveBeenCalledWith("4123", expect.any(Function));
    expect(infoMock).toHaveBeenCalledWith("Server running on port http://localhost:4123");
    expect(infoMock).toHaveBeenCalledWith(
      "API documentation available at http://localhost:4123/api/docs",
    );
  });
});
