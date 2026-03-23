import z from "zod";
import { utcDateTimeSchema } from "../../time/dateTime";
import { entityTypeEnum } from "../../constants/entityTypes";
import { shiftStatusEnum, swapRequestStatusEnum } from "../../constants/status";

const timeDescription = (type: "start_time" | "end_time") =>
  `Filter records that ${type === "start_time" ? "start on or after" : "end on or before"} this ISO 8601 UTC datetime (e.g. 2024-01-01T00:00:00Z)`;

export const timeRangeFilterSchema = z.object({
  start_time: utcDateTimeSchema
    .optional()
    .describe(timeDescription("start_time")),
  end_time: utcDateTimeSchema.optional().describe(timeDescription("end_time")),
});

const paginationQuerySchema = z.object({
  page_number: z.coerce
    .number()
    .int()
    .min(1)
    .optional()
    .describe("1-based page number for paginated results"),
  page_size: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .optional()
    .describe("Number of records to return per page (maximum 100)"),
});

export const staffListQuerySchema = z.object({
  ...paginationQuerySchema.shape,
});

const commonShiftFiltersSchema = z.object({
  shift_id: z.string().optional().describe("Filter by a specific shift ID"),
  staff_id: z
    .string()
    .optional()
    .describe("Filter by the assigned staff member ID"),
});

export const shiftsListQuerySchema = z.object({
  ...paginationQuerySchema.shape,
  ...timeRangeFilterSchema.shape,
  ...commonShiftFiltersSchema.shape,
  status: shiftStatusEnum.optional().describe("Filter by shift status"),
});

export const swapsListQuerySchema = z.object({
  ...paginationQuerySchema.shape,
  ...timeRangeFilterSchema.shape,
  ...commonShiftFiltersSchema.shape,
  status: swapRequestStatusEnum
    .optional()
    .describe("Filter by swap request status"),
});

export const auditLogsFilterQuerySchema = z.object({
  ...paginationQuerySchema.shape,
  ...timeRangeFilterSchema.shape,
  entity_type: entityTypeEnum
    .optional()
    .describe("Filter by entity type (shift, staff, manager, swap)"),
  entity_id: z.string().optional().describe("Filter by entity ID"),
  performed_by: z
    .string()
    .optional()
    .describe("Filter by the staff member who performed the action"),
  action: z.string().optional().describe("Filter by action type"),
});
