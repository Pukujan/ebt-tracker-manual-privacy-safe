import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  copyTextToClipboard,
  getRangeSelection,
  serializeSelectedCells
} from "./rawTableSelection.v0.js";

const MODAL_COLUMNS = [
  { key: "caseName", label: "Case", get: (r) => r.caseName ?? "" },
  { key: "pca", label: "PCA", get: (r) => r.pca ?? "" },
  { key: "calendarCall", label: "Calendar Call", get: (r) => r.calendarCall ?? "" },
  { key: "cm", label: "CM", get: (r) => r.cm ?? "" },
  { key: "la", label: "LA", get: (r) => r.la ?? "" },
  { key: "ta", label: "TA", get: (r) => r.ta ?? "" },
  { key: "synopsys", label: "Synopsys", get: (r) => r.synopsysDisplay ?? "" },
  { key: "defs", label: "Defs", get: (r) => r.defs ?? "" },
  { key: "venue", label: "Venue", get: (r) => r.venue ?? "" },
  { key: "nextConf", label: "Next Conf", get: (r) => r.nextConf ?? "" },
  { key: "div", label: "Div", get: (r) => r.div ?? "" }
];

export function RawCaseModal({ open, onClose, projectedRows }) {
  const [selected, setSelected] = useState([]);
  const [anchor, setAnchor] = useState(null);

  const allCells = useMemo(() => {
    const cells = [];
    projectedRows.forEach((row, rowIndex) => {
      MODAL_COLUMNS.forEach((col) => {
        cells.push({
          row: rowIndex,
          col: col.key,
          value: String(col.get(row) ?? "")
        });
      });
    });
    return cells;
  }, [projectedRows]);

  useEffect(() => {
    if (!open) {
      setSelected([]);
      setAnchor(null);
    }
  }, [open]);

  const isSelected = useCallback(
    (row, col) => selected.some((c) => c.row === row && c.col === col),
    [selected]
  );

  const mergeUnique = useCallback((cells) => {
    const map = new Map();
    cells.forEach((c) => map.set(`${c.row}:${c.col}`, c));
    return Array.from(map.values());
  }, []);

  const handleCellMouseDown = useCallback(
    (e, cell) => {
      if (e.shiftKey && anchor && anchor.col === cell.col) {
        const range = getRangeSelection({
          startCell: anchor,
          endCell: cell,
          allCells
        });
        setSelected(range);
        return;
      }
      if (e.metaKey || e.ctrlKey) {
        setSelected((prev) => {
          const exists = prev.some((c) => c.row === cell.row && c.col === cell.col);
          if (exists) return prev.filter((c) => !(c.row === cell.row && c.col === cell.col));
          return mergeUnique([...prev, cell]);
        });
        return;
      }
      setAnchor(cell);
      setSelected([cell]);
    },
    [allCells, anchor, mergeUnique]
  );

  const copySelection = useCallback(async () => {
    const text = serializeSelectedCells(selected);
    await copyTextToClipboard(text);
  }, [selected]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "c" && selected.length) {
        e.preventDefault();
        copySelection();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, selected, copySelection]);

  if (!open) return null;

  return (
    <div className="ebt-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="ebt-modal ebt-modal--wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ebt-raw-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="ebt-modal-head">
          <h2 id="ebt-raw-modal-title">View Case — raw table</h2>
          <div className="ebt-modal-actions">
            <button type="button" className="ebt-btn" onClick={copySelection} disabled={!selected.length}>
              Copy selected cells
            </button>
            <button type="button" className="ebt-btn ebt-btn--ghost" onClick={onClose}>
              Close
            </button>
          </div>
        </header>
        <p className="ebt-modal-hint">
          Click a cell to select. Ctrl/Cmd-click to add. Shift-click extends the range in the same column.
          Ctrl/Cmd+C copies the current selection.
        </p>
        <div className="ebt-raw-wrap">
          <table className="ebt-table ebt-table--raw">
            <thead>
              <tr>
                {MODAL_COLUMNS.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projectedRows.map((row, rowIndex) => (
                <tr key={row.id ?? rowIndex}>
                  {MODAL_COLUMNS.map((col) => {
                    const cell = {
                      row: rowIndex,
                      col: col.key,
                      value: String(col.get(row) ?? "")
                    };
                    return (
                      <td
                        key={col.key}
                        className={isSelected(rowIndex, col.key) ? "ebt-cell-selected" : ""}
                        onMouseDown={(e) => handleCellMouseDown(e, cell)}
                      >
                        <div className="ebt-cell-inner">{cell.value}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
