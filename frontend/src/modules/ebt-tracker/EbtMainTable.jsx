import React from "react";
import { EbtWitnessRow } from "./EbtWitnessRow.jsx";

function sameCaseWitnessCount(witnesses, caseGroupId) {
  if (!caseGroupId) return 0;
  return witnesses.filter((w) => w.caseGroupId === caseGroupId).length;
}

export function EbtMainTable({
  viewMode,
  rows,
  witnesses,
  expandedIds,
  onToggleExpand,
  onViewCase,
  onOpenTrackDrawer
}) {
  if (viewMode === "date") {
    const colCount = 8;
    return (
      <div className="ebt-table-wrap">
        <table className="ebt-table">
          <thead>
            <tr>
              <th className="ebt-td-narrow" aria-label="Expand" />
              <th>Case</th>
              <th>Witness</th>
              <th>OOB</th>
              <th>Last FL/UP</th>
              <th>Possible Dates</th>
              <th>Firm Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <EbtWitnessRow
                key={row.id}
                row={row}
                viewMode="date"
                colCount={colCount}
                isExpanded={expandedIds.has(row.witness.id)}
                onToggleExpand={onToggleExpand}
                onViewCase={onViewCase}
                onOpenTrackDrawer={onOpenTrackDrawer}
                sameCaseWitnessCount={sameCaseWitnessCount(witnesses, row.caseGroup?.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (viewMode === "counsel") {
    return (
      <div className="ebt-table-wrap">
        <table className="ebt-table">
          <thead>
            <tr>
              <th>Case</th>
              <th>All Case Counsel / Last Reply</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <EbtWitnessRow
                key={row.id}
                row={row}
                viewMode="counsel"
                colCount={2}
                isExpanded={false}
                onToggleExpand={() => {}}
                onViewCase={onViewCase}
                onOpenTrackDrawer={onOpenTrackDrawer}
                sameCaseWitnessCount={0}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="ebt-table-wrap">
      <table className="ebt-table">
        <thead>
          <tr>
            <th>Case</th>
            <th>All Available / Unavailable Dates</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <EbtWitnessRow
              key={row.id}
              row={row}
              viewMode="matrix"
              colCount={2}
              isExpanded={false}
              onToggleExpand={() => {}}
              onViewCase={onViewCase}
              onOpenTrackDrawer={onOpenTrackDrawer}
              sameCaseWitnessCount={0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
