# Minimal Backend Models Only

## Source Input Row

```ts
type SourceInputRow = {
  Case: string;
  PCA: string;
  Synopsys: string;
};
```

Ignored input fields:

```ts
type IgnoredInputFields = {
  CalendarCall?: string;
  CM?: string;
  LA?: string;
  TA?: string;
  Defs?: string;
  Venue?: string;
  NextConf?: string;
  Div?: string;
};
```

## Main Tracker Row

```ts
type MainTrackerRow = {
  caseName: string;
  pca: string;
  witnesses: string[];
  oobDates: WitnessOobPair[];
  defenseCounselsOpa: string;
  opaEmailAddresses: string;
  emailType: string;
  rawSynopsis: string;
};
```

```ts
type WitnessOobPair = {
  witness: string;
  oobDate: string | null;
  display: string;
};
```

## Complete / Incomplete EBT Row

```ts
type CompleteIncompleteEbtRow = {
  caseName: string;
  pca: string;
  completedWitnesses: CompletedWitness[];
  incompleteWitnesses: IncompleteWitness[];
  rawSynopsis: string;
};
```

```ts
type CompletedWitness = {
  witness: string;
  completionDate: string | null;
  display: string;
};
```

```ts
type IncompleteWitness = {
  witness: string;
  oobDate: string | null;
  reason?: string;
  display: string;
};
```

## Review Status

```ts
type ReviewStatus =
  | "unreviewed"
  | "approved"
  | "edited"
  | "needs_review"
  | "rejected";
```
