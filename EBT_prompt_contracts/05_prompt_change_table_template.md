# Prompt Change Documentation Table

```markdown
| Timestamp | Prompt Iteration # | Prompt Area | Previous Prompt Problem | User Correction | Prompt Change Made | Correct Fake Example | Wrong Fake Example | New Prompt Rule |
|---|---:|---|---|---|---|---|---|---|
| YYYY-MM-DD HH:MM | 1 | Scope Control | Prompt allowed extra fields/columns | Only use fields I ask for | Added strict “do not add columns” rule | `Case Name \| PCA \| Witnesses` | `Case ID \| Status \| Judge` | Do not add fields unless explicitly requested |
| YYYY-MM-DD HH:MM | 2 | Witness Extraction | Prompt pulled extra narrative details | Get exact witnesses only | Restricted witness output to EBT/deposition subjects | `Dr. Alicia Moreno` | `OPA will produce Dr. Alicia Moreno` | Witnesses = actual EBT subjects only |
| YYYY-MM-DD HH:MM | 3 | Witness Noise Filtering | Prompt included representation/production notes | Do not include who is representing or producing | Added exclusion rules for representation, production, attorney comments | `Nurse Carla Evans` | `Smith & Lane representing Nurse Carla Evans` | Exclude counsel/production notes |
| YYYY-MM-DD HH:MM | 4 | OOB Date Pairing | Prompt extracted dates without checking date type | Pair OOB dates with witnesses only if mentioned | Added witness-to-OOB pairing rule | `Dr. Hannah Reed — 6/15/26` | `Emailed — 5/10/26` | Only explicit OOB dates go in OOB Dates |
| YYYY-MM-DD HH:MM | 5 | Missing OOB Handling | Prompt left unclear witness/date gaps | If no OOB date, write no oob date | Added fallback output | `Nurse Omar Ellis — no oob date` | `Nurse Omar Ellis — 5/10/26` | Missing OOB = `no oob date` |
| YYYY-MM-DD HH:MM | 6 | Date Filtering | Prompt confused email/follow-up/firm dates with OOB dates | Do not use non-OOB dates | Added rejected date categories | `Dr. Bell — OOB 6/10/26` | `Dr. Bell — firm 6/30/26` | Reject email, follow-up, firm, completed, conference dates as OOB |
| YYYY-MM-DD HH:MM | 7 | Completion Logic | Prompt classified whole cases as complete/incomplete | Completion is per witness, not per case | Removed case-level status logic | `Completed Witnesses: Plaintiff — 1/20/26` | `Case Status: Completed` | Do not create case-level EBT status |
| YYYY-MM-DD HH:MM | 8 | Completed Witness Extraction | Prompt treated past dates as completed | Only completed if under completed wording | Added explicit completion-signal rule | `Dr. Lina Cho — 4/8/26` under `Completed EBTs` | `Dr. Lina Cho — 4/8/26` from random date line | Completed requires completed/completion wording |
| YYYY-MM-DD HH:MM | 9 | Incomplete Witness Extraction | Prompt did not separate pending witnesses clearly | Active/pending witnesses go under incomplete | Added incomplete-signal rule | `Dr. Naomi Bell — OOB 6/10/26` | Leaving Dr. Naomi Bell out because not completed | Pending/active EBT subjects = incomplete |
| YYYY-MM-DD HH:MM | 10 | Raw Source Preservation | Prompt only returned extracted values | Keep raw synopsis for review | Added raw synopsis preservation rule | Raw text copied exactly | Raw text summarized or cleaned | Preserve Raw Synopsis exactly |
```
