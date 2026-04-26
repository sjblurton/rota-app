import {
  type GetInviteByIdRepository,
  getInviteByIdRepository,
} from "../../repositories/invites/get-invite-by-id-repository";
import { HttpErrorByCode } from "../../utils/http/HttpErrorByCode";

type GetInviteServiceInput = {
  getInviteById?: GetInviteByIdRepository;
  id: string;
};

export const getInviteByIdService = async ({
  getInviteById = getInviteByIdRepository,
  id,
}: GetInviteServiceInput) => {
  const invite = await getInviteById({ id });

  if (!invite) {
    throw new HttpErrorByCode("not_found", "Invite not found");
  }

  return invite;
};

export type GetInviteByIdService = typeof getInviteByIdService;
