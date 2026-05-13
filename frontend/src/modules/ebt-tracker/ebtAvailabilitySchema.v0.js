// ebtAvailabilitySchema.v0.js
// Frontend-first V0 schema for the EBT Availability Dashboard.
// Synthetic / PII-altered demo model only.

export const EBT_REVIEW_STATUSES = [
  "AI Pending Review",
  "Human Verified",
  "Skipped For Later",
  "Needs Correction",
  "Manual Entry",
];

export const WITNESS_TRACKING_STATUSES = [
  "Tracked",
  "Available To Track",
  "Completed",
  "Do Not Track",
];

export const PARTY_REPLY_STATUSES = [
  "Responded",
  "No Response",
  "No Dates Provided",
  "Partial Response",
  "On Hold",
];

export const SOURCE_TYPES = [
  "Raw Table",
  "Email",
  "Call",
  "Internal Note",
  "Court Order",
  "Manual Entry",
  "Synthetic Demo",
];

export const RAW_CASE_ROW_COLUMNS = [
  "caseName",
  "pca",
  "calendarCall",
  "cm",
  "la",
  "ta",
  "synopsysOriginal",
  "defs",
  "venue",
  "nextConf",
  "div",
];

export const CRITICAL_WITNESS_FIELDS = [
  "witnessName",
  "witnessType",
  "oobDate",
  "lastFollowUpDate",
  "firmDate",
  "completedDate",
  "possibleDates",
  "status",
  "isTracked",
];

export const schemaNotes = {
  rawCaseRows: "Preserves the incoming spreadsheet-like rows exactly as imported. Do not normalize away Synopsys or Defs.",
  caseGroups: "Groups duplicate rows / same cases / related defendant rows into one operational case group.",
  ebtWitnesses: "One operational dashboard row per witness/deposition obligation.",
  caseParties: "Case-level party/counsel rows used for Counsel Reply View and manual contact mapping.",
  witnessAvailability: "Per-witness, per-party available/unavailable dates used for Availability Matrix View.",
  followUpLogs: "Per-witness follow-up history used to compute last follow-up, next follow-up, and future email drafting context.",
};
