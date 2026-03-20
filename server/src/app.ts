import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import {
  shiftsGetRouter,
  shiftsPostRouter,
} from "./modules/shifts/routes/routes";
import { openApiDocument } from "./docs/openapi";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/shifts", shiftsGetRouter);
app.use("/api/shifts", shiftsPostRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

export default app;
