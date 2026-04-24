import type z from "zod";

import { type createUserSchema, type userSchema } from "../libs/schemas/entities/user";

export type User = z.infer<typeof userSchema>;

export type CreateUserInput = z.infer<typeof createUserSchema>;
