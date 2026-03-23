import z from "zod";

export const STATUS_NAMES = {
  CONFIRMED: "confirmed",
  DECLINED: "declined",
  ACCEPT: "accept",
  REJECT: "reject",
  APPROVE: "approve",
  PENDING: "pending",
  SWAP_REQUESTED: "swap_requested",
  AWAITING_TARGET_RESPONSE: "awaiting_target_response",
  AWAITING_MANAGER_APPROVAL: "awaiting_manager_approval",
  APPROVED: "approved",
  REJECTED_BY_TARGET: "rejected_by_target",
  REJECTED_BY_MANAGER: "rejected_by_manager",
  EXPIRED: "expired",
} as const;

export const shiftStatusEnum = z.enum([
  STATUS_NAMES.CONFIRMED,
  STATUS_NAMES.DECLINED,
  STATUS_NAMES.PENDING,
  STATUS_NAMES.SWAP_REQUESTED,
]);

export const swapRequestStatusEnum = z.enum([
  STATUS_NAMES.AWAITING_TARGET_RESPONSE,
  STATUS_NAMES.AWAITING_MANAGER_APPROVAL,
  STATUS_NAMES.APPROVED,
  STATUS_NAMES.REJECTED_BY_TARGET,
  STATUS_NAMES.REJECTED_BY_MANAGER,
  STATUS_NAMES.EXPIRED,
]);
