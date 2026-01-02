import PDFDocument from "pdfkit";

export function generatePDF(project, result, res) {
  const doc = new PDFDocument({ margin: 40 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${project.name}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(20).text("Sheet Planner Pro", { align: "center" });
  doc.moveDown();

  doc.text(`Project: ${project.name}`);
  doc.text(`Sheets Required: ${result.sheetsRequired}`);
  doc.moveDown();

  project.parts.forEach(p => {
    doc.text(`${p.name} ${p.length}x${p.width} (Qty ${p.qty})`);
  });

  doc.end();
}
