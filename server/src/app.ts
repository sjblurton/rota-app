import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";

import { openApiDocument } from "./docs/openapi";
import { logger } from "./lib/logger";
import { superadminRouter } from "./modules/superadmin/routes/superadmin-router";

const app = express();

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());

app.use("/api/superadmin", superadminRouter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

export default app;
