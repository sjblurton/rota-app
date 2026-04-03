import type { PaginationOptions } from "../../../types/paginationOptions";

const DEFAULT_ORDER_BY_KEY = "created_at" as const;

export function getPrismaPaginationArgs({
  limit = 20,
  offset = 0,
  orderByKey = DEFAULT_ORDER_BY_KEY,
  direction = "desc",
}: PaginationOptions) {
  return {
    skip: offset,
    take: limit,
    orderBy: {
      [orderByKey]: direction,
    } as Record<string, "asc" | "desc">,
  };
}
