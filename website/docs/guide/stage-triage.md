---
pageClass: page-stage-yellow
---

# 🎯 1 — Triage

<div class="stage-hero-banner banner-yellow">
  <span class="stage-hero-badge">STAGE 1</span>
  <span class="stage-hero-desc">Candidate needs enriched, scored &amp; prioritized as backlog issues</span>
</div>

Where captured demand becomes actionable backlog work. Triage enriches candidate needs from Meet stage and other sources with system context and evidence. AI scores them, and the Product Owner validates and prioritizes the resulting backlog issues.

## Purpose

| Input | Output | Owner |
|---|---|---|
| Candidate needs and evidence from [0 — Meet](./stage-meet) and other demand sources + **[Persistent Context](./persistent-context)** (domain glossary, existing specifications, product scope) | Evidence-linked backlog issues with system mappings, an early risk estimate, and a completed scorecard | Product Owner |

## From evidence to backlog issue

Triage evaluates each candidate need against current product scope and architecture. AI uses [Persistent Context](./persistent-context) and repository information to:

1. **Map the need** to existing capabilities, specifications, domain concepts, and architecture boundaries.
2. **Estimate impact** by identifying affected systems, early risk, and unknowns. The blast radius tier is set later, in [2 — Think](./stage-think).
3. **Draft the backlog issue** in a standard format, link it to its source evidence, and prefill the scorecard fields. The Product Owner can review the scores and determines priority.

## The backlog issue

Every business need that survives analysis is logged as one **backlog issue** in the squad's issue tracker.
The issue is the unit of work that moves on to [2 — Think](./stage-think).

| Field | Content |
|---|---|
| **Title** | The business need in one sentence, in the client's words where possible |
| **Problem statement** | Who is blocked, and what it costs them |
| **Evidence** | A link to the timestamped transcript quote or other source that justifies it |
| **Hypothesis / outcome metric** | When useful, a measurable expected outcome and the metric the Product Owner commits to track |
| **Scorecard** | The five scores below |
| **Decision label** | `todo`, `explore`, `later`, or `no` |
| **Source** | The meeting, ticket, or signal it came from |

Issues are ranked by the scorecard, and the ranked backlog is what the weekly review works through.

### Where backlog issues come from

Client meetings are the main source. Three other sources also feed the backlog, as shown in the
[operating model diagram](./overview):

- **The weekly audit.** A scheduled job in the CI audits the codebase and opens a backlog issue for each finding.
- **Learn.** Monitoring and incidents in production open issues for anomalies, adverse trends, and invalidated features. See [7 — Learn](./stage-learn).
- **Support tickets and field notes.** AI groups support tickets and sales or field notes into candidate needs, as in the "Feedback clustering" task below.

Whatever the source, an issue uses the same format and the same scorecard.

## Where AI is used

AI enriches and scores candidate needs; humans validate customer alignment and establish strategic
priority.

| Task | AI role | Human role |
|---|---|---|
| Need enrichment | Map candidate needs to existing systems, specifications, and domain concepts; estimate early risk | Validate scope, customer alignment, and squad ownership |
| Feedback clustering | Group tickets and field notes into thematic clusters with occurrence counts | Name the strategic theme, discard irrelevant noise |
| Backlog issue drafting | Draft concise, evidence-linked issues from candidate needs and other demand signals | Confirm the issue is actionable and within squad ownership |
| Hypothesis drafting | Propose measurable hypotheses and business outcome metrics | Commit to the business metric |
| Complexity and risk estimate | Scan codebase and Persistent Context, flag early risk and unknowns | Validate architectural risk boundaries |
| Scorecard population | Auto-populate customer value, estimated effort, risk, and confidence | Set strategic weights and break prioritization ties |

AI never decides which client problem matters most.

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

A business need leaves Triage when its backlog issue has:

1. a named problem linked to specific client dialogue or empirical data,
2. at least one non-anecdotal piece of evidence (e.g. a client meeting quote, a cluster of support tickets),
3. a completed scorecard row,
4. an explicit decision: *todo*, *explore*, *later*, or *no*.

`no` is recorded with its rationale. Rejected needs build institutional memory and guide future
client discussions. The weekly review that works through the ranked backlog is described in [Cadence](./cadence).
