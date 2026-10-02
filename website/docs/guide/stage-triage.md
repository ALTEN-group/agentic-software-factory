---
pageClass: page-stage-yellow
---

# 🎯 1 — Triage

<div class="stage-hero-banner banner-yellow">
  <span class="stage-hero-badge">STAGE 1</span>
  <span class="stage-hero-desc">Transcript analysis, business needs ranked &amp; logged as backlog issues</span>
</div>

Where demand enters the system. In Agentic Software Factory, Triage is **Meeting-Driven**: it turns client
conversations, stakeholder interviews, and operational telemetry into a structured, comparable set of business needs, ranked and logged as backlog issues.

## Purpose

| Input | Output | Owner |
|---|---|---|
| Client dialogue from [0 — Meet](./stage-meet), stakeholder interviews, usage telemetry + **[Persistent Context](./persistent-context)** (domain glossary, existing specs, product scope) | Business needs ranked and logged as backlog issues, each with verbatim client evidence, existing system mappings, and blast-radius estimates | Product lead of the squad |

## Meeting-Driven Triage

In traditional models, requirements decay across manual meeting notes, Jira tickets, and developer
interpretations. In Agentic Software Factory's **Meeting-Driven Development (MDD)**:

1. **Client dialogue is analysed**: Client meetings (discovery sessions, feature requests,
   operational reviews) are transcribed in [0 — Meet](./stage-meet) and analysed by AI models during or immediately after the session.
2. **Context-aware semantic need extraction**: Powered by [Persistent Context](./persistent-context), AI maps client dialogue against existing system specifications, domain glossaries, and current architecture boundaries, identifying whether the need extends an existing capability or introduces a new domain.
3. **Traceability to the voice of the customer**: Every extracted need links directly to the
   timestamped transcript or audio quote, preventing requirement drift in every later stage.

## Sources

| Source | Cadence | Typical volume | Role in MDD |
|---|---|---|---|
| **Client & stakeholder meetings** | Weekly / On-demand | 3–5 per squad | **Primary driver**: AI transcription and need extraction |
| Product usage analytics | Continuous | Dashboards + alerts | Objective validation of user behavior |
| Support tickets | Continuous | Clustered weekly | Operational friction signals |
| Live experiments | Per hypothesis | 1–3 running per squad | Empirical behavioral validation |
| Sales and field notes | Continuous | Structured deal logs | Market demand signals |
| Incidents and postmortems | On occurrence | Directly from [7 — Learn](./stage-learn) | Reliability signals |

## The backlog issue

Every business need that survives analysis is logged as one **backlog issue** in the squad's issue tracker
(GitHub Issues in the reference setup, see [Tooling](./tooling)). The issue is the unit of work that moves on to [2 — Think](./stage-think).

| Field | Content |
|---|---|
| **Title** | The business need in one sentence, in the client's words where possible |
| **Problem statement** | Who is blocked, and what it costs them |
| **Evidence** | A link to the timestamped transcript quote or telemetry that justifies it |
| **Scorecard** | The five scores below |
| **Decision label** | `do-now`, `experiment`, `later`, or `no` |
| **Source** | The meeting, ticket, or signal it came from |

Issues are ranked by the scorecard, and the ranked backlog is what the weekly review works through.

## Where AI is used

AI does the heavy synthesis, semantic clustering, and scorecard population; humans validate customer
alignment and establish strategic priority.

| Task | AI role | Human role |
|---|---|---|
| **Client meeting analysis** | Extract problem statements, cite quotes, identify domain concepts | Confirm the customer's actual pain was captured |
| Feedback clustering | Group tickets and field notes into thematic clusters with occurrence counts | Name the strategic theme, discard irrelevant noise |
| Backlog issue drafting | Draft concise issues mapped directly from client meetings, with evidence links | Decide if the problem falls within squad ownership |
| Hypothesis drafting | Propose measurable hypotheses and business outcome metrics | Commit to the business metric |
| Complexity and risk estimate | Scan codebase and Persistent Context, flag blast radius and unknowns | Validate architectural risk boundaries |
| Scorecard population | Auto-populate customer value, estimated effort, risk, and confidence | Set strategic weights and break prioritization ties |

A reusable prompt, for example "draft a backlog issue from this Meeting Pack need", gives every squad the same issue structure.

::: warning
AI extracts, structures, and scores the evidence; the product lead owns the prioritization ranking.
Machines never decide which client problem matters most.
:::

## The scorecard

A lightweight, deliberately coarse instrument. Precision here is false precision.

| Field | Scale | Source |
|---|---|---|
| Customer value | 1–5 | Evidence from client meetings and feedback |
| Business value | 1–5 | Product lead |
| Effort | 1–5 | AI-assisted code scan + specification engineer |
| Risk / blast radius | 1–5 | Architectural scan + security rules |
| Confidence | Low / Medium / High | Directness of client quotes and telemetry proof |

Low-confidence, high-value items become **experiments**, not immediate build tasks.

## Exit gate

A business need leaves Triage when its backlog issue has:

1. a named problem linked to specific client dialogue or empirical data,
2. at least one non-anecdotal piece of evidence (e.g. client meeting quote, telemetry anomaly),
3. a completed scorecard row,
4. an explicit decision: *do now*, *experiment*, *later*, or *no*.

`no` is recorded with its rationale. Rejected needs build institutional memory and guide future
client discussions. The weekly review that works through the ranked backlog is described in [Cadence](./cadence).

**Previous:** [0 — Meet](./stage-meet) · **Next:** [2 — Think](./stage-think)
