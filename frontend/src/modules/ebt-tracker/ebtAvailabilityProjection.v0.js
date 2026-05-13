// ebtAvailabilityProjection.v0.js
// Pure frontend helper functions for deriving table views from the V0 model.

export function getCaseGroup(caseGroups, caseGroupId) {
  return caseGroups.find((c) => c.id === caseGroupId) || null;
}

export function getWitnessesForCase(ebtWitnesses, caseGroupId) {
  return ebtWitnesses.filter((w) => w.caseGroupId === caseGroupId);
}

export function getPartiesForCase(caseParties, caseGroupId) {
  return caseParties
    .filter((p) => p.caseGroupId === caseGroupId)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}

export function getAvailabilityForWitness(witnessAvailability, witnessId) {
  return witnessAvailability.filter((a) => a.witnessId === witnessId);
}

export function getFollowUpsForWitness(followUpLogs, witnessId) {
  return followUpLogs
    .filter((f) => f.witnessId === witnessId)
    .sort((a, b) => new Date(b.followUpDate) - new Date(a.followUpDate));
}

export function getLastFollowUp(followUpLogs, witnessId) {
  const logs = getFollowUpsForWitness(followUpLogs, witnessId);
  return logs[0] || null;
}

export function buildDashboardRows({
  caseGroups,
  ebtWitnesses,
  caseParties,
  witnessAvailability,
  followUpLogs,
}) {
  return ebtWitnesses.map((witness) => {
    const caseGroup = getCaseGroup(caseGroups, witness.caseGroupId);
    const parties = getPartiesForCase(caseParties, witness.caseGroupId);
    const availability = getAvailabilityForWitness(witnessAvailability, witness.id);
    const lastFollowUp = getLastFollowUp(followUpLogs, witness.id);

    return {
      id: witness.id,
      caseGroup,
      witness,
      parties,
      availability,
      lastFollowUp,
    };
  });
}

export function buildRawCaseProjection(rawRow, witnesses) {
  const updatedWitnessLines = witnesses
    .map((w) => {
      const parts = [
        `${w.witnessName}:`,
        w.oobDate ? `OOB ${w.oobDate}` : null,
        w.lastFollowUpDate ? `last FL/UP ${w.lastFollowUpDate}` : null,
        w.possibleDates?.length ? `possible dates ${w.possibleDates.join(", ")}` : null,
        w.firmDate ? `firm ${w.firmDate}` : "firm date not set",
        w.completedDate ? `completed ${w.completedDate}` : null,
      ].filter(Boolean);

      return `- ${parts.join("; ")}`;
    })
    .join("\n");

  return {
    ...rawRow,
    synopsysDisplay: `UPDATED EBT TRACKING:
${updatedWitnessLines}

Original note preserved below:
${rawRow.synopsysOriginal}`,
  };
}

export function buildRawCaseRowsForModal(rawRows, witnesses, caseGroupId) {
  const caseWitnesses = witnesses.filter((w) => w.caseGroupId === caseGroupId);

  return rawRows
    .filter((row) => row.caseGroupId === caseGroupId)
    .map((row) => buildRawCaseProjection(row, caseWitnesses));
}

export function enforceAtLeastOneTracked(nextWitnesses, caseGroupId) {
  const caseWitnesses = nextWitnesses.filter((w) => w.caseGroupId === caseGroupId);
  const trackedCount = caseWitnesses.filter((w) => w.isTracked).length;

  if (trackedCount > 0) {
    return {
      ok: true,
      witnesses: nextWitnesses,
      message: "",
    };
  }

  return {
    ok: false,
    witnesses: nextWitnesses.map((w) =>
      w.caseGroupId === caseGroupId && caseWitnesses[0]?.id === w.id
        ? { ...w, isTracked: true, trackingStatus: "Tracked" }
        : w
    ),
    message: "At least one witness must remain tracked for this case.",
  };
}
