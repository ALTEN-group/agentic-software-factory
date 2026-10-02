# Cadence

Agentic Software Factory replaces manual status meetings with **Meeting-Driven Development**: live sessions with
clients and stakeholders directly seed the autonomous development engine. Everything else is
asynchronous, written, and linked from the Plan record.

## Meeting-Driven rituals

| Ritual | Duration | Participants | Nature | Output |
|---|---|---|---|---|
| **Client / Stakeholder Meeting** | 30–45 min | Client, Product lead, Specification engineer | **Meeting-Driven trigger** | AI transcription, extracted problems & criteria |
| **Async Flow check-in** | — | Squad | Written / Telemetry | Blocker alerts & agent iteration logs |
| **Weekly Triage review** | 45 min | Squad | Human decision | Ranked backlog issues with client evidence attached |
| **Bi-weekly Hypothesis ledger** | 45 min | Product lead, Data owner, Squad | Human decision | Validated / invalidated outcome verdicts & feature deletions |
| **Monthly Persistent Context & Leverage review** | 60 min | Squads + AI enablement | Governance | Model routing, fix-loop performance, pruned instructions |
| **Quarterly Operating-Model Retrospective** | Half day | Organization | Strategy | Improvements to Agentic Software Factory itself |

There is **no daily standup meeting**. Status is a link to the active PR, deterministic testbed, and
preview deployment.

## The rules of client meetings in Agentic Software Factory

1. **AI is an active participant**: The meeting is recorded and transcribed by the
   sanctioned meeting intelligence tool.
2. **Need structuring**: During or immediately following the meeting, AI structures
   the dialogue into candidate business needs with evidence quotes and draft acceptance criteria, which
   [1 — Triage](./stage-triage) logs as backlog issues and [3 — Plan](./stage-plan) later turns into the Plan record.
3. **Specification engineer in attendance**: Rather than isolating developers behind ticket queues,
   engineers participate directly to ensure domain context and system invariants are captured accurately.
4. **Instant client validation**: Key acceptance criteria synthesized by AI are reviewed with the
   client before the meeting concludes, locking in intent at zero rework cost.

## Internal meeting rules

1. A meeting with no decision and no committed artifact is cancelled permanently.
2. Every recurring meeting has an owner and an expiration date.
3. Pre-reads are AI-drafted and circulated ahead of time; meetings are reserved for debate and decisions,
   not for reading slides.
4. Decisions are written into the repository (Plan record, ADR, or scorecard) before the call ends.
