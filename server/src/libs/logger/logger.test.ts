import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const originalEnv = process.env;

describe("logger", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("uses pretty transport when not in production", async () => {
    const pinoMock = vi.fn(() => ({ info: vi.fn() }));

    vi.doMock("pino", () => ({
      default: pinoMock,
    }));

    process.env["NODE_ENV"] = "development";
    delete process.env["LOG_LEVEL"];

    await import("./logger");

    expect(pinoMock).toHaveBeenCalledWith({
      level: "info",
      transport: {
        target: "pino-pretty",
        options: { colorize: true },
      },
    });
  });

  it("omits pretty transport in production and honours LOG_LEVEL", async () => {
    const pinoMock = vi.fn(() => ({ info: vi.fn() }));

    vi.doMock("pino", () => ({
      default: pinoMock,
    }));

    process.env["NODE_ENV"] = "production";
    process.env["LOG_LEVEL"] = "debug";

    await import("./logger");

    expect(pinoMock).toHaveBeenCalledWith({
      level: "debug",
    });
  });
});
