# Iteration Documentation Template

## Full Table Template

```markdown
| Timestamp | Iteration # | Change Type | What Was Requested | What Was Wrong Before | Change Made | Correct Example | Wrong Example | Rule Added / Updated | Human Review Note |
|---|---:|---|---|---|---|---|---|---|---|
| YYYY-MM-DD HH:MM | 1 | Schema / Prompt / Logic / Review / Export |  |  |  |  |  |  |  |
```

## Detailed Block Template

```markdown
## Iteration [#]: [Short Title]

**Timestamp:** YYYY-MM-DD HH:MM
**Change Type:** Schema / Prompt / Logic / Review / Export

### What I Asked For
[Exact user instruction]

### What Was Wrong Before
[What the previous version did incorrectly]

### What Changed
[Exact change made]

### Correct Example
```text
[Correct fake example]
```

### Wrong Example
```text
[Wrong fake example]
```

### Rule Added / Updated
```text
[New rule]
```

### Human Review Note
[How the human correction changed the logic]
```

## EBT-Specific Change Types

| Change Type | Meaning |
|---|---|
| Schema | Column/table/tab changed |
| Prompt | Extraction instruction changed |
| Logic | Meaning/classification changed |
| Review | Human correction changed the model |
| Export | Workbook/table output changed |
| Source Mapping | Input column usage changed |
