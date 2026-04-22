import { supabase } from "../../libs/auth/supabase";
import { type Invite } from "../../types/invites";
import { requireEnv } from "../../utils/env/requireEnv";
import { HttpErrorByCode } from "../../utils/http/HttpErrorByCode";

type InviteUserByEmailServiceInput = {
  data: Invite;
};

export const inviteUserByEmailService = async ({ data }: InviteUserByEmailServiceInput) => {
  const { email, expires_at: expiresAt } = data;

  if (expiresAt < new Date()) {
    throw new HttpErrorByCode("bad_request", "Invite has already expired");
  }

  const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: {
      invite_id: data.id,
      organisation_id: data.organisation_id,
    },
    redirectTo: `${requireEnv("APP_URL")}/invite/${data.id}`,
  });

  if (error) {
    throw new HttpErrorByCode("internal_server_error", error.message);
  }
  return;
};
