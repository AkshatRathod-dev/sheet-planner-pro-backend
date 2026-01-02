import express from "express";
import { optimizeCuts } from "../engine/cutOptimizer.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { sheet, parts } = req.body;
  const result = optimizeCuts(sheet, parts);
  res.json(result);
});

export default router;
