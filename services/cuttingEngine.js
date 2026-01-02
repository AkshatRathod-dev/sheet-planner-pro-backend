function calculateSheets(project) {
  const sheetW = project.sheet.width;
  const sheetH = project.sheet.height;

  // Expand quantities
  let parts = [];
  project.parts.forEach((p) => {
    for (let i = 0; i < p.qty; i++) {
      parts.push({ ...p });
    }
  });

  // Sort by area (big first)
  parts.sort(
    (a, b) =>
      b.length * b.breadth - a.length * a.breadth
  );

  let sheets = [];

  parts.forEach((part) => {
    let placed = false;

    for (const sheet of sheets) {
      if (
        tryPlace(sheet, part, false) ||
        (part.rotatable && tryPlace(sheet, part, true))
      ) {
        placed = true;
        break;
      }
    }

    if (!placed) {
      const newSheet = {
        usedArea: 0,
        freeArea: sheetW * sheetH,
        parts: [],
      };

      tryPlace(newSheet, part, false);
      sheets.push(newSheet);
    }
  });

  const totalUsed = sheets.reduce(
    (sum, s) => sum + s.usedArea,
    0
  );

  const totalArea = sheets.length * sheetW * sheetH;

  return {
    sheetsRequired: sheets.length,
    efficiency: Math.round((totalUsed / totalArea) * 100),
    waste: Math.round(
      (1 - totalUsed / totalArea) * 100
    ),
    sheets,
  };
}

function tryPlace(sheet, part, rotated) {
  const w = rotated ? part.breadth : part.length;
  const h = rotated ? part.length : part.breadth;
  const area = w * h;

  if (area <= sheet.freeArea) {
    sheet.parts.push({
      name: part.name,
      width: w,
      height: h,
      rotated,
    });
    sheet.usedArea += area;
    sheet.freeArea -= area;
    return true;
  }
  return false;
}

module.exports = { calculateSheets };
