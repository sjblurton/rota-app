import { timingSafeEqual } from "node:crypto";

import { type RequestHandler } from "express";

const isSuperadminKeyValid = (providedKey: string, expectedKey: string) => {
  const provided = Buffer.from(providedKey);
  const expected = Buffer.from(expectedKey);

  if (provided.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(provided, expected);
};

export const requireSuperadminApiKey: RequestHandler = (request, response, next) => {
  const configuredKey = process.env["SUPERADMIN_API_KEY"];

  if (!configuredKey) {
    response.status(500).json({ message: "Superadmin API key is not configured" });
    return;
  }

  const providedKey = request.header("X-Superadmin-Key");

  if (!providedKey || !isSuperadminKeyValid(providedKey, configuredKey)) {
    response.status(401).json({ message: "Invalid superadmin API key" });
    return;
  }

  next();
};
