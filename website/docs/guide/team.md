# 👥 Team

A squad owns a customer outcome from client meeting to production.

## Who does what

<SquadFlowchart />

## The shift in roles

AI writes specifications, code, tests, and documentation. A **Product Engineer** combines product and development responsibilities:

- **No manual coders**: AI agents generate 100% of code, tests, and documentation.
- **Product Engineer**: Owns **Meet** through **Prove**, leads client conversations, sets priorities, and maintains context and delivery automation.
  - **Meet**: Understand the client's problem and desired outcome.
  - **Think**: Set the constraints that guide AI decisions.
- **Client empathy**: Keep the client's intent clear throughout delivery.

## Shape

A typical squad has one or two Product Engineers. Architecture, DevOps, and QA and maintenance are shared across squads:

| Member | Primary Focus | Role in Meeting-Driven Development |
|---|---|---|
| **Product Engineer** | Meet, Triage, Think, Plan, Code, and Prove | Leads client dialogue, defines value and priorities, owns the delivery automation, and resolves escalated failures |
| **QA and maintainer** | Quality and production support | Runs Learn: watches QA and production, handles incidents, and reports what monitoring finds; shared across squads |
| **DevOps** | Automated deployment and pipeline | Runs Release: automated deployment; shared across squads |
| **Architect** | The enablers: Platform Rails, Persistent Context, Deterministic Controls, and the Forge | Owns system constraints, decision policy, and risk controls; agents execute architectural decisions autonomously and escalate unresolved failures |

## Boundaries

A squad is defined by a **user outcome**, never by a technology layer.

| Good outcome-oriented boundary | Bad technology-layer boundary |
|---|---|
| "Client Onboarding & Identity" | "Frontend team" |
| "Payments, Billing & Invoicing" | "Backend API team" |
| "Catalog & Search Relevance" | "Database & SQL team" |

Technology-layer squads create hand-offs and fragment the context agents need.

## Ownership of code and context

The outcome-owning squad owns the code, tests, and context. Agents can propose cross-repository changes through change requests; each repository's controls enforce its business rules and boundaries.
