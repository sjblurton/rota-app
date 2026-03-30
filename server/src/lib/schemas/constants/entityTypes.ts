import { z } from "zod";

export const ENTITY_TYPES = {
  STAFF: "staff",
  SHIFT: "shift",
  SWAP: "swap",
  MANAGER: "manager",
} as const;

export const entityTypeEnum = z.enum(Object.values(ENTITY_TYPES));
