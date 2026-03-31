import cors from "cors";
import express from "express";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";

import { openApiDocument } from "./docs/openapi";
import { logger } from "./lib/logger";
import { managersRouter } from "./routes/managers/managers-router";
import { organisationsRouter } from "./routes/organisations/organisations-router";

const app = express();

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());

app.use("/api/superadmin/organisations", organisationsRouter);
app.use("/api/superadmin/organisations/:organisation_id/managers", managersRouter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

export default app;
