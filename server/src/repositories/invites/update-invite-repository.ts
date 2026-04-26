import cleanDeep from "clean-deep";

import type { Prisma, PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";
import { type UpdateInvite } from "../../types/invites";
import { type RemoveUndefinedUtility } from "../../types/RemoveUndefinedUtility";

type UpdateInviteRepositoryInput = {
  tx?: PrismaClient | Prisma.TransactionClient;
  data: UpdateInvite;
};

export const updateInviteRepository = async ({
  tx = prisma,
  data,
}: UpdateInviteRepositoryInput) => {
  const { id, ...rest } = data;
  const cleaned: RemoveUndefinedUtility<Omit<UpdateInvite, "id">> = cleanDeep(rest, {
    undefinedValues: true,
  });

  return tx.invite.update({ where: { id }, data: cleaned });
};

export type UpdateInviteRepository = typeof updateInviteRepository;
