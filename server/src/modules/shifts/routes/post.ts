import { Router } from "express";

const router = Router();

router.post("/:token/confirm", async (_req, res) => {
  res.status(204).send();
});

export default router;
