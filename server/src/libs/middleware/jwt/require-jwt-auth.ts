import { type RequestHandler } from "express";

import { type SupabaseUser } from "../../../types/supabase_user";
import { HttpErrorByCode } from "../../../utils/http/HttpErrorByCode";
import { supabase } from "../../auth/supabase";

export const requireJwtAuth: RequestHandler = async (request, _response, next) => {
  const auth = request.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    throw new HttpErrorByCode("unauthorised", "Missing token");
  }

  const token = auth.split(" ")[1];

  if (!token) {
    throw new HttpErrorByCode("unauthorised", "Missing token");
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    throw new HttpErrorByCode("unauthorised", "Invalid token");
  }

  request.superbaseUser = user as SupabaseUser;

  next();
};
