import z from "zod";

import { acceptInviteBodySchema } from "../../libs/schemas/entities/invite";
import {
  type AcceptInviteService,
  acceptInviteService,
} from "../../services/invites/accept-invite-service";
import { type ExpressHandlerContext } from "../../types/http";
import { HttpErrorByCode } from "../../utils/http/HttpErrorByCode";

type PatchInvitesControllerInput = {
  acceptInvite?: AcceptInviteService;
} & ExpressHandlerContext;

export const patchInvitesController = async ({
  request,
  response,
  acceptInvite = acceptInviteService,
}: PatchInvitesControllerInput) => {
  const params = z.object({ invite_id: z.uuid() }).safeParse(request.params);
  const body = acceptInviteBodySchema.safeParse(request.body);
  const user = request.superbaseUser;
  // DEBUG: Log user value
  // eslint-disable-next-line no-console
  console.log("[patchInvitesController] user:", user);

  if (!user) {
    // DEBUG: Log before throwing
    // eslint-disable-next-line no-console
    console.log("[patchInvitesController] Throwing unauthorised error");
    throw new HttpErrorByCode("unauthorised", "Authentication required");
  }

  if (!params.success) {
    throw new HttpErrorByCode("bad_request", "Invalid invite ID");
  }

  if (!body.success) {
    throw new HttpErrorByCode(
      "bad_request",
      "Invalid request body, Only 'accepted' status is allowed",
    );
  }

  const results = await acceptInvite({
    supabaseUserId: user.id,
    inviteId: params.data.invite_id,
    body: body.data,
  });

  response.status(200).json(results);
};
