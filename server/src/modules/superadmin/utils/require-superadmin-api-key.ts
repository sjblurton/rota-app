// moved from routes/utils/require-superadmin-api-key.ts
import type { NextFunction, Request, Response } from "express";

export function requireSuperadminApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-superadmin-api-key"];
  if (apiKey !== process.env["SUPERADMIN_API_KEY"]) {
    return res.status(401).json({ error: "Invalid superadmin API key" });
  }
  return next();
}
