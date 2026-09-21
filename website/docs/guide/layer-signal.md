# L1 — Signal

Where demand enters the system. In Flow Stack, Signal is **Meeting-Driven**: it turns real-time client
conversations and telemetry into a structured, comparable set of opportunities.

## Purpose

| Input | Output | Owner |
|---|---|---|
| Client meetings, stakeholder interviews, usage telemetry, support tickets, experiments, incidents | A ranked opportunity list with verbatim client evidence and initial blast-radius estimates | Product lead of the squad |

## Meeting-Driven Signal capture

In traditional models, requirements decay across manual meeting notes, Jira tickets, and developer
interpretations. In Flow Stack's **Meeting-Driven Development (MDD)**:

1. **Client dialogue is captured in real time**: Client meetings (discovery sessions, feature requests,
   operational reviews) are transcribed and synthesized by AI models during or immediately after the session.
2. **Semantic intent extraction**: AI extracts verbatim problem statements, requested capabilities,
   business constraints, and domain terminology directly from the client's words.
3. **Traceability to the voice of the customer**: Every extracted opportunity links directly to the
   timestamped transcript or audio quote, preventing requirement drift throughout downstream layers.

## Sources

| Source | Cadence | Typical volume | Role in MDD |
|---|---|---|---|
| **Client & stakeholder meetings** | Weekly / On-demand | 3–5 per squad | **Primary driver**: real-time AI transcription and intent extraction |
| Product usage analytics | Continuous | Dashboards + alerts | Objective validation of user behavior |
| Support tickets | Continuous | Clustered weekly | Operational friction signals |
| Live experiments | Per hypothesis | 1–3 running per squad | Empirical behavioral validation |
| Sales and field notes | Continuous | Structured deal logs | Market demand signals |
| Incidents and postmortems | On occurrence | Directly from [L6](./layer-learn) | Reliability signals |

## Where AI is used

AI does the heavy synthesis, semantic clustering, and scorecard population; humans validate customer
alignment and establish strategic priority.

| Task | AI role | Human role |
|---|---|---|
| **Client meeting synthesis** | Transcribe dialogue, extract problem statements, cite quotes, identify domain concepts | Confirm the customer's actual pain was captured |
| Feedback clustering | Group tickets and field notes into thematic clusters with occurrence counts | Name the strategic theme, discard irrelevant noise |
| Opportunity statements | Draft concise problem definitions mapped directly from client meetings | Decide if the problem falls within squad ownership |
| Hypothesis drafting | Propose measurable hypotheses and business outcome metrics | Commit to the business metric |
| Complexity and risk estimate | Scan codebase and Context Layer, flag blast radius and unknowns | Validate architectural risk boundaries |
| Scorecard population | Auto-populate customer value, estimated effort, risk, and confidence | Set strategic weights and break prioritization ties |

::: warning
AI extracts, structures, and scores the evidence; the product lead owns the prioritization ranking.
Machines never decide which client problem matters most.
:::

## The scorecard

A lightweight, deliberately coarse instrument. Precision here is false precision.

| Field | Scale | Source |
|---|---|---|
| Customer value | 1–5 | Real-time evidence from client meetings and feedback |
| Business value | 1–5 | Product lead |
| Effort | 1–5 | AI-assisted code scan + specification engineer |
| Risk / blast radius | 1–5 | Architectural scan + security rules |
| Confidence | Low / Medium / High | Directness of client quotes and telemetry proof |

Low-confidence, high-value items become **experiments**, not immediate build tasks.

## Exit gate

An opportunity leaves Signal when it has:

1. a named problem linked to specific client dialogue or empirical data,
2. at least one non-anecdotal piece of evidence (e.g. client meeting quote, telemetry anomaly),
3. a completed scorecard row,
4. an explicit decision: *do now*, *experiment*, *later*, or *no*.

`no` is recorded with its rationale. Rejected signals build institutional memory and guide future
client discussions.

## Cadence

Weekly opportunity review per squad, 45 minutes, using the AI-synthesized meeting pack circulated
ahead of time. See [Cadence](./cadence).
