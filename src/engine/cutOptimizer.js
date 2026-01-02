export function optimizeCuts(sheet, parts) {
  let sheets = [];
  let expanded = [];

  parts.forEach(p => {
    for (let i = 0; i < p.qty; i++) {
      expanded.push({ width: p.width, height: p.length });
    }
  });

  expanded.sort((a, b) =>
    (b.width * b.height) - (a.width * a.height)
  );

  expanded.forEach(part => {
    let placed = false;

    for (let sheet of sheets) {
      for (let space of sheet.spaces) {
        if (part.width <= space.w && part.height <= space.h) {
          sheet.placements.push({
            x: space.x,
            y: space.y,
            w: part.width,
            h: part.height
          });

          sheet.spaces = sheet.spaces.filter(s => s !== space);
          sheet.spaces.push(
            { x: space.x + part.width, y: space.y, w: space.w - part.width, h: part.height },
            { x: space.x, y: space.y + part.height, w: space.w, h: space.h - part.height }
          );

          placed = true;
          break;
        }
      }
      if (placed) break;
    }

    if (!placed) {
      sheets.push({
        placements: [{ x: 0, y: 0, w: part.width, h: part.height }],
        spaces: [
          { x: part.width, y: 0, w: sheet.width - part.width, h: part.height },
          { x: 0, y: part.height, w: sheet.width, h: sheet.height - part.height }
        ]
      });
    }
  });

  return {
    sheetsRequired: sheets.length,
    layouts: sheets
  };
}
