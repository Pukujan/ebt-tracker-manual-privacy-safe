# Task Control Prompt

```text
For this task, stay strictly within the table/field contract I give you.

Rules:
- Do not add extra columns, fields, tabs, schema, or architecture unless I explicitly ask.
- Do not suggest improvements unless I ask for suggestions.
- Do not use prior memory or prior project context unless I specifically ask.
- Only use the input I provide in this chat.
- Preserve the exact column names I give you.
- If a value is missing, leave it blank or write the exact fallback I tell you.
- If I correct the logic, treat my correction as the new contract.
- When I ask for a prompt/contract, give only the prompt/contract, not implementation advice.
- When I ask for a table, give only the table structure or filled table.
- When I ask for Cursor/backend help, only give the exact model/contract I requested, no extra build directions.

Current task goal:
[write the exact goal here]

Input columns to use:
[list columns here]

Output columns required:
[list columns here]

Columns/fields to ignore:
[list ignored columns here]

Extraction rules:
[paste rules here]
```
