import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PATHS } from "./constants/paths";

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
    const queryRawMock = vi.fn().mockResolvedValue([{ "?column?": 1 }]);
    const infoMock = vi.fn();
    const dotenvConfigMock = vi.fn();

    vi.doMock("./app/app", () => ({
      default: {
        listen: listenMock,
      },
    }));

    vi.doMock("./libs/prisma/prisma", () => ({
      prisma: {
        $queryRaw: queryRawMock,
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

    await vi.waitFor(() => {
      expect(queryRawMock).toHaveBeenCalledTimes(1);
      expect(listenMock).toHaveBeenCalledWith("4123", expect.any(Function));
    });

    expect(dotenvConfigMock).toHaveBeenCalledWith({ path: ".env.local", quiet: true });
    expect(infoMock).toHaveBeenCalledWith("Server running on port http://localhost:4123");
    expect(infoMock).toHaveBeenCalledWith(
      `API documentation available at http://localhost:4123${PATHS.apiBaseV1}${PATHS.docs}`,
    );
  });

  it("exits when database health check fails", async () => {
    const listenMock = vi.fn();
    const queryRawMock = vi.fn().mockRejectedValue(new Error("db down"));
    const errorMock = vi.fn();
    const infoMock = vi.fn();
    const dotenvConfigMock = vi.fn();
    const exitMock = vi
      .spyOn(process, "exit")
      .mockImplementation(((_code?: string | number | null | undefined) => undefined) as never);

    vi.doMock("./app/app", () => ({
      default: {
        listen: listenMock,
      },
    }));

    vi.doMock("./libs/prisma/prisma", () => ({
      prisma: {
        $queryRaw: queryRawMock,
      },
    }));

    vi.doMock("./libs/logger/logger", () => ({
      logger: {
        info: infoMock,
        error: errorMock,
      },
    }));

    vi.doMock("dotenv", () => ({
      default: {
        config: dotenvConfigMock,
      },
    }));

    process.env["NODE_ENV"] = "development";

    await import("./server");

    await vi.waitFor(() => {
      expect(queryRawMock).toHaveBeenCalledTimes(1);
      expect(errorMock).toHaveBeenCalledWith(
        { err: expect.any(Error) },
        "Database health check failed during startup. Ensure migrations are applied.",
      );
      expect(exitMock).toHaveBeenCalledWith(1);
    });

    expect(listenMock).not.toHaveBeenCalled();
    expect(dotenvConfigMock).toHaveBeenCalledWith({ path: ".env.local", quiet: true });
  });
});
