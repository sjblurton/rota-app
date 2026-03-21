import z from "zod";

export const staffIdParamSchema = z.object({
  staff_id: z.string().describe("ID of the staff member"),
});

export const shiftIdParamSchema = z.object({
  shift_id: z.string().describe("ID of the shift"),
});

export const swapIdParamSchema = z.object({
  swap_id: z.string().describe("ID of the swap request"),
});
