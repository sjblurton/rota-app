import z from "zod";

import { acceptInviteBodySchema } from "../../libs/schemas/entities/invite";
import { acceptInviteService } from "../../services/invites/accept-invite-service";
import { type ExpressHandlerContext } from "../../types/http";
import { HttpErrorByCode } from "../../utils/http/HttpErrorByCode";

export const patchInvitesController = async ({ request, response }: ExpressHandlerContext) => {
  const params = z.object({ id: z.uuid() }).safeParse(request.params);
  const body = acceptInviteBodySchema.safeParse(request.body);
  const user = request.superbaseUser;

  if (!user) {
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

  const results = await acceptInviteService({
    supabaseUserId: user.id,
    inviteId: params.data.id,
    body: body.data,
  });

  response.status(200).json(results);
};
