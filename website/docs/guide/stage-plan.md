---
pageClass: page-stage-indigo
---

# 📋 3 — Plan

<div class="stage-hero-banner banner-indigo">
  <span class="stage-hero-badge">STAGE 3</span>
  <span class="stage-hero-desc">Implementation breakdown, file scope &amp; boundary constraints</span>
</div>

Where an approach decided in [2 — Think](./stage-think) becomes an actionable, machine-testable plan and formal
specification that AI can autonomously build and deterministic controls can prove. Plan replaces vague user
stories with formal, machine-testable statements, the Forge asset bindings chosen in Think, and AI-generated
implementation breakdowns grounded in codebase truth.

## Purpose

| Input | Output | Owner |
|---|---|---|
| A ranked backlog issue from [1 — Triage](./stage-triage) and the Think record from [2 — Think](./stage-think) (chosen approach, **Forge asset bindings**, **Persistent Context** constraints, blast radius, ADRs) | A structured Plan record with problem, outcome metric, Forge asset bindings, Persistent Context constraints, deterministic acceptance criteria, and an implementation plan | Product lead + specification engineer |

## The Plan record

Every work item carries six formal fields. Because developers do not write code syntax manually, the
completeness and testability of these fields are the primary levers of software quality. The Forge asset
bindings and constraints are inherited from the [Think record](./stage-think#the-think-record) and carried here, not re-decided.

| Field | Content | Length |
|---|---|---|
| **Problem** | Who is blocked, what they said in the client meeting, and what it costs them | 2–3 sentences + citation |
| **Outcome metric** | The objective number or telemetry metric that moves if this succeeds | 1 line |
| **Forge asset bindings** | Pre-approved reusable services, shared modules, and API contracts composed into this plan | List of Forge references |
| **Acceptance criteria** | Deterministically observable behaviours, written as executable assertions | 3–8 assertions |
| **Constraints** | Security, compliance, latency, schema compatibility, budget limits | Bullets |
| **Out of scope** | Explicit non-goals preventing agent scope creep | Bullets |

### Deterministic criteria example

Acceptance criteria are written so that test generators and deterministic testbeds can execute them
without subjective interpretation:

```text
- Given unauthenticated request to GET /api/v1/orders, then response is 401 Unauthorized with empty body.
- Given authenticated user with role `viewer`, when sending POST /api/v1/orders, then response is 403 Forbidden.
- Given valid order payload with known product ID, when POST /api/v1/orders, then response is 201 Created and exactly one `order.created` event is published with schema v2.
- Given order payload with unknown product ID, when POST /api/v1/orders, then response is 400 Bad Request, no database row is written, and error code is `ERR_PRODUCT_NOT_FOUND`.
```

## Where AI is used

AI translates client dialogue into formal specifications and technical plans; the specification
engineer ensures architectural soundness and strict testability.

| Task | AI role | Human role (Specification / Planning Engineer) |
|---|---|---|
| **Meeting-to-Plan translation** | Parse client meeting transcript, draft problem definition and acceptance criteria | Validate that technical criteria faithfully represent client needs |
| **Implementation breakdown** | Draft the implementation plan across files and components from the Think record | Validate scope, file boundaries, and sequencing |
| **Edge-case & invariant discovery** | Enumerate boundary conditions, race conditions, null states, and error handling | Decide which edge cases are mandatory in scope |
| **Deterministic criteria specification** | Convert business requirements into observable, boolean acceptance assertions | Ensure assertions are rigorous and machine-verifiable |
| **Ambiguity detection** | Flag criteria that are subjective, unfalsifiable, or lacking observable side effects | Rewrite them into strict boolean or contract assertions |

::: tip
The ambiguity detection pass is the highest-leverage AI capability in this stage: it catches
unfalsifiable requirements before the coding agent writes a single line of code.
:::

## Exit gate

A work item leaves Plan and enters [4 — Code](./stage-code) only when:

1. every acceptance criterion is deterministically observable and machine-verifiable,
2. the Forge bindings and constraints from [2 — Think](./stage-think) are carried into the Plan record,
3. the blast radius classified in Think is confirmed and the required level of minimum human validation is assigned ([Decision Rights](./decision-rights#blast-radius-and-required-human-validation)),
4. the **Validate** step is complete: the specification engineer has reviewed and approved the implementation plan.

## Validate

Between Plan and [4 — Code](./stage-code) sits the schema's one explicit **Validate** action. The specification engineer
validates the implementation plan, its file scope, and its acceptance criteria. Approval here is what lets the coding
agent start generating immediately, with no second plan and no second approval inside Code.

A reusable prompt in Persistent Context, for example "draft a Plan record from this Think record", keeps Plan records uniform across squads.

**Previous:** [2 — Think](./stage-think) · **Next:** [4 — Code](./stage-code)
