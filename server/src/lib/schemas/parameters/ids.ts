import z from "zod";

export const staffIdParamSchema = z.object({
  staffId: z.string().describe("ID of the staff member"),
});

export const shiftIdParamSchema = z.object({
  shiftId: z.string().describe("ID of the shift"),
});

export const swapIdParamSchema = z.object({
  swapId: z.string().describe("ID of the swap request"),
});
