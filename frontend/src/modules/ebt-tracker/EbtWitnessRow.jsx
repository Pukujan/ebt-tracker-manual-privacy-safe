import React from "react";
import { Badge } from "./Badge.jsx";
import { CounselReplyCell } from "./CounselReplyCell.jsx";
import { AvailabilityMatrixCell } from "./AvailabilityMatrixCell.jsx";

function fmtDates(arr) {
  if (!arr?.length) return "—";
  return arr.join(", ");
}

function lastFlUp(row) {
  if (row.lastFollowUp?.followUpDate) return row.lastFollowUp.followUpDate;
  if (row.witness.lastFollowUpDate) return row.witness.lastFollowUpDate;
  return "—";
}

export function EbtWitnessRow({
  row,
  viewMode,
  colCount,
  isExpanded,
  onToggleExpand,
  onViewCase,
  onOpenTrackDrawer,
  sameCaseWitnessCount
}) {
  const { caseGroup, witness, parties, availability } = row;
  const caseTitle = caseGroup?.caseName ?? "—";

  return (
    <>
      <tr className="ebt-row">
        {viewMode === "date" ? (
          <>
            <td className="ebt-td-narrow">
              <button
                type="button"
                className="ebt-expand"
                aria-expanded={isExpanded}
                onClick={() => onToggleExpand(witness.id)}
              >
                {isExpanded ? "▼" : "▶"}
              </button>
            </td>
            <td>{caseTitle}</td>
            <td>{witness.witnessName}</td>
            <td>{witness.oobDate ?? (witness.completedDate ? "Done" : "—")}</td>
            <td>{lastFlUp(row)}</td>
            <td className="ebt-td-dates">{fmtDates(witness.possibleDates)}</td>
            <td>{witness.firmDate ?? "—"}</td>
            <td className="ebt-td-actions">
              <button type="button" className="ebt-btn ebt-btn--small" disabled title="Placeholder">
                Send FL/UP
              </button>
              <button type="button" className="ebt-btn ebt-btn--small ebt-btn--ghost" onClick={() => onViewCase(caseGroup?.id)}>
                View Case
              </button>
            </td>
          </>
        ) : null}

        {viewMode === "counsel" ? (
          <>
            <td>
              <div className="ebt-case-stack">
                <div className="ebt-case-title">{caseTitle}</div>
                <div className="ebt-case-sub">{witness.witnessName}</div>
              </div>
            </td>
            <td>
              <CounselReplyCell parties={parties} />
            </td>
          </>
        ) : null}

        {viewMode === "matrix" ? (
          <>
            <td>
              <div className="ebt-case-stack">
                <div className="ebt-case-title">{caseTitle}</div>
                <div className="ebt-case-sub">{witness.witnessName}</div>
              </div>
            </td>
            <td>
              <AvailabilityMatrixCell availability={availability} parties={parties} />
            </td>
          </>
        ) : null}
      </tr>

      {isExpanded && viewMode === "date" ? (
        <tr className="ebt-row-expanded">
          <td colSpan={colCount}>
            <div className="ebt-expanded">
              {availability.map((a) => {
                const party = parties.find((p) => p.id === a.partyId);
                return (
                  <div key={a.id} className="ebt-expanded-block">
                    <div className="ebt-expanded-party">{party?.label ?? a.partyId}</div>
                    {a.availableDates?.length ? (
                      <div className="ebt-expanded-line">
                        <span className="ebt-expanded-label">Available</span>
                        {a.availableDates.map((d) => (
                          <Badge key={d} tone="avail">
                            {d}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                    {a.unavailableDates?.length ? (
                      <div className="ebt-expanded-line">
                        <span className="ebt-expanded-label">Unavailable</span>
                        {a.unavailableDates.map((d) => (
                          <Badge key={d} tone="unavail">
                            {d}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <div className="ebt-expanded-actions">
                <button type="button" className="ebt-btn ebt-btn--small" onClick={() => onOpenTrackDrawer(caseGroup?.id)}>
                  Track same-case witnesses ({sameCaseWitnessCount})
                </button>
              </div>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}
