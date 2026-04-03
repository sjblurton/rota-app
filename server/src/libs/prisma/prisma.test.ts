import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const originalEnv = process.env;

describe("prisma initialisation", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("loads .env.test when NODE_ENV is test", async () => {
    const dotenvConfigMock = vi.fn();
    const requireEnvMock = vi.fn(() => "postgres://test-db");
    const adapterInstance = { adapter: true };
    const prismaInstance = { client: true };

    const prismaPgMock = vi.fn(function PrismaPgMock() {
      return adapterInstance;
    });
    const prismaClientMock = vi.fn(function PrismaClientMock() {
      return prismaInstance;
    });

    vi.doMock("dotenv", () => ({
      default: { config: dotenvConfigMock },
    }));
    vi.doMock("../../utils/env/requireEnv", () => ({
      requireEnv: requireEnvMock,
    }));
    vi.doMock("@prisma/adapter-pg", () => ({
      PrismaPg: prismaPgMock,
    }));
    vi.doMock("../../generated/prisma/client", () => ({
      PrismaClient: prismaClientMock,
    }));

    process.env["NODE_ENV"] = "test";

    const { prisma } = await import("./prisma");

    expect(dotenvConfigMock).toHaveBeenCalledWith({ path: ".env.test", quiet: true });
    expect(requireEnvMock).toHaveBeenCalledWith("DATABASE_URL");
    expect(prismaPgMock).toHaveBeenCalledWith({ connectionString: "postgres://test-db" });
    expect(prismaClientMock).toHaveBeenCalledWith({ adapter: adapterInstance });
    expect(prisma).toBe(prismaInstance);
  });

  it("loads .env.local when NODE_ENV is not test", async () => {
    const dotenvConfigMock = vi.fn();
    const requireEnvMock = vi.fn(() => "postgres://dev-db");
    const prismaPgMock = vi.fn(function PrismaPgMock() {
      return { adapter: true };
    });
    const prismaClientMock = vi.fn(function PrismaClientMock() {
      return { client: true };
    });

    vi.doMock("dotenv", () => ({
      default: { config: dotenvConfigMock },
    }));
    vi.doMock("../../utils/env/requireEnv", () => ({
      requireEnv: requireEnvMock,
    }));
    vi.doMock("@prisma/adapter-pg", () => ({
      PrismaPg: prismaPgMock,
    }));
    vi.doMock("../../generated/prisma/client", () => ({
      PrismaClient: prismaClientMock,
    }));

    process.env["NODE_ENV"] = "development";

    await import("./prisma");

    expect(dotenvConfigMock).toHaveBeenCalledWith({ path: ".env.local", quiet: true });
    expect(requireEnvMock).toHaveBeenCalledWith("DATABASE_URL");
    expect(prismaPgMock).toHaveBeenCalledWith({ connectionString: "postgres://dev-db" });
    expect(prismaClientMock).toHaveBeenCalledTimes(1);
  });
});
