import { Router } from "express";

const router = Router();

router.get("/:token", async (req, res) => {
  const { token } = req.params;

  res.json({ link: `https://rota-app.com/shifts/${token}` });
});

export default router;
