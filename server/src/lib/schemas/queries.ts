import z from "zod";
import { shiftStatusEnum } from "./entities/shifts";
import { swapRequestStatusEnum } from "./entities/swapRequests";
import { entityTypeEnum } from "./entities/auditLogs";

export const timeRangeFilterSchema = z.object({
  start_time: z.iso
    .datetime()
    .optional()
    .describe("Filter records that start on or after this ISO datetime"),
  end_time: z.iso
    .datetime()
    .optional()
    .describe("Filter records that end on or before this ISO datetime"),
});

const commonShiftFiltersSchema = z.object({
  shift_id: z.string().optional().describe("Filter by a specific shift ID"),
  staff_id: z
    .string()
    .optional()
    .describe("Filter by the assigned staff member ID"),
});

export const shiftsListQuerySchema = z.object({
  ...timeRangeFilterSchema.shape,
  ...commonShiftFiltersSchema.shape,
  status: shiftStatusEnum.optional().describe("Filter by shift status"),
});

export const swapsListQuerySchema = z.object({
  ...timeRangeFilterSchema.shape,
  ...commonShiftFiltersSchema.shape,
  status: swapRequestStatusEnum
    .optional()
    .describe("Filter by swap request status"),
});

export const auditLogsFilterQuerySchema = z.object({
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
