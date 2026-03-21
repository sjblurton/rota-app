import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { openApiDocument } from "./docs/openapi";
import { superadminRouter } from "./modules/superadmin/routes/superadmin-router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/superadmin", superadminRouter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

export default app;
