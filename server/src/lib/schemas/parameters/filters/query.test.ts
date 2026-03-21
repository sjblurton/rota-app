import { describe, expect, it } from "vitest";
import {
  auditLogsFilterQuerySchema,
  shiftsListQuerySchema,
  staffListQuerySchema,
  swapsListQuerySchema,
  timeRangeFilterSchema,
} from "./query";

describe("timeRangeFilterSchema", () => {
  it("accepts empty object", () => {
    expect(timeRangeFilterSchema.safeParse({}).success).toBe(true);
  });

  it("accepts valid ISO 8601 UTC datetimes", () => {
    expect(
      timeRangeFilterSchema.safeParse({
        start_time: "2024-01-01T00:00:00Z",
        end_time: "2024-01-02T00:00:00Z",
      }).success,
    ).toBe(true);
  });

  it("rejects non-UTC datetime", () => {
    expect(
      timeRangeFilterSchema.safeParse({
        start_time: "2024-01-01T00:00:00+01:00",
      }).success,
    ).toBe(false);
  });
});

describe("staffListQuerySchema", () => {
  it("accepts empty query", () => {
    expect(staffListQuerySchema.safeParse({}).success).toBe(true);
  });

  it("accepts valid pagination", () => {
    expect(
      staffListQuerySchema.safeParse({ page_number: 1, page_size: 10 }).success,
    ).toBe(true);
  });

  it("rejects page_size over 100", () => {
    expect(staffListQuerySchema.safeParse({ page_size: 101 }).success).toBe(
      false,
    );
  });

  it("rejects page_number less than 1", () => {
    expect(staffListQuerySchema.safeParse({ page_number: 0 }).success).toBe(
      false,
    );
  });
});

describe("shiftsListQuerySchema", () => {
  it("accepts empty query", () => {
    expect(shiftsListQuerySchema.safeParse({}).success).toBe(true);
  });

  it("accepts a valid status filter", () => {
    expect(shiftsListQuerySchema.safeParse({ status: "pending" }).success).toBe(
      true,
    );
  });

  it("rejects an invalid status value", () => {
    expect(shiftsListQuerySchema.safeParse({ status: "unknown" }).success).toBe(
      false,
    );
  });
});

describe("swapsListQuerySchema", () => {
  it("accepts empty query", () => {
    expect(swapsListQuerySchema.safeParse({}).success).toBe(true);
  });

  it("accepts valid swap status filter", () => {
    expect(swapsListQuerySchema.safeParse({ status: "approved" }).success).toBe(
      true,
    );
  });

  it("rejects an invalid status value", () => {
    expect(swapsListQuerySchema.safeParse({ status: "unknown" }).success).toBe(
      false,
    );
  });
});

describe("auditLogsFilterQuerySchema", () => {
  it("accepts empty query", () => {
    expect(auditLogsFilterQuerySchema.safeParse({}).success).toBe(true);
  });

  it("accepts a valid entity_type", () => {
    expect(
      auditLogsFilterQuerySchema.safeParse({ entity_type: "shift" }).success,
    ).toBe(true);
  });

  it("rejects an invalid entity_type", () => {
    expect(
      auditLogsFilterQuerySchema.safeParse({ entity_type: "unknown" }).success,
    ).toBe(false);
  });
});
