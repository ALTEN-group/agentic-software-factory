# 6 — Learn

The layer that closes the loop. Without it, Agentic Software Factory is a delivery pipeline; with it, it is an
operating model.

## Purpose

| Input | Output | Owner |
|---|---|---|
| Production behaviour, customer behaviour, incidents, cost | Validated or invalidated hypotheses, new signals, improved context | Squad + enablement |

## What is observed

| Dimension | Examples | Feeds |
|---|---|---|
| **Outcome** | The metric named in the [2 — Plan](./layer-plan) record | Was it worth building? |
| **System health** | Latency, error rate, saturation, availability | Incident response |
| **Flow** | Lead time, deployment frequency, change failure rate, time to restore | [Metrics](./metrics) |
| **AI leverage** | Acceptance rate, rework rate, cost per change | Model and prompt evaluations |
| **Cost** | Infrastructure and model spend per squad and per feature | Prioritization |

## The hypothesis ledger

Every work item that named an outcome metric is reviewed after its watch window.

| Verdict | Meaning | Next action |
|---|---|---|
| **Validated** | Metric moved as predicted | Invest further, remove the flag |
| **Inconclusive** | No detectable movement | Decide: iterate once, or remove |
| **Invalidated** | Metric did not move, or moved against us | Remove the feature, record the lesson |

Features that are invalidated are **deleted**. Carrying dead features is the most expensive form of
technical debt in an AI-accelerated codebase, because every future generation pass has to reason
around them.

## Incidents

1. Detect — alert or customer report.
2. Mitigate — flag, rollback, or forward fix. Mitigation precedes diagnosis.
3. Diagnose — AI correlates logs, traces, deploys, and recent diffs; humans conclude.
4. Repair — a failing test first, then the fix ([Proof](./layer-proof)).
5. Learn — blameless review within five working days.

Every postmortem produces at most three actions, each with an owner and a date. Long action lists
are how postmortems become fiction.

## Feeding the Context Layer

This is the step most organizations skip. Every cycle, the squad asks:

- What did we correct in generated output more than once? → add or amend an **instruction**.
- What multi-step task did we re-explain? → package it as a **skill**.
- What bounded specialty keeps recurring? → define an **agent**.
- What decision surprised a newcomer? → write an **ADR**.

The [Context Layer](./context-layer) is maintained here, from evidence, not from opinion.

## Cadence

- Weekly: flow and health review per squad.
- Bi-weekly: hypothesis ledger review.
- Monthly: AI leverage and cost review with enablement.
- Quarterly: operating-model retrospective — the model itself is the subject.

## Exit gate

The loop closes when a Learn output has become a new [Need](./layer-need) row, a Context Layer
change, or a deletion. A learning that produces none of these three was not a learning.
