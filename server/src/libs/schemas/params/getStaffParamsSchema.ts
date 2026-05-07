import z from 'zod'

export const getStaffIdParamsSchema = z.object({
  staff_id: z.uuid().describe('Staff UUID'),
})
