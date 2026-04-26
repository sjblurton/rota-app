import type { Prisma, PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";
import type { CreateUserInput } from "../../types/user";

type CreateUserRepositoryInput = {
  tx?: PrismaClient | Prisma.TransactionClient;
  data: CreateUserInput;
};

export const createUserRepository = async ({ tx = prisma, data }: CreateUserRepositoryInput) =>
  tx.user.create({ data });

export type CreateUserRepository = typeof createUserRepository;
