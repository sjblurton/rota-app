import { describe, expect, it } from "vitest";

describe("Shifts API", () => {
  it("should return a link for a shift", async () => {
    const response = await fetch("http://localhost:3000/api/shifts/12345");
    const data = await response.json();
    expect(data).toHaveProperty("link");
  });

  it("should confirm a shift", async () => {
    const response = await fetch(
      "http://localhost:3000/api/shifts/12345/confirm",
      {
        method: "POST",
      },
    );
    expect(response.status).toBe(204);
  });
});
