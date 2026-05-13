import React, { useCallback, useMemo, useState } from "react";
import {
  caseGroups,
  caseParties,
  ebtWitnesses as seedWitnesses,
  followUpLogs,
  rawCaseRows,
  witnessAvailability
} from "./ebtAvailabilityMockData.v0.js";
import {
  buildDashboardRows,
  buildRawCaseRowsForModal,
  enforceAtLeastOneTracked
} from "./ebtAvailabilityProjection.v0.js";
import { EbtMainTable } from "./EbtMainTable.jsx";
import { RawCaseModal } from "./RawCaseModal.jsx";
import { TrackWitnessDrawer } from "./TrackWitnessDrawer.jsx";
import "./ebt-tracker.css";

const VIEWS = [
  { value: "date", label: "Date Tracking View" },
  { value: "counsel", label: "Counsel Reply View" },
  { value: "matrix", label: "Availability Matrix View" }
];

function cloneWitnesses(list) {
  return list.map((w) => ({ ...w }));
}

export default function EbtAvailabilityDashboard() {
  const [witnesses, setWitnesses] = useState(() => cloneWitnesses(seedWitnesses));
  const [viewMode, setViewMode] = useState("date");
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const [modalCaseId, setModalCaseId] = useState(null);
  const [drawerCaseId, setDrawerCaseId] = useState(null);
  const [trackingMessage, setTrackingMessage] = useState("");

  const rows = useMemo(
    () =>
      buildDashboardRows({
        caseGroups,
        ebtWitnesses: witnesses,
        caseParties,
        witnessAvailability,
        followUpLogs
      }),
    [witnesses]
  );

  const projectedRows = useMemo(() => {
    if (!modalCaseId) return [];
    return buildRawCaseRowsForModal(rawCaseRows, witnesses, modalCaseId);
  }, [modalCaseId, witnesses]);

  const onToggleExpand = useCallback((witnessId) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(witnessId)) next.delete(witnessId);
      else next.add(witnessId);
      return next;
    });
  }, []);

  const onViewCase = useCallback((caseGroupId) => {
    if (caseGroupId) setModalCaseId(caseGroupId);
  }, []);

  const onOpenTrackDrawer = useCallback((caseGroupId) => {
    if (caseGroupId) setDrawerCaseId(caseGroupId);
  }, []);

  const onToggleTracked = useCallback((witnessId, checked) => {
    setWitnesses((prev) => {
      const next = prev.map((w) =>
        w.id === witnessId
          ? {
              ...w,
              isTracked: checked,
              trackingStatus: checked ? "Tracked" : "Available To Track"
            }
          : w
      );
      const caseGroupId = next.find((w) => w.id === witnessId)?.caseGroupId;
      if (!caseGroupId) return next;
      const result = enforceAtLeastOneTracked(next, caseGroupId);
      if (!result.ok) {
        setTrackingMessage(result.message);
        window.setTimeout(() => setTrackingMessage(""), 4000);
      } else {
        setTrackingMessage("");
      }
      return result.witnesses;
    });
  }, []);

  return (
    <div className="ebt-dash">
      <div className="ebt-view-bar">
        <label htmlFor="ebt-view-select">
          View
          <select
            id="ebt-view-select"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            {VIEWS.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <EbtMainTable
        viewMode={viewMode}
        rows={rows}
        witnesses={witnesses}
        expandedIds={expandedIds}
        onToggleExpand={onToggleExpand}
        onViewCase={onViewCase}
        onOpenTrackDrawer={onOpenTrackDrawer}
      />

      <RawCaseModal
        open={!!modalCaseId}
        onClose={() => setModalCaseId(null)}
        projectedRows={projectedRows}
      />

      <TrackWitnessDrawer
        open={!!drawerCaseId}
        caseGroupId={drawerCaseId}
        witnesses={witnesses}
        onClose={() => setDrawerCaseId(null)}
        onToggleTracked={onToggleTracked}
        trackingMessage={trackingMessage}
      />
    </div>
  );
}
