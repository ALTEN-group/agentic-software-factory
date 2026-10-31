---
pageClass: page-stage-gray
---

# 📈 7 — Learn

<div class="stage-hero-banner banner-gray">
  <span class="stage-hero-badge">STAGE 7</span>
  <span class="stage-hero-desc">Telemetry analysis &amp; predictive monitoring</span>
</div>

Learn watches production outcomes, opens backlog issues, and improves context and controls.

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

AI compares telemetry with baselines and the [Triage](./stage-triage) outcome metric. It flags anomalies and worsening trends, such as rising errors, saturation, or cost.

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

**Delete invalidated features.** Dead code adds complexity to every future change.

## Incidents

1. Detect — alert or customer report.
2. Mitigate — flag, rollback, or forward fix. Mitigation precedes diagnosis.
3. Diagnose — AI correlates logs, traces, deploys, and recent diffs; humans conclude.
4. Repair — add a test that reproduces the defect, confirm it fails, then fix the defect and confirm the test passes ([Prove](./stage-prove)).
5. Learn — review the incident within five working days.

## Hardening Deterministic Controls

For every defect, rollback, or near-miss, ask: **which control should have caught it?**

- A check was missing → add a **guard**, **gate**, **contract**, or **probe**.
- A signal arrived too late → add an earlier **probe**.

## Agents and skills {#primitives-in-persistent-context}

Learn closes the development feedback loop, running on primitives published by [coding-pal](https://alten-group.github.io/coding-pal/):

### Analysis & Governance Primitives
- A **Learn Analyst** agent processes telemetry exports, correlates deployment histories, evaluates hypothesis outcome metrics, and drafts incident reviews.
- A **learn** instruction enforces evidence discipline: mitigation precedes diagnosis, fixes require a failing test first, invalidated features are deleted, and only humans record verdicts.

### Production Incident & Telemetry Skills
- A **telemetry-scan** skill analyzes time-series metrics to identify early anomalies, degradation trends, and threshold breaches alongside preceding deploys.
- An **incident-record** skill formats and validates `docs/incidents/` records: guarantees mitigation timestamps precede diagnosis, links failing reproduction tests, and schedules retrospective reviews.

### Hypothesis & Context Stewardship Skills
- A **hypothesis-ledger** skill maintains `specs/learn/hypotheses.md`, comparing observed production metrics against declared targets and proposing verdicts (Validated, Inconclusive, Invalidated) for the Product Owner to decide.
- A **context-health** skill audits instruction sets and analyzes corrections logs to suggest new or pruned Persistent Context artifacts.

### Loop Closure
- A **learn-signals** skill translates production findings, control hardening items, and invalidated hypotheses into new backlog issues for **[1 — Triage](./stage-triage)**, ensuring the factory continuously learns.

See the [coding-pal Learn guide](https://alten-group.github.io/coding-pal/guide/domain-learn).

## Exit gate

The loop closes when a Learn output has become a new backlog issue in [1 — Triage](./stage-triage).
