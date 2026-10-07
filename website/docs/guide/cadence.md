# 🗓️ Cadence

The Agentic Software Factory replaces manual status meetings with **Meeting-Driven Development**: live sessions with clients and stakeholders directly seed the autonomous development engine. Everything else is
asynchronous, written, and linked from the work item.

## Meeting-Driven rituals

| Ritual | Duration | Participants | Nature | Output |
|---|---|---|---|---|
| **Client / Stakeholder Meeting** | 30–45 min | Client, Product Owner, Developer | **Meeting-Driven trigger** | Meeting Pack: transcript, summary, new terminology & candidate business needs |
| **Weekly Triage review** | 45 min | Product Owner, Developer | Human decision | Business needs ranked and logged as backlog issues, each with client evidence |
| **Weekly Outcome review** | 45 min | Product Owner, QA and maintainer, Developer | Human decision | Validated or invalidated hypotheses and new backlog issues |
| **Weekly Persistent Context & Controls review** | 45 min | Architect, Developer | Governance | Improved Persistent Context and Deterministic Controls |
| **Monthly Operating-Model Retrospective** | 1 hour | Product Owner, Architect, Developer, DevOps, QA and maintainer | Strategy | Changes to the operating model itself |

There is **no daily standup meeting**. Status is a link to the active pull request, its checks, and
the preview deployment.

## The rules of client meetings in the Agentic Software Factory

1. **AI is an active participant**: The meeting is recorded and transcribed by the
   sanctioned meeting intelligence tool.
2. **Need structuring**: During or immediately following the meeting, AI structures
   the dialogue into candidate business needs with evidence quotes and draft acceptance criteria, which
   [1 — Triage](./stage-triage) logs as backlog issues and [3 — Plan](./stage-plan) later turns into the Plan record.
3. **Developer in attendance**: Rather than isolating developers behind ticket queues,
   Developers participate directly to ensure domain context and system invariants are captured accurately.
4. **Client confirmation**: Before the meeting ends, the Product Owner reads back the needs that were captured, and the client confirms or corrects them. AI's written summary is then sent to the client for a final check.

## Internal meeting rules

1. A meeting with no decision and no committed artifact is cancelled permanently.
2. Every recurring meeting has an owner and an expiration date.
3. Pre-reads are AI-drafted and circulated ahead of time; meetings are reserved for debate and decisions,
   not for reading slides.
4. Decisions are written into the repository (Plan record, decision record, or scorecard) before the call ends.
