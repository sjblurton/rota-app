import z from "zod";

export const shiftResponseBodySchema = z.object({
  status: z
    .enum(["confirmed", "declined"])
    .describe("Set the shift response status for this token"),
});

export const swapRequestBodySchema = z.object({
  target_staff_id: z.string().describe("Staff member selected for the swap"),
});

export const swapStatusUpdateBodySchema = z.object({
  status: z
    .enum(["accepted", "rejected"])
    .describe("Set the swap request status for this token"),
});
