import cors from "cors";
import express from "express";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";

import { PATHS } from "./constants/paths";
import { openApiDocument } from "./docs/openapi";
import { logger } from "./libs/logger/logger";
import { superadminRouter } from "./routes/superadmin/superadmin-router";
import { HttpErrorByCode } from "./utils/http/HttpErrorByCode";

const app = express();

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());

app.use(`${PATHS.apiBaseV1}${PATHS.superadmin}`, superadminRouter);

app.use(`${PATHS.apiBaseV1}${PATHS.docs}`, swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use(
  (err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error(err);
    if (err instanceof HttpErrorByCode) {
      res.status(err.status).json({
        code: err.code,
        message: err.message,
        detail: err.detail,
      });
      return;
    }
    res.status(500).json({
      code: "internal_server_error",
      message: err instanceof Error ? err.message : "Internal Server Error",
    });
  },
);

export default app;
