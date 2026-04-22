type SupabaseFactorVerificationStatus = "verified" | "unverified";

type SupabaseFactorType = "totp" | "phone" | "webauthn";

type SupabaseFactor<
  Type extends SupabaseFactorType = SupabaseFactorType,
  Status extends SupabaseFactorVerificationStatus = SupabaseFactorVerificationStatus,
> = {
  id: string;
  friendly_name?: string;
  factor_type: Type;
  status: Status;

  created_at: string;
  updated_at: string;
  last_challenged_at?: string;
};

type SupabaseUserIdentity = {
  id: string;
  user_id: string;
  identity_data?: {
    [key: string]: unknown;
  };
  identity_id: string;
  provider: string;
  created_at?: string;
  last_sign_in_at?: string;
  updated_at?: string;
};

type SupabaseUserMetadata = {
  invite_id: string;
  organisation_id: string;
};

export type SupabaseUser = {
  id: string;
  app_metadata: Record<string, unknown>;
  user_metadata: SupabaseUserMetadata;
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  new_phone?: string;
  invited_at?: string;
  action_link?: string;
  email?: string;
  phone?: string;
  created_at: string;
  confirmed_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
  identities?: SupabaseUserIdentity[];
  is_anonymous?: boolean;
  is_sso_user?: boolean;
  factors?: (
    | SupabaseFactor<SupabaseFactorType, "verified">
    | SupabaseFactor<SupabaseFactorType, "unverified">
  )[];
  deleted_at?: string;
  banned_until?: string;
};
