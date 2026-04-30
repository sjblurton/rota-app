import { type IncomingMessage, type ServerResponse } from 'node:http'

import cors from 'cors'
import express from 'express'
import { type Logger } from 'pino'
import pinoHttp from 'pino-http'

import { logger } from '../libs/logger/logger'

type PinoHttpOptions = {
  logger?: Logger
  customProps?: ((req: IncomingMessage, res: ServerResponse) => object) | undefined
}

export const applyMiddlewares = (app: express.Express, pinoHttpOptions?: PinoHttpOptions) => [
  app.use(pinoHttp({ logger, ...pinoHttpOptions })),
  app.use(cors()),
  app.use(express.json()),
]
