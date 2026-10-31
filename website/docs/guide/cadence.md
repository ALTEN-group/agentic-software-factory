# 🗓️ Cadence

Client meetings feed delivery. Status updates are asynchronous, written, and linked from the work item.

## Meeting-Driven rituals

| Ritual | Duration | Participants | Nature | Output |
|---|---|---|---|---|
| **Client / Stakeholder Meeting** | 30–45 min | Client, Product Owner, Developer | **Meeting-Driven trigger** | Meeting Pack: transcript, summary, new terminology & candidate business needs |
| **Weekly Triage review** | 45 min | Product Owner, Developer | Human decision | Business requirements ranked and logged as backlog issues, each with client evidence |
| **Weekly Outcome review** | 45 min | Product Owner, QA and maintainer, Developer | Human decision | Validated or invalidated hypotheses and new backlog issues |
| **Weekly Persistent Context & Controls review** | 45 min | Architect, Developer | Governance | Improved Persistent Context and Deterministic Controls |
| **Monthly Operating-Model Retrospective** | 1 hour | Product Owner, Architect, Developer, DevOps, QA and maintainer | Strategy | Changes to the operating model itself |

There is **no daily standup meeting**. Status is a link to the active pull request, its checks, and
the preview deployment.

## The rules of client meetings in the Agentic Software Factory

1. **Record and transcribe** with a sanctioned tool.
2. **Extract needs** with source quotes. [Triage](./stage-triage) creates backlog issues; [Plan](./stage-plan) defines the acceptance criteria.
3. **Include a Developer** to capture domain context and system constraints.
4. **Confirm with the client**: read back the needs before the meeting ends, then send the summary for a final check.

## Internal meeting rules

1. A meeting with no decision and no committed artifact is cancelled permanently.
2. Every recurring meeting has an owner and an expiration date.
3. Pre-reads are AI-drafted and circulated ahead of time; meetings are reserved for debate and decisions,
   not for reading slides.
4. Decisions are written into the repository (Plan record, decision record, or scorecard) before the call ends.
