# Cadence

Flow Stack keeps a small number of fixed rituals. Everything else is asynchronous, written, and
linked from the work item.

## Daily

| Ritual | Duration | Participants | Output |
|---|---|---|---|
| Async written check-in | — | Squad | Blockers surfaced within the hour |
| Flow board review | 10 min | Squad | Items unblocked or escalated |

There is no status meeting. Status is a link.

## Weekly

| Ritual | Duration | Participants | Output |
|---|---|---|---|
| Opportunity review | 45 min | Squad | Updated [Signal](./layer-signal) ranking |
| Flow & health review | 30 min | Squad | Actions on lead time, failures, alerts |
| Release digest | Async | All | AI-drafted, human-approved summary |

## Bi-weekly

| Ritual | Duration | Participants | Output |
|---|---|---|---|
| Hypothesis ledger | 45 min | Product lead, data owner, squad | Validated / inconclusive / invalidated verdicts, and deletions |

## Monthly

| Ritual | Duration | Participants | Output |
|---|---|---|---|
| AI leverage & cost review | 60 min | Squads + AI enablement | Model routing changes, workflows retired or redesigned |
| Security review | 60 min | Security owner + leads | Threat model updates, guardrail changes |

## Quarterly

| Ritual | Duration | Participants | Output |
|---|---|---|---|
| Operating-model retrospective | Half day | Whole organization | Changes to Flow Stack itself |
| Outcome review | Half day | Leads + squads | Squad boundaries, outcome ownership, budget |

The operating-model retrospective is the one that keeps this documentation honest: any page here
that no longer matches how the company works is either fixed or deleted during it.

## Meeting rules

1. A meeting with no decision and no artifact is cancelled permanently.
2. Every recurring meeting has an owner and an expiry date.
3. Pre-reads are AI-drafted and circulated at least a day ahead; the meeting is for the decision,
   not the reading.
4. Decisions are written into the work item or ADR before the meeting ends.

## Interrupts

Incidents and customer-blocking defects pre-empt everything. Everything else waits for the next
ritual — an interruption that cannot wait a week is rare and should be treated as evidence, not as
normal.
