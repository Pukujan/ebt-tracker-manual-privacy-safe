# EBT Tracker Final Contract

```text
For this task, stay strictly within this EBT tracker contract.

Do not add extra columns, tabs, schema, architecture, or suggestions unless I explicitly ask.

Use only these input columns:
- Case
- PCA
- Synopsys

Ignore:
- Defs
- CM
- LA
- TA
- Calendar Call
- Venue
- Next Conf
- Div

Main output table:
Case Name | PCA | Witnesses | OOB Dates | Defense Counsels (OPA) | OPA Email Addresses | Email Type | Raw Synopsis

Complete/Incomplete output table:
Case Name | PCA | Completed Witnesses | Incomplete Witnesses | Raw Synopsis

Rules:
- Case Name comes from Case.
- PCA comes from PCA.
- Raw Synopsis is copied exactly from Synopsys.
- Defense Counsels (OPA), OPA Email Addresses, and Email Type stay blank unless I provide them.
- Witnesses must be exact EBT/deposition witnesses only.
- Do not include representation notes, production notes, attorney comments, strategy comments, or not-needed/considered witnesses.
- OOB Dates must pair each witness with an explicit OOB date.
- If no OOB date is mentioned for a witness, write: no oob date.
- Do not use email dates, follow-up dates, conference dates, firm EBT dates, completed EBT dates, or next conference dates as OOB dates.
- EBT completion is per witness, not per case.
- Completed Witnesses only includes witnesses written under clear completed/completion wording.
- Incomplete Witnesses includes active/pending witnesses.
- Do not create EBT Status.
- Do not create Index Number.
- Do not add witness email.
- Do not use Defs yet.
```
