# L1 — Signal

Where demand enters the system. Signal turns unstructured reality into a ranked, comparable set of
opportunities.

## Purpose

| Input | Output | Owner |
|---|---|---|
| Interviews, usage data, support tickets, experiments, sales feedback, incidents | A ranked opportunity list with evidence attached | Product lead of the squad |

## Sources

| Source | Cadence | Typical volume |
|---|---|---|
| Customer interviews | Weekly | 3–5 per squad |
| Product usage analytics | Continuous | Dashboards + anomaly alerts |
| Support tickets | Continuous | Clustered weekly |
| Experiments | Per hypothesis | 1–3 running per squad |
| Sales and field feedback | Weekly | Structured note per deal |
| Incidents and postmortems | On occurrence | Feeds directly from [L6](./layer-learn) |

## Where AI is used

AI does the reduction; humans do the selection.

| Task | AI role | Human role |
|---|---|---|
| Interview summarization | Transcribe, extract quotes, tag themes | Confirm the customer was understood |
| Feedback clustering | Group tickets and notes into themes with counts | Name the theme, discard noise |
| Opportunity statements | Draft problem statements from clusters | Decide which problems are ours |
| Hypothesis drafting | Propose testable hypotheses and success metrics | Commit to the metric |
| Complexity and risk estimate | Scan the codebase, flag blast radius and unknowns | Accept or challenge the estimate |
| Scorecard population | Fill value / risk / effort / confidence columns | Set the weights, break ties |

::: warning
AI never ranks the list. It populates the inputs of the scorecard; the product lead ranks.
:::

## The scorecard

A lightweight, deliberately coarse instrument. Precision here is false precision.

| Field | Scale | Source |
|---|---|---|
| Customer value | 1–5 | Evidence from signal sources |
| Business value | 1–5 | Product lead |
| Effort | 1–5 | Engineering, AI-assisted estimate |
| Risk / blast radius | 1–5 | Engineering + security |
| Confidence | Low / Medium / High | Strength of the evidence |

Low-confidence, high-value items become **experiments**, not roadmap items.

## Exit gate

An opportunity leaves Signal when it has:

1. a named problem and the customer segment that has it,
2. at least one piece of non-anecdotal evidence,
3. a scorecard row,
4. an explicit decision: *do now*, *experiment*, *later*, or *no*.

`no` is recorded with its reason. Rejected signals are the cheapest institutional memory there is.

## Cadence

Weekly opportunity review per squad, 45 minutes, AI-prepared pack circulated beforehand. See
[Cadence](./cadence).
