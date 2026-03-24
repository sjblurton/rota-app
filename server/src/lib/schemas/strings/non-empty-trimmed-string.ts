import z from "zod";

export const nonEmptyTrimmedStringSchema = z.string().trim().nonempty().max(150);
