---
pageClass: page-stage-yellow
---

# 🎯 1 — Triage

<div class="stage-hero-banner banner-yellow">
  <span class="stage-hero-badge">STAGE 1</span>
  <span class="stage-hero-desc">Candidate needs qualified into requirements, scored &amp; prioritized in the backlog</span>
</div>

Where captured demand becomes the **requirements backlog**. Triage turns candidate needs from [0 — Meet](./stage-meet) and other sources into qualified business requirements enriched with system context and evidence. AI scores them, and the Product Owner validates and prioritizes the resulting backlog issues.

## Purpose

| Input | Output | Owner |
|---|---|---|
| Candidate needs and evidence from [0 — Meet](./stage-meet) and other demand sources + **Persistent Context** (domain glossary, existing specifications, product scope) | A prioritized requirements backlog: evidence-linked backlog issues with qualified business requirements, system mappings, an early risk estimate, and a completed scorecard | Product Owner |

## From evidence to backlog issue

Triage bridges raw client dialogue from [0 — Meet](./stage-meet) and executable acceptance criteria in [3 — Plan](./stage-plan). It evaluates each candidate need against current product scope and architecture so only grounded, well-scoped requirements enter the backlog. AI uses Persistent Context and repository information to:

1. **Qualify and map the requirement** against existing capabilities, specifications, domain concepts, and architecture boundaries.
2. **Estimate impact** by identifying affected systems, early risk, and unknowns. The blast radius tier is set later, in [2 — Think](./stage-think).
3. **Draft the backlog issue** in a standard format, state the business requirement clearly, link it to its source evidence, and prefill the scorecard fields. The Product Owner can review the scores and determines priority.

## The backlog issue

Every business need that survives analysis becomes a qualified **business requirement**, logged as one **backlog issue** in the squad's issue tracker. Together, these issues form the squad's **requirements backlog**.
The issue captures *what* is required and *why*, grounded in verbatim evidence; [2 — Think](./stage-think) decides *how* to satisfy the requirement architecturally, and [3 — Plan](./stage-plan) translates it into testable acceptance criteria.

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

## Primitives in Persistent Context

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

`no` is recorded with its rationale. Rejected requirements build institutional memory and guide future
client discussions. The weekly review that works through the ranked requirements backlog is described in [Cadence](./cadence).
Only a `todo` decision, set by the Product Owner, starts [2 — Think](./stage-think).
