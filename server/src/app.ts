import cors from "cors";
import express from "express";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";

import { openApiDocument } from "./docs/openapi";
import { logger } from "./libs/logger/logger";
import { superadminRouter } from "./routes/superadmin/superadmin-router";

const app = express();

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());

app.use("/api/v1/superadmin", superadminRouter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

export default app;
