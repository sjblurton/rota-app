import { describe, expect, it } from "vitest";

import { requireEnv } from "./requireEnv";

describe("requireEnv", () => {
  it("returns the value of an existing environment variable", () => {
    process.env["TEST_ENV_VAR"] = "test-value";
    const result = requireEnv("TEST_ENV_VAR");
    expect(result).toBe("test-value");
  });

  it("throws an error if the environment variable is not set", () => {
    delete process.env["TEST_ENV_VAR"];
    expect(() => requireEnv("TEST_ENV_VAR")).toThrow(
      "Environment variable TEST_ENV_VAR is not set",
    );
  });
});
