import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export function createPaginationOptionsQuerySchema<
  const TOrderByKeys extends readonly [string, ...string[]],
>(orderByKeys: TOrderByKeys) {
  return z.object({
    limit: z.coerce.number().int().positive().max(100).optional(),
    offset: z.coerce.number().int().nonnegative().optional(),
    order_by_key: z.enum(orderByKeys).optional(),
    direction: z.enum(["asc", "desc"]).optional(),
  });
}
