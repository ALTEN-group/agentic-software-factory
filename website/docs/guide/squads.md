# Squads

Flow Stack merges product and engineering into squads. A squad is the smallest unit that can own an
outcome end-to-end.

## Shape

A typical squad is four to six people:

| Member | Focus |
|---|---|
| Product lead | Problem selection, prioritization, customer contact |
| Engineers (2–3) | Implementation, architecture inside the outcome, production support |
| Designer | Interaction, flows, content; often shared across two squads |
| Data / analytics owner | Instrumentation, experiment design, metric integrity |
| AI / automation specialist | Context layer, agents, evaluation; usually shared |

The specialist roles are deliberately shared. A startup cannot afford one of each per squad, and
sharing is what spreads practice between squads.

## Accountability

Each squad is accountable for the full chain:

```
ideation → prioritization → implementation → quality → release → production support → outcome
```

There is no separate QA team, no separate release team, and no ticket queue between the squad and
production. Enablement functions provide rails; they do not take over steps.

## Boundaries

A squad is defined by a **user outcome**, not by a technology layer.

| Good boundary | Bad boundary |
|---|---|
| "Onboarding and activation" | "Frontend team" |
| "Billing and invoicing" | "API team" |
| "Search relevance" | "Database team" |

Technology-layer squads generate hand-offs, and hand-offs are where flow dies.

## Ownership of code

Code is owned by the squad that owns the outcome it serves. Other squads may change it through a
pull request reviewed by the owning squad. Nothing is unowned; a module with no owning squad is
assigned at the next quarterly review.

## Size and splitting

A squad splits when:

- more than one outcome competes for the same prioritization slot,
- the squad exceeds seven people,
- two distinct on-call domains emerge.

It merges back when its outcome stabilizes into maintenance.

## Enablement functions

Lightweight shared teams, never approval gates. See [Enablement](./enablement).

| Function | Provides |
|---|---|
| Platform / DevOps | Environments, pipelines, infrastructure, [Foundation](./layer-foundation) |
| Security / compliance | Secure defaults, policy checks, high-risk review |
| Data / ML enablement | Analytics, experimentation, model access, evaluation tooling |
| AI enablement | Context layer standards, agents, internal tools, guardrails |
