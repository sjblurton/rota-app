import { timingSafeEqual } from "node:crypto";

import { type RequestHandler } from "express";

import { HttpErrorByCode } from "../../utils/http/HttpErrorByCode";

const isSuperadminKeyValid = (providedKey: string, expectedKey: string) => {
  const provided = Buffer.from(providedKey);
  const expected = Buffer.from(expectedKey);

  if (provided.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(provided, expected);
};

export const requireSuperadminApiKey: RequestHandler = (request, _response, next) => {
  const configuredKey = process.env["SUPERADMIN_API_KEY"];

  if (!configuredKey) {
    throw new HttpErrorByCode("internal_server_error", "Superadmin API key is not configured");
  }

  const providedKey = request.header("X-Superadmin-Key");

  if (!providedKey) {
    throw new HttpErrorByCode("unauthorised", "Superadmin API key is required");
  }

  if (!isSuperadminKeyValid(providedKey, configuredKey)) {
    throw new HttpErrorByCode("forbidden", "Invalid superadmin API key");
  }

  next();
};
