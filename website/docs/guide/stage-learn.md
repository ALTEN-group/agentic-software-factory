---
pageClass: page-stage-gray
---

# 📈 7 — Learn

<div class="stage-hero-banner banner-gray">
  <span class="stage-hero-badge">STAGE 7</span>
  <span class="stage-hero-desc">Telemetry analysis &amp; predictive monitoring</span>
</div>

The stage that closes the loop of the operating model. It watches what a release does in production, opens backlog issues for what it finds, and can feed what it learns back into Persistent Context and Deterministic Controls.

## Purpose

| Input | Output | Owner |
|---|---|---|
| Production telemetry, customer behavior, incidents, cost | Early warnings, validated or invalidated hypotheses, new backlog issues, improved Persistent Context and Deterministic Controls | QA and maintainer |

## What is observed

| Dimension | Examples | Feeds |
|---|---|---|
| **Outcome** | The outcome metric committed in the [1 — Triage](./stage-triage) backlog issue | Was it worth building? |
| **System health** | Latency, error rate, saturation, availability | Incident response |
| **Flow** | Lead time, deployment frequency, change failure rate, time to restore | [Metrics](./metrics) |
| **AI leverage** | Acceptance rate, rework rate, cost per change | Model and prompt evaluations |
| **Cost** | Infrastructure and model spend per squad and per feature | Prioritization |

## Predictive monitoring

AI monitors production telemetry continuously, not only after an incident. It compares live signals with
learned baselines and with the outcome metric committed in the [1 — Triage](./stage-triage) backlog issue, and it flags anomalies and
adverse trends (error rate creeping up, saturation approaching, cost drifting) before customers notice.

| Step | What happens | Who decides |
|---|---|---|
| **Detect** | AI flags an anomaly or a trend that is heading toward a threshold | AI proposes |
| **Explain** | AI correlates logs, traces, deploys, and recent diffs to the likely cause | QA and maintainer confirms |
| **Act** | Mitigate early, open a backlog issue in [1 — Triage](./stage-triage), to tighten the control that should have caught it | QA and maintainer decides; the rollback thresholds in [6 — Release](./stage-release) still trigger automatic rollback |

What monitoring learns can flow back into Persistent Context, and missed signals should become stricter Deterministic Controls.

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
4. Repair — add a test that reproduces the defect, confirm it fails, then fix the defect and confirm the test passes ([Prove](./stage-prove)).
5. Learn — review the incident within five working days.

## Hardening Deterministic Controls

Every defect, rollback, or near-miss is also asked: what reached production that a control should have caught?

- A check was missing → add a **guard**, **gate**, **contract**, or **probe**.
- A signal arrived too late → add an earlier **probe**.

## Exit gate

The loop closes when a Learn output has become a new backlog issue in [1 — Triage](./stage-triage).
