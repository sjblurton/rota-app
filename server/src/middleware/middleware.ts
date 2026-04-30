import cors from "cors";
import express from "express";
import pinoHttp, { type PinoHttpOptions } from "pino-http";

import { logger } from "../libs/logger/logger";

export const applyMiddlewares = (app: express.Express, pinoHttpOptions?: PinoHttpOptions) => [
  app.use(pinoHttp({ logger, ...pinoHttpOptions })),
  app.use(cors()),
  app.use(express.json()),
];
