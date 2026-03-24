import { randomUUID } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  createShiftBodySchema,
  createStaffBodySchema,
  shiftResponseBodySchema,
  swapManagerDecisionBodySchema,
  swapRequestBodySchema,
  swapTargetDecisionBodySchema,
  updateShiftBodySchema,
  updateStaffBodySchema,
} from "./schemas";

describe("shiftResponseBodySchema", () => {
  it("accepts confirmed", () => {
    expect(
      shiftResponseBodySchema.safeParse({ status: "confirmed" }).success,
    ).toBe(true);
  });
  it("accepts declined", () => {
    expect(
      shiftResponseBodySchema.safeParse({ status: "declined" }).success,
    ).toBe(true);
  });
  it("rejects invalid status", () => {
    expect(
      shiftResponseBodySchema.safeParse({ status: "pending" }).success,
    ).toBe(false);
  });
});

describe("swapRequestBodySchema", () => {
  it("accepts valid target_staff_id", () => {
    expect(
      swapRequestBodySchema.safeParse({ target_staff_id: randomUUID() })
        .success,
    ).toBe(true);
  });
  it("rejects missing target_staff_id", () => {
    expect(swapRequestBodySchema.safeParse({}).success).toBe(false);
  });
});

describe("swapTargetDecisionBodySchema", () => {
  it("accepts accept", () => {
    expect(
      swapTargetDecisionBodySchema.safeParse({ decision: "accept" }).success,
    ).toBe(true);
  });
  it("accepts reject", () => {
    expect(
      swapTargetDecisionBodySchema.safeParse({ decision: "reject" }).success,
    ).toBe(true);
  });
  it("rejects invalid decision", () => {
    expect(
      swapTargetDecisionBodySchema.safeParse({ decision: "approve" }).success,
    ).toBe(false);
  });
});

describe("swapManagerDecisionBodySchema", () => {
  it("accepts approve", () => {
    expect(
      swapManagerDecisionBodySchema.safeParse({ decision: "approve" }).success,
    ).toBe(true);
  });
  it("accepts reject", () => {
    expect(
      swapManagerDecisionBodySchema.safeParse({ decision: "reject" }).success,
    ).toBe(true);
  });
  it("rejects invalid decision", () => {
    expect(
      swapManagerDecisionBodySchema.safeParse({ decision: "accept" }).success,
    ).toBe(false);
  });
});

describe("createStaffBodySchema", () => {
  it("accepts valid payload", () => {
    expect(
      createStaffBodySchema.safeParse({
        name: "Alice",
        phone_number: "+441234567890",
      }).success,
    ).toBe(true);
  });
  it("rejects empty name", () => {
    expect(
      createStaffBodySchema.safeParse({
        name: "",
        phone_number: "+441234567890",
      }).success,
    ).toBe(false);
  });
  it("rejects missing phone_number", () => {
    expect(createStaffBodySchema.safeParse({ name: "Alice" }).success).toBe(
      false,
    );
  });
});

describe("updateStaffBodySchema", () => {
  it("accepts partial update with name only", () => {
    expect(updateStaffBodySchema.safeParse({ name: "Bob" }).success).toBe(true);
  });
  it("accepts partial update with phone_number only", () => {
    expect(
      updateStaffBodySchema.safeParse({ phone_number: "+441234567890" })
        .success,
    ).toBe(true);
  });
  it("rejects empty payload", () => {
    expect(updateStaffBodySchema.safeParse({}).success).toBe(false);
  });
});

describe("createShiftBodySchema", () => {
  it("accepts valid shift payload", () => {
    expect(
      createShiftBodySchema.safeParse({
        staff_id: randomUUID(),
        start_time: "2024-01-01T08:00:00Z",
        end_time: "2024-01-01T16:00:00Z",
      }).success,
    ).toBe(true);
  });
  it("rejects start_time after end_time", () => {
    expect(
      createShiftBodySchema.safeParse({
        staff_id: randomUUID(),
        start_time: "2024-01-01T16:00:00Z",
        end_time: "2024-01-01T08:00:00Z",
      }).success,
    ).toBe(false);
  });
  it("rejects non-UTC datetime", () => {
    expect(
      createShiftBodySchema.safeParse({
        staff_id: randomUUID(),
        start_time: "2024-01-01T08:00:00+01:00",
        end_time: "2024-01-01T16:00:00Z",
      }).success,
    ).toBe(false);
  });
});

describe("updateShiftBodySchema", () => {
  it("accepts partial update with start_time only", () => {
    expect(
      updateShiftBodySchema.safeParse({ start_time: "2024-01-01T08:00:00Z" })
        .success,
    ).toBe(true);
  });
  it("accepts valid time range update", () => {
    expect(
      updateShiftBodySchema.safeParse({
        start_time: "2024-01-01T08:00:00Z",
        end_time: "2024-01-01T16:00:00Z",
      }).success,
    ).toBe(true);
  });
  it("rejects empty payload", () => {
    expect(updateShiftBodySchema.safeParse({}).success).toBe(false);
  });
  it("rejects start_time after end_time", () => {
    expect(
      updateShiftBodySchema.safeParse({
        start_time: "2024-01-01T16:00:00Z",
        end_time: "2024-01-01T08:00:00Z",
      }).success,
    ).toBe(false);
  });
});
