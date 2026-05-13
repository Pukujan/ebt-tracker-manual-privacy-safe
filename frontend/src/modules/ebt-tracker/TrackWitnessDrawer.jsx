import React from "react";

function oobLabel(witness) {
  if (witness.completedDate) return "Done";
  if (witness.oobDate) return witness.oobDate;
  return "TBD";
}

export function TrackWitnessDrawer({
  open,
  caseGroupId,
  witnesses,
  onClose,
  onToggleTracked,
  trackingMessage
}) {
  if (!open || !caseGroupId) return null;

  const caseWitnesses = witnesses.filter((w) => w.caseGroupId === caseGroupId);

  return (
    <div className="ebt-drawer-overlay" role="presentation" onClick={onClose}>
      <aside
        className="ebt-drawer"
        role="dialog"
        aria-label="Track witnesses"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="ebt-drawer-head">
          <h3 className="ebt-drawer-title">Same-case witnesses</h3>
          <button type="button" className="ebt-btn ebt-btn--ghost" onClick={onClose}>
            Close
          </button>
        </header>
        {trackingMessage ? <p className="ebt-drawer-msg">{trackingMessage}</p> : null}
        <ul className="ebt-drawer-list">
          {caseWitnesses.map((w) => (
            <li key={w.id} className="ebt-drawer-row">
              <label className="ebt-drawer-label">
                <input
                  type="checkbox"
                  checked={!!w.isTracked}
                  onChange={(e) => onToggleTracked(w.id, e.target.checked)}
                />
                <span className="ebt-drawer-name">{w.witnessName}</span>
                <span className="ebt-drawer-oob">{oobLabel(w)}</span>
              </label>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
