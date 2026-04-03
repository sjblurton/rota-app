import express from "express";

const organisationsRouter = express.Router();

organisationsRouter.post("/", (_req, res) => {
  return res.status(200).send();
});

export { organisationsRouter };
