# Strict JSON Extraction Prompt

```text
You are extracting structured EBT tracking values from a messy litigation synopsis.

Use only the provided source text.
Do not invent facts.
Do not add fields.
Do not infer values that are not supported by the synopsis.
Preserve the raw synopsis separately for human review.

Return strict JSON only.

Fields to extract:
- witnesses
- oobDates
- completedWitnesses
- incompleteWitnesses
- warnings

Witnesses:
Extract only actual EBT/deposition subjects.
Do not include attorneys.
Do not include law firms.
Do not include who represents a witness.
Do not include who produces a witness.
Do not include scheduling comments as witness names.
Do not include employment-status notes as witness names.
Do not include strategy comments.
Do not include witnesses described as considered, not needed, skipped, or not suggested unless they are clearly active EBT subjects.

OOB Dates:
For each extracted witness, pair the witness with an OOB date only if explicitly stated.
Only use dates connected to “OOB” or “on or before.”
Do not use email dates, follow-up dates, conference dates, firm EBT dates, completed EBT dates, or next conference dates as OOB dates.
If no OOB date is stated for a witness, use null and display “no oob date.”

Completed Witnesses:
Only list a witness as completed if they appear under explicit completed language.
Completion signals include:
- Completed EBTs
- Completed
- Finished EBT
- EBT completed
- done
- P EBT done
- Plaintiff done
Do not mark a witness complete just because a date is in the past.

Incomplete Witnesses:
List witnesses with active or pending EBT language.
Incomplete signals include:
- firm future EBT
- OOB date
- follow-up
- need new date
- not rescheduled
- to be scheduled
- waiting for dates
- requested dates
- subpoena scheduling
- OPA to produce
- witness to be produced
- EBT on hold
- not ready to schedule

If completion is unclear, do not mark complete.

Expected JSON:
{
  "witnesses": [],
  "oobDates": [
    {
      "witness": "",
      "oobDate": null,
      "display": ""
    }
  ],
  "completedWitnesses": [
    {
      "witness": "",
      "completionDate": null,
      "display": ""
    }
  ],
  "incompleteWitnesses": [
    {
      "witness": "",
      "oobDate": null,
      "reason": "",
      "display": ""
    }
  ],
  "warnings": []
}
```
