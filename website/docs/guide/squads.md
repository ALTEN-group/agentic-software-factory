# Squads

Agentic Software Factory aligns product, specification engineering, and customer outcomes into autonomous squads.
A squad is the smallest unit that can own an outcome end-to-end — from client meeting to production
release.

## The shift in engineering roles

In Agentic Software Factory, **developers do not write code syntax anymore**. The squad structure reflects this:

- **No manual coders**: AI agents generate 100% of code, tests, and documentation.
- **Specification Engineers**: Engineers become domain architects, specification designers, and
  builders of deterministic control testbeds.
- **Client Empathy**: Because engineers are freed from syntax authoring, they actively participate
  in client meetings alongside product leads to understand the true business context.

## Shape

A typical high-leverage agentic squad is four to five people:

| Member | Primary Focus | Role in Meeting-Driven Development |
|---|---|---|
| **Product lead** | Client relationships, prioritization, outcome metrics | Leads client meetings, defines business value, owns the Triage scorecard |
| **Specification Engineers (1–2)** | Specifications, Persistent Context, automated checks and deterministic controls | Participates in client meetings, refines Plan records, builds deterministic testbeds, conducts minimum human validation |
| **Architect** | System boundaries, cross-service contracts, ADR governance | Validates technical design plans, signs off high-blast radius ADRs; shared across squads |
| **Designer** | User experience, user journeys, interaction contracts | Establishes design criteria directly with clients, validates live preview environments |
| **AI / Context Specialist** | Persistent Context, agent configurations, deterministic controls | Curates repo instructions, skills, agents, and evaluation pipelines; shared across squads |

## Accountability

Each squad is accountable for the full lifecycle:

```
client meeting → ranked backlog issues → options & decisions → plan → fast autonomous code loops → deterministic validation → minimum human sign-off → automated, reversible release → monitoring & learning
```

There is no separate QA team, no manual testing department, and no release approval bureaucracy.
The squad owns the outcome, backed by platform rails.

## Boundaries

A squad is defined by a **user outcome**, never by a technology layer.

| Good outcome-oriented boundary | Bad technology-layer boundary |
|---|---|
| "Client Onboarding & Identity" | "Frontend team" |
| "Payments, Billing & Invoicing" | "Backend API team" |
| "Catalog & Search Relevance" | "Database & SQL team" |

Technology-layer squads create cross-team tickets, waiting states, and fragmented context that
cripple AI agents.

## Ownership of code and context

Code, deterministic test suites, and Persistent Context artifacts are owned by the squad that owns the
outcome. AI agents can propose changes across repositories via pull requests, but the owning
squad's specification engineer validates the business intent and invariants.

## Enablement functions

Lightweight shared teams providing automated rails, never gatekeeper meetings. See [Enablement](./enablement).

| Function | Provides |
|---|---|
| Platform / DevOps | Environments from source, CI/CD pipelines, progressive delivery rails, [Platform Rails](./platform-rails) |
| Security / compliance | Policy-as-code, SAST/DAST automation, threat models, secret management |
| Data / analytics | Telemetry pipelines, experimentation platforms, metric validation |
| AI enablement | Persistent Context standards, agent toolkits, evaluation harnesses, meeting transcription & extraction rails |
