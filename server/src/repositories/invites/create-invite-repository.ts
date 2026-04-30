import { type CreateInvite } from "../../@types/invites";
import type { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";

type CreateInviteRepositoryInput = {
  inviteRepositoryPrismaClient?: PrismaClient["invite"];
  data: CreateInvite;
};

export const createInviteRepository = async ({
  inviteRepositoryPrismaClient = prisma.invite,
  data,
}: CreateInviteRepositoryInput) => inviteRepositoryPrismaClient.create({ data });

export type CreateInviteRepository = typeof createInviteRepository;
