import ExcelJS from "exceljs";

export async function generateExcel(project, result, res) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Summary");

  sheet.addRows([
    ["Project", project.name],
    ["Sheets Required", result.sheetsRequired]
  ]);

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${project.name}.xlsx`
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  await workbook.xlsx.write(res);
  res.end();
}
