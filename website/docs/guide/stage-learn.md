---
pageClass: page-stage-gray
---

# 📈 7 — Learn

<div class="stage-hero-banner banner-gray">
  <span class="stage-hero-badge">STAGE 7</span>
  <span class="stage-hero-desc">Production telemetry analysis &amp; predictive monitoring</span>
</div>

The stage that closes the loop. Without it, Agentic Software Factory is a delivery pipeline; with it, it is an
operating model.

## Purpose

| Input | Output | Owner |
|---|---|---|
| Production telemetry, customer behaviour, incidents, cost | Early warnings, validated or invalidated hypotheses, new backlog issues, improved Persistent Context and Deterministic Controls | Squad + enablement |

## What is observed

| Dimension | Examples | Feeds |
|---|---|---|
| **Outcome** | The metric named in the [3 — Plan](./stage-plan) record | Was it worth building? |
| **System health** | Latency, error rate, saturation, availability | Incident response |
| **Flow** | Lead time, deployment frequency, change failure rate, time to restore | [Metrics](./metrics) |
| **AI leverage** | Acceptance rate, rework rate, cost per change | Model and prompt evaluations |
| **Cost** | Infrastructure and model spend per squad and per feature | Prioritization |

## Predictive monitoring

AI monitors production telemetry continuously, not only after an incident. It compares live signals with
learned baselines and with the thresholds declared in [6 — Release](./stage-release), and it flags anomalies and
adverse trends (error rate creeping up, saturation approaching, cost drifting) before customers notice.

| Step | What happens | Who decides |
|---|---|---|
| **Detect** | AI flags an anomaly or a trend that is heading toward a threshold | AI proposes |
| **Explain** | AI correlates logs, traces, deploys, and recent diffs to the likely cause | Squad confirms |
| **Act** | Mitigate early, open a backlog issue in [1 — Triage](./stage-triage), or tighten the control that should have caught it | Squad decides; [deterministic controls](./deterministic-controls) still trigger automatic rollback |

What monitoring learns flows back into the diagram: patterns become new rules in Persistent Context, and
missed signals become stricter Deterministic Controls.

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
4. Repair — a failing test first, then the fix ([Prove](./stage-prove)).
5. Learn — blameless review within five working days.

Every postmortem produces at most three actions, each with an owner and a date. Long action lists
are how postmortems become fiction.

## Enriching Persistent Context

This is the step most organizations skip. Every cycle, the squad asks what was corrected or re-explained more than once,
and adds it to [Persistent Context](./persistent-context) from evidence, not from opinion. That page explains which kind of
artifact to use. This is the "Enriches" arrow in the [operating model diagram](./overview).

## Hardening Deterministic Controls

Every defect, rollback, or near-miss is also asked: what reached production that a control should have caught?

- A check was missing → add a **guard**, **gate**, **contract**, or **probe**.
- A threshold was too loose → tighten the **promotion gate** or **rollback threshold**.
- A signal arrived too late → add an earlier **probe**.

This is the "Hardens" arrow in the diagram. See [Deterministic Controls](./deterministic-controls) for the catalog.

## Cadence

- Weekly: flow and health review per squad, outcome review using the hypothesis ledger, and AI leverage and cost review.
- Monthly: operating-model retrospective — the model itself is the subject.

## Exit gate

The loop closes when a Learn output has become a new backlog issue in [1 — Triage](./stage-triage), a Persistent Context or Deterministic Controls
change, or a deletion. A learning that produces none of these three was not a learning.

**Previous:** [6 — Release](./stage-release) · **Next:** back to [0 — Meet](./stage-meet) and [1 — Triage](./stage-triage), with what Learn found
