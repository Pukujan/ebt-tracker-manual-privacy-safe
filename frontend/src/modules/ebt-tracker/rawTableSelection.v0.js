// rawTableSelection.v0.js
// Spreadsheet-like cell selection and copying helper logic.
// Use inside RawCaseModal.jsx or adapt to React state.

export function serializeSelectedCells(selectedCells) {
  if (!selectedCells?.length) return "";

  const sorted = selectedCells.slice().sort((a, b) => {
    if (a.row !== b.row) return a.row - b.row;
    return a.col.localeCompare(b.col);
  });

  const cols = Array.from(new Set(sorted.map((item) => item.col)));
  const rows = Array.from(new Set(sorted.map((item) => item.row)));

  if (cols.length === 1) {
    return sorted.map((item) => item.value).join("\n");
  }

  return rows
    .map((row) =>
      cols
        .map((col) => {
          const found = sorted.find((item) => item.row === row && item.col === col);
          return found ? found.value : "";
        })
        .join("\t")
    )
    .join("\n");
}

export async function copyTextToClipboard(text) {
  if (!text) return;

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export function getRangeSelection({ startCell, endCell, allCells }) {
  if (!startCell || !endCell || startCell.col !== endCell.col) {
    return [endCell].filter(Boolean);
  }

  const start = Math.min(startCell.row, endCell.row);
  const end = Math.max(startCell.row, endCell.row);

  return allCells.filter(
    (cell) => cell.col === startCell.col && cell.row >= start && cell.row <= end
  );
}
