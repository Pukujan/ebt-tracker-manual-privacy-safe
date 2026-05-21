# Exact Directions to Get Final Tables From the Input Table

## Input Table Rule

Use the original input table.

Use only these columns from the input:

| Input Column | Use As |
|---|---|
| Case | Case Name |
| PCA | PCA |
| Synopsys | Raw Synopsis |

Ignore these columns for now:

```text
Defs
CM
LA
TA
Calendar Call
Venue
Next Conf
Div
```

## Output Table 1: Main Table

Create this table exactly:

| Case Name | PCA | Witnesses | OOB Dates | Defense Counsels (OPA) | OPA Email Addresses | Email Type | Raw Synopsis |
|---|---|---|---|---|---|---|---|

Column directions:

Case Name: Take from input column `Case`.

PCA: Take from input column `PCA`.

Witnesses: Extract exact EBT/deposition witnesses from `Synopsys`.

Do not include:

```text
who is representing the witness
who is producing the witness
attorney comments
strategy comments
not-needed witnesses
considered-but-skipped witnesses
extra scheduling details
```

OOB Dates: For each witness, write their OOB date if mentioned.

Format:

```text
Witness Name — OOB date
```

If no OOB date is mentioned:

```text
Witness Name — no oob date
```

Do not use:

```text
email dates
follow-up dates
conference dates
firm EBT dates
completed EBT dates
next conference dates
```

Defense Counsels (OPA): Leave blank for now.

OPA Email Addresses: Leave blank for now.

Email Type: Leave blank for now.

Raw Synopsis: Copy the original `Synopsys` text exactly.

## Output Table 2: Complete / Incomplete EBT Table

Create this separate table exactly:

| Case Name | PCA | Completed Witnesses | Incomplete Witnesses | Raw Synopsis |
|---|---|---|---|---|

Completion rule:

EBT completion is per witness, not per case.

Do not create:

```text
EBT Status
Completed case
Incomplete case
```

Completed Witnesses:

Only put a witness here if the synopsis clearly lists them under completed language, such as:

```text
Completed
Completed EBTs
Finished EBT
done
EBT completed
P EBT done
Plaintiff done
```

Incomplete Witnesses:

Put witnesses here if they are still active/pending, including if the synopsis says:

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

If no OOB date is given for that incomplete witness, write:

```text
Witness Name — no oob date
```

## Strict Rules

```text
Do not add extra columns.
Do not add witness email.
Do not add index number.
Do not add case-level EBT status.
Do not use Defs yet.
Do not infer counsel from Defs yet.
Do not mark a witness complete unless it is written under completed/completion wording.
Preserve Raw Synopsis exactly.
```
