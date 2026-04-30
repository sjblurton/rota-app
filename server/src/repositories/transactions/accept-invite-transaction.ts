import { type UpdateInvite } from "../../@types/invites";
import { type CreateUserInput } from "../../@types/user";
import { type PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";
import { updateInviteRepository } from "../invites/update-invite-repository";
import { type CreateUserRepository, createUserRepository } from "../users/create-user-repository";

type AcceptInviteTransactionInput = {
  userData: CreateUserInput;
  inviteUpdateData: UpdateInvite;
  prismaClient?: PrismaClient;
  createUser?: CreateUserRepository;
};

export const acceptInviteTransaction = ({
  userData,
  inviteUpdateData,
  prismaClient = prisma,
  createUser = createUserRepository,
}: AcceptInviteTransactionInput) => {
  return prismaClient.$transaction(async (tx) => {
    const newUser = await createUser({ data: userData, tx });
    const updatedInvite = await updateInviteRepository({ data: inviteUpdateData, tx });

    return { invite: updatedInvite, user: newUser };
  });
};

export type AcceptInviteTransaction = typeof acceptInviteTransaction;
