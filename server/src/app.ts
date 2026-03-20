import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { openApiDocument } from "./docs/openapi";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

export default app;
