import type { Request, Response } from "express";

export type ExpressHandlerContext = {
  request: Request;
  response: Response;
};
