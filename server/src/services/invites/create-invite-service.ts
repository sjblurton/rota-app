import { inviteSchema } from "../../libs/schemas/entities/invite";
import {
  type CreateInviteRepository,
  createInviteRepository,
} from "../../repositories/invites/create-invite-repository";
import { type CreateInvite } from "../../types/invites";
import { inviteUserByEmailService } from "./invite-user-by-email-service";

type CreateInviteServiceInput = {
  data: CreateInvite;
  createInvite?: CreateInviteRepository;
};

export const createInviteService = async ({
  data,
  createInvite = createInviteRepository,
}: CreateInviteServiceInput) => {
  const raw = await createInvite({ data });

  const parsedInvite = await inviteSchema.parseAsync(raw);

  await inviteUserByEmailService({ data: parsedInvite });

  return parsedInvite;
};
