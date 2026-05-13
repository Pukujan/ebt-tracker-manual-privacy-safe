import React from "react";
import { Badge } from "./Badge.jsx";

export function AvailabilityMatrixCell({ availability, parties }) {
  if (!availability?.length) {
    return <span className="ebt-muted">—</span>;
  }

  const partyMap = new Map((parties || []).map((p) => [p.id, p.label]));

  return (
    <div className="ebt-matrix-stack">
      {availability.map((a) => (
        <div key={a.id} className="ebt-matrix-party">
          <div className="ebt-matrix-party-label">{partyMap.get(a.partyId) || a.partyId}</div>
          <div className="ebt-matrix-dates">
            {a.availableDates?.length ? (
              <div className="ebt-matrix-row">
                <span className="ebt-matrix-tag">Avail</span>
                {a.availableDates.map((d) => (
                  <Badge key={d} tone="avail">
                    {d}
                  </Badge>
                ))}
              </div>
            ) : null}
            {a.unavailableDates?.length ? (
              <div className="ebt-matrix-row">
                <span className="ebt-matrix-tag">Unavail</span>
                {a.unavailableDates.map((d) => (
                  <Badge key={d} tone="unavail">
                    {d}
                  </Badge>
                ))}
              </div>
            ) : null}
            {!a.availableDates?.length && !a.unavailableDates?.length ? (
              <span className="ebt-muted">No dates</span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
