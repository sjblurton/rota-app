import { type PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";
import { updateInviteSchema } from "../../libs/schemas/entities/invite";
import {
  type UpdateInviteRepository,
  updateInviteRepository,
} from "../../repositories/invites/update-invite-repository";
import { type UpdateInvite } from "../../types/invites";

type UpdateInviteServiceInput = {
  updateInvite?: UpdateInviteRepository;
  data: UpdateInvite;
  tx?: PrismaClient;
};

export const updateInviteService = async ({
  updateInvite = updateInviteRepository,
  data,
  tx = prisma,
}: UpdateInviteServiceInput) => {
  const parsedData = updateInviteSchema.parse(data);

  const invite = await updateInvite({ data: parsedData, tx });

  return invite;
};

export type UpdateInviteService = typeof updateInviteService;
