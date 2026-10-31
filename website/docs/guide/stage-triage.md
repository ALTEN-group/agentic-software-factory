---
pageClass: page-stage-yellow
---

# 🎯 1 — Triage

<div class="stage-hero-banner banner-yellow">
  <span class="stage-hero-badge">STAGE 1</span>
  <span class="stage-hero-desc">Candidate needs qualified into requirements, scored &amp; prioritized in the backlog</span>
</div>

Triage turns needs from [Meet](./stage-meet) and other sources into evidence-linked backlog issues. AI checks and scores them; the Product Owner sets priorities.

## Purpose

| Input | Output | Owner |
|---|---|---|
| Needs and evidence from [Meet](./stage-meet) or other sources, plus Persistent Context | Ranked issues with evidence, affected systems, early risks, and scores | Product Owner |

## From evidence to backlog issue

AI checks each need against the product scope, repository, and Persistent Context:

1. **Map the need** to existing capabilities, specs, and boundaries.
2. **Estimate impact** and flag unknowns. [Think](./stage-think) sets the formal risk tier later.
3. **Draft an issue** with the requirement, source evidence, and scores. The Product Owner sets priority.

## The backlog issue

Create one issue per qualified need. It states **what** is needed and **why**, with source evidence. [Think](./stage-think) chooses **how**; [Plan](./stage-plan) defines the steps and acceptance tests.

| Field | Content |
|---|---|
| **Title** | The business requirement in one sentence, in the client's words where possible |
| **Problem statement** | Who is blocked, what it costs them, and the requirement to satisfy |
| **Evidence** | A link to the timestamped transcript quote or other source that justifies it |
| **Hypothesis / outcome metric** | When useful, a measurable expected outcome and the metric the Product Owner commits to track |
| **Scorecard** | The five scores below |
| **Decision label** | `todo`, `explore`, `later`, or `no` |
| **Source** | The meeting, ticket, or signal it came from |

Issues are ranked by the scorecard, and the ranked requirements backlog is what the weekly review works through.

### Where backlog issues come from

Client meetings are the main source. Three other sources also feed the backlog, as shown in the
[operating model diagram](./overview):

- **The weekly audit.** A scheduled job in the CI audits the codebase and opens a backlog issue for each finding.
- **Learn.** Monitoring and incidents in production open issues for anomalies, adverse trends, and invalidated features. See [7 — Learn](./stage-learn).
- **Support tickets and field notes.** AI groups support tickets and sales or field notes into candidate needs, as in the "Feedback clustering" task below.

Whatever the source, an issue uses the same format and the same scorecard.

## Where AI is used

AI qualifies, enriches, and scores candidate requirements; humans validate customer alignment and establish strategic
priority.

| Task | AI role | Human role |
|---|---|---|
| Requirement enrichment | Qualify candidate needs into business requirements mapped to existing systems, specifications, and domain concepts; estimate early risk | Validate requirement scope, customer alignment, and squad ownership |
| Feedback clustering | Group tickets and field notes into thematic clusters with occurrence counts | Name the strategic theme, discard irrelevant noise |
| Backlog issue drafting | Draft concise, evidence-linked requirement issues from candidate needs and other demand signals | Confirm the requirement is actionable and within squad ownership |
| Hypothesis drafting | Propose measurable hypotheses and business outcome metrics | Commit to the business metric |
| Complexity and risk estimate | Scan codebase and Persistent Context, flag early risk and unknowns | Validate architectural risk boundaries |
| Scorecard population | Auto-populate customer value, estimated effort, risk, and confidence | Set strategic weights and break prioritization ties |

AI never decides which client problem matters most.

## Agents and skills {#primitives-in-persistent-context}

Triage runs on the primitives published by [coding-pal](https://alten-group.github.io/coding-pal/):

- A **Triage Analyst** agent enriches one candidate need per session and writes a `triage.md` record: the backlog issue, its evidence, the system mapping, the scorecard, and a *proposed* decision.
- A **triage** instruction keeps the evidence verbatim and the scores coarse.
- A **triage** skill validates the record deterministically: real evidence, verbatim quotes, the explore rule, and a final decision that only the Product Owner can set.
- A **triage ledger** keeps decided needs, including every `no` with its rationale, so the same need is not re-litigated by accident.
- A **ranking script** orders the scorecards with the strategic weights the Product Owner owns, for the weekly review.

See the [coding-pal Triage guide](https://alten-group.github.io/coding-pal/guide/domain-triage).

## The scorecard

A lightweight, deliberately coarse instrument. Precision here is false precision.

| Field | Scale | Source |
|---|---|---|
| Customer value | 1–5 | Evidence from client meetings and feedback |
| Business value | 1–5 | Product Owner |
| Effort | 1–5 | AI-assisted code scan + developer |
| Risk | 1–5 | Architectural scan + security rules. An early estimate that helps ranking. [2 — Think](./stage-think) sets the blast radius tier |
| Confidence | Low / Medium / High | Directness of client quotes and supporting evidence |

Low-confidence, high-value items receive the **explore** decision: gather evidence to reduce uncertainty before deciding whether to build.

## Exit gate

A requirement leaves Triage when its backlog issue has:

1. a named problem and clear business requirement linked to specific client dialogue or empirical data,
2. at least one non-anecdotal piece of evidence (e.g. a client meeting quote, a cluster of support tickets),
3. a completed scorecard row,
4. an explicit decision: *todo*, *explore*, *later*, or *no*.

Record why an issue is marked `no` so it is not reconsidered without new evidence. Review ranked issues using the [weekly cadence](./cadence).
Only a `todo` decision, set by the Product Owner, starts [2 — Think](./stage-think).
