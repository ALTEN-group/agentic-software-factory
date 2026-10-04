# Team

The Agentic Software Factory aligns product, development, and customer outcomes into autonomous squads.
A squad is the smallest unit that can own an outcome end-to-end — from client meeting to production
release.

## The shift in roles

In The Agentic Software Factory, **developers do not write code syntax anymore**, and the Product Owner no longer writes specifications. The squad structure reflects this:

- **No manual coders**: AI agents generate 100% of code, tests, and documentation.
- **Developers**: Developers specify, curate context, and validate intent instead of writing syntax.
- **Product Owner**: AI writes the specifications, so the Product Owner no longer writes them. Instead, the Product Owner works with the client to turn their problems into clear, well-defined business needs.
- **Client Empathy**: Because developers are freed from syntax authoring, they can actively participate
  in client meetings alongside the Product Owner to understand the true business context.

## Shape

**A typical high-leverage agentic squad is two people**, a Product Owner and a Developer, plus an Architect, a DevOps, a QA and maintainer shared across squads:

| Member | Primary Focus | Role in Meeting-Driven Development |
|---|---|---|
| **Product Owner** | Client relationships, prioritization, outcome metrics | Leads client meetings, ranks backlog issues, defines business value, owns the Triage scorecard |
| **Developer** | Think, Plan, Code, and Prove | Takes part in client meetings, weighs options in Think, validates Plan records, orchestrates the code loop, and conducts minimum human validation |
| **QA and maintainer** | Quality and production support | Runs Learn: watches QA and production, handles incidents, and reports what monitoring finds; shared across squads |
| **DevOps** | Automated deployment and pipeline | Runs Release: automated deployment; shared across squads |
| **Architect** | The enablers: Platform Rails, Persistent Context, Deterministic Controls, and the Forge | Owns system boundaries and decision records, signs off high blast radius decisions; shared across squads |

## Who does what

Each squad is accountable for the full lifecycle, from client meeting to learning in production. This is the
[operating model](./overview) reduced to its eight stages, showing who does the job at each group of stages.

<SquadFlowchart />

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
squad validates the business intent and invariants.
