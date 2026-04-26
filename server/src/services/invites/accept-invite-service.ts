import { type UpdateInviteBody } from "../../types/invites";
import { HttpErrorByCode } from "../../utils/http/HttpErrorByCode";
import { type CreateUserService, createUserService } from "../transactions/create-user-service";
import { type GetInviteByIdService, getInviteByIdService } from "./get-invite-by-id-service";
import { type UpdateInviteService, updateInviteService } from "./update-invite-service";

type AcceptInvitesServiceInput = {
  updateInvite?: UpdateInviteService;
  createUser?: CreateUserService;
  getInviteById?: GetInviteByIdService;
  inviteId: string;
  supabaseUserId: string;
  body: UpdateInviteBody;
};

export const acceptInviteService = async ({
  updateInvite = updateInviteService,
  createUser = createUserService,
  getInviteById = getInviteByIdService,
  inviteId,
  supabaseUserId,
  body,
}: AcceptInvitesServiceInput) => {
  const invite = await getInviteById({ id: inviteId });

  if (invite.status === "accepted") {
    throw new HttpErrorByCode("conflict", "Invite has already been accepted");
  }

  if (invite.status === "revoked") {
    throw new HttpErrorByCode("conflict", "Invite has been revoked");
  }

  if (invite.status === "expired") {
    throw new HttpErrorByCode("conflict", "Invite has expired");
  }

  if (invite.expires_at < new Date()) {
    await updateInvite({
      data: {
        status: "expired",
        id: invite.id,
      },
    });
    throw new HttpErrorByCode("conflict", "Invite has expired");
  }

  const results = await createUser({
    userData: {
      email: invite.email,
      supabase_user_id: supabaseUserId,
      organisation_id: invite.organisation_id,
      role: invite.role,
      status: "active",
      name: null,
    },
    inviteData: {
      id: invite.id,
      status: body.status,
    },
  });

  return results;
};
