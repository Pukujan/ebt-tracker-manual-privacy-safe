# EBT Tracker Prompt Iteration Log

Goal: Turn the original input table into a clean EBT tracking table without adding extra fields.

Input columns allowed:
- Case
- PCA
- Synopsys

Input columns ignored:
- Defs
- CM
- LA
- TA
- Calendar Call
- Venue
- Next Conf
- Div

Final main output table:
Case Name | PCA | Witnesses | OOB Dates | Defense Counsels (OPA) | OPA Email Addresses | Email Type | Raw Synopsis

Final complete/incomplete output table:
Case Name | PCA | Completed Witnesses | Incomplete Witnesses | Raw Synopsis

## Iteration 1: Initial table was too broad

What was wrong: The table added too many extra fields.

Wrong example:
```text
Case ID
Case Name
Index Number
County
Court
Judge
Part
Status
Transcript Requested
Follow-up Date
Notes
```

My exact correction: Only use the fields I asked for.

Correct result:
```text
Case Name | Index Number | Witnesses | Email Addresses
```

Point: Do not add columns I did not ask for.

## Iteration 2: Witness email was wrong

What was wrong: The table added witness email fields.

Wrong example:
```text
Witness Name | Witness Email | Attorney Email
```

My exact correction: No witness email.

Correct result:
```text
Case Name | Index Number | Witnesses | Email Addresses
```

Point: Email addresses are not witness emails.

## Iteration 3: Added defense counsel only after I asked

What was wrong: Nothing wrong here. This was a controlled change.

My exact change:
```text
Defense Counsels
```

Correct result:
```text
Case Name | Index Number | Witnesses | Defense Counsels | Email Addresses
```

Point: Schema changes are allowed only when I explicitly ask.

## Iteration 4: Renamed columns exactly

What was wrong: The column names needed to match my wording.

My exact change:
```text
Email Addresses → OPA Email Addresses
Defense Counsels → Defense Counsels (OPA)
```

Correct result:
```text
Case Name | Index Number | Witnesses | Defense Counsels (OPA) | OPA Email Addresses
```

Point: Use exact column names.

## Iteration 5: Added Email Type

What was wrong: Nothing wrong. This was another controlled addition.

My exact change:
```text
Email Type
```

Correct result:
```text
Case Name | Index Number | Witnesses | Defense Counsels (OPA) | OPA Email Addresses | Email Type
```

Point: Only add the requested column.

## Iteration 6: Added OOB Dates beside Witnesses

What was wrong: The table needed a separate place for OOB dates.

My exact change:
```text
OOB Dates
```

Correct result:
```text
Case Name | Index Number | Witnesses | OOB Dates | Defense Counsels (OPA) | OPA Email Addresses | Email Type
```

Point: OOB dates need their own column.

## Iteration 7: Removed Index Number and added PCA

What was wrong: Index number was no longer needed.

My exact change:
```text
Remove Index Number
Add PCA
```

Correct result:
```text
Case Name | PCA | Witnesses | OOB Dates | Defense Counsels (OPA) | OPA Email Addresses | Email Type
```

Point: PCA replaced Index Number.

## Iteration 8: Input table extraction rule

What was wrong: The input table had many columns, but not all should be used.

My exact instruction: Ignore Defs, CM, LA, TA; later also Calendar Call, Venue, Next Conf, Div.

Correct input usage:
```text
Case → Case Name
PCA → PCA
Synopsys → Raw Synopsis / extraction source
```

Point: Do not use ignored columns for extraction.

## Iteration 9: Added Raw Synopsis

What was wrong: The extracted values needed the original source text for review.

My exact change:
```text
Raw Synopsis
```

Correct result:
```text
Case Name | PCA | Witnesses | OOB Dates | Defense Counsels (OPA) | OPA Email Addresses | Email Type | Raw Synopsis
```

Point: Raw Synopsis must preserve the original Synopsys text.

## Iteration 10: Witness extraction was too noisy

What was wrong: The witness column included representation, production, attorney, not-needed, and strategy notes.

My exact correction: Get exact witnesses only.

Correct fake example:
```text
Dr. Alicia Moreno
Plaintiff
Nurse Carla Evans
```

Point: Witnesses means actual EBT/deposition subjects only.

## Iteration 11: OOB date pairing needed to be per witness

What was wrong: Dates could be confused with email dates, follow-up dates, firm EBT dates, or completed dates.

My exact correction: If OOB date is mentioned, pair it with the witness. If no OOB date is mentioned, write no oob date.

Correct fake example:
```text
Dr. Hannah Reed — 6/15/26
Nurse Omar Ellis — no oob date
Plaintiff — no oob date
Dr. Victor Lane — no oob date
```

Point: Only explicit OOB dates go in OOB Dates.

## Iteration 12: Sorting/filter buttons

What was wrong: Basic A-Z / Z-A sorting was not enough.

My exact change: Use proper sorting/filter buttons.

Correct result: Workbook table should have header filter dropdowns.

Point: The table should support review and filtering.

## Iteration 13: Case-level completed/incomplete was wrong

What was wrong: The table added EBT Status and treated completion like the whole case was completed or incomplete.

My exact correction: Remove EBT Status. EBT completion is per witness, not per case.

Point: A case can have both completed and incomplete EBTs.

## Iteration 14: Completed tabs were wrong

What was wrong: Separate case-level tabs like Completed EBT, Incomplete EBT, Not Sure were not right.

My exact correction: Remove those tabs. Instead create one separate table/tab: Complete-Incomplete EBT with Completed Witnesses and Incomplete Witnesses.

Correct result:
```text
Case Name | PCA | Completed Witnesses | Incomplete Witnesses | Raw Synopsis
```

Point: Completed/incomplete belongs to witnesses, not whole case rows.

## Iteration 15: Completed witness rule

What was wrong: A witness could not be marked completed just because there was a past date.

My exact correction: A witness is completed only if written under completed/completion wording.

Correct fake example:
```text
Plaintiff — 1/20/26
Dr. Lina Cho — 4/8/26
```

Point: Only completed section/completion wording creates completed witnesses.

## Iteration 16: Incomplete witness rule

What was wrong: Incomplete witnesses needed to be separated from completed witnesses.

My exact correction: Put active or pending witnesses under Incomplete Witnesses.

Signals include:
```text
OOB
firm future EBT
follow up
need new date
not rescheduled
to be scheduled
waiting for dates
requested dates
subpoena scheduling
OPA to produce
witness to be produced
EBT on hold
not ready to schedule
```

Correct fake example:
```text
Dr. Naomi Bell — OOB 6/10/26
Dr. Eric Stone — no oob date
```

Point: Incomplete witnesses are active/pending EBT subjects.
