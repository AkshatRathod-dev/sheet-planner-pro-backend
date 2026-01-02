import express from "express";
import { generatePDF } from "../exports/pdfExporter.js";
import { generateExcel } from "../exports/excelExporter.js";

const router = express.Router();

router.post("/pdf", (req, res) => {
  const { project, result } = req.body;
  generatePDF(project, result, res);
});

router.post("/excel", async (req, res) => {
  const { project, result } = req.body;
  await generateExcel(project, result, res);
});

export default router;
