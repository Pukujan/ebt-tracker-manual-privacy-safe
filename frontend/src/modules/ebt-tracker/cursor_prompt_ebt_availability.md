# Cursor Prompt: Build EBT Availability Dashboard from V0 Model

You are working inside my existing React app.

Build a frontend-only EBT Availability Dashboard module using the provided V0 model files:

- `ebtAvailabilitySchema.v0.js`
- `ebtAvailabilityMockData.v0.js`
- `ebtAvailabilityProjection.v0.js`
- `rawTableSelection.v0.js`

Important:
Use JSX only.
Do not build backend yet.
Do not call AI APIs.
Do not send emails.
Do not use real case data.
Use only synthetic/PII-altered demo data.
Do not use custom HTML tags or fragile string-replacement rendering.
Build this as real React components using arrays/objects and component mapping.

## Module name

EBT Availability Dashboard

## Route

If my app uses React Router, add route:

`/ebt-availability`

If routing is not obvious, create a standalone component:

`EbtAvailabilityDashboard.jsx`

## Core purpose

This table tracks EBT/deposition scheduling across cases, witnesses, OOB dates, last follow-ups, possible dates, firm dates, counsel replies, and availability/unavailability by party.

The dashboard must feel like an operational spreadsheet, not a generic CRUD app.

## Main table

Default view: `Date Tracking View`

Columns:
1. Expand icon
2. Case
3. Witness
4. OOB
5. Last FL/UP
6. Possible Dates
7. Firm Date
8. Actions

Actions:
- Send FL/UP
- View Case

`Send FL/UP` is a placeholder only.

## Fixed view dropdown

At the top of the screen, add a fixed/always-visible view changer bar.

Use a dropdown, not a button.

Options:
1. Date Tracking View
2. Counsel Reply View
3. Availability Matrix View

### Date Tracking View

Show:
- Case
- Witness
- OOB
- Last FL/UP
- Possible Dates
- Firm Date
- Actions

Hide:
- Counsel Reply column
- Availability Matrix column

### Counsel Reply View

Hide:
- Witness
- OOB
- Last FL/UP
- Possible Dates
- Firm Date
- Actions

Show:
- Case
- All Case Counsel / Last Reply

In Counsel Reply View, the witness name must appear inside the Case cell in small text.

### Availability Matrix View

Hide:
- Witness
- OOB
- Last FL/UP
- Possible Dates
- Firm Date
- Actions
- Counsel Reply column

Show:
- Case
- All Available / Unavailable Dates

In Availability Matrix View, the witness name must also appear inside the Case cell in small text.

## Row expansion

Each witness row should expand/collapse.

Expanded view should show:
- availability dates per plaintiff/defendants/OPA
- unavailable dates where applicable
- a small "Track same-case witnesses" button

Do NOT show a big heading like:
`Dr. Alan Mercer - availability dates per party`

The expanded row should go straight into the date blocks.

## Tracking drawer

Inside expanded row, add a small button:

`Track same-case witnesses (N)`

When clicked, it opens a small drawer/list.

Rules:
- Tracking checkboxes only appear in expanded view.
- They should not appear in the main row.
- Each case must always have at least one witness tracked.
- If the user tries to uncheck the last tracked witness, immediately re-check it and show:
  `At least one witness must remain tracked for this case.`
- Each witness in the tracking drawer must show its own OOB date or Done/TBD.

## No extra insight tags

Do not add extra interpretation tags like:
- Needs new date
- TBD
- Ct. Permission
- Def D pending
- Previously May 19 busted
- Only this Synopsys cell is updated

Allowed badges:
- dates
- available dates
- unavailable dates
- OOB dates
- counsel reply dates
- check/response indicators

## View Case modal

When clicking `View Case`, open a modal that shows raw incoming-table format.

Columns:
1. Case
2. PCA
3. Calendar Call
4. CM
5. LA
6. TA
7. Synopsys
8. Defs
9. Venue
10. Next Conf
11. Div

Important:
Only the Synopsys column should show updated firm/follow-up witness information through `buildRawCaseProjection`.
All other columns should remain normal raw table data.

Do not show a note inside the Synopsys cell saying:
`Only this Synopsys cell is updated...`

## Raw table cell selection / copying

Use `rawTableSelection.v0.js`.

User should be able to:
- click a cell to select it
- Ctrl/Cmd-click to select multiple cells
- Shift-click to select a range in the same column
- click "Copy selected cells"
- press Ctrl/Cmd+C after selecting cells

Copy behavior:
- If selected cells are in one column, copy values separated by newline.
- If selected cells span rows and columns, copy tab-separated values with newlines between rows.
- This should paste cleanly into Excel/Google Sheets.

## Suggested component structure

- `EbtAvailabilityDashboard.jsx`
- `EbtMainTable.jsx`
- `EbtWitnessRow.jsx`
- `TrackWitnessDrawer.jsx`
- `CounselReplyCell.jsx`
- `AvailabilityMatrixCell.jsx`
- `RawCaseModal.jsx`
- `Badge.jsx`

Use local React state only for V0.
