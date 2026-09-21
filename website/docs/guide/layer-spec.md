# L2 — Spec

Where a prioritized client need becomes an executable specification that AI can autonomously
build and deterministic controls can prove. Spec replaces vague user stories with formal,
machine-testable statements and AI-generated architectural plans.

## Purpose

| Input | Output | Owner |
|---|---|---|
| A prioritized opportunity from [L1 Need](./layer-need) | A structured Spec record with problem, outcome metric, deterministic acceptance criteria, constraints, and an implementation plan | Product lead + specification engineer |

## The Spec record

Every work item carries five formal fields. Because developers do not write code syntax manually, the
completeness and testability of these fields are the primary levers of software quality.

| Field | Content | Length |
|---|---|---|
| **Problem** | Who is blocked, what they said in the client meeting, and what it costs them | 2–3 sentences + citation |
| **Outcome metric** | The objective number or telemetry metric that moves if this succeeds | 1 line |
| **Acceptance criteria** | Deterministically observable behaviours, written as executable assertions | 3–8 assertions |
| **Constraints** | Security, compliance, latency, schema compatibility, budget limits | Bullets |
| **Out of scope** | Explicit non-goals preventing agent scope creep | Bullets |

### Deterministic criteria example

Acceptance criteria are written so that test generators and deterministic testbeds can execute them
without subjective interpretation:

```gherkin
- Given unauthenticated request to GET /api/v1/orders, then response is 401 Unauthorized with empty body.
- Given authenticated user with role `viewer`, when sending POST /api/v1/orders, then response is 403 Forbidden.
- Given valid order payload with known product ID, when POST /api/v1/orders, then response is 201 Created and exactly one `order.created` event is published with schema v2.
- Given order payload with unknown product ID, when POST /api/v1/orders, then response is 400 Bad Request, no database row is written, and error code is `ERR_PRODUCT_NOT_FOUND`.
```

## Where AI is used

AI translates client dialogue into formal specifications and technical drafts; the specification
engineer ensures architectural soundness and strict testability.

| Task | AI role | Human role (Specification Engineer) |
|---|---|---|
| **Meeting-to-Spec translation** | Parse client meeting transcript, draft problem definition and acceptance criteria | Validate that technical criteria faithfully represent client needs |
| **Technical design & plan** | Scan codebase and Context Layer, draft implementation plan across files | Validate architectural approach and component boundaries |
| **Edge-case & invariant discovery** | Enumerate boundary conditions, race conditions, null states, and error handling | Decide which edge cases are mandatory in scope |
| **Deterministic test planning** | Derive unit, integration, contract, and mutation test expectations from criteria | Ensure test assertions are rigorous and ungameable |
| **Ambiguity detection** | Flag criteria that are subjective, unfalsifiable, or lacking observable side effects | Rewrite them into strict boolean or contract assertions |
| **Impact & contract analysis** | Detect affected APIs, database schemas, message queues, and consumer dependencies | Confirm blast radius and trigger ADR if boundaries shift |

::: tip
The ambiguity detection pass is the highest-leverage AI capability in this layer: it catches
unfalsifiable requirements before the build agent writes a single line of code.
:::

## Architectural decisions (ADRs)

If an implementation requires altering a public API, changing a database schema, or shifting service
boundaries, AI drafts an Architecture Decision Record (ADR) based on repository conventions. The
architect or specification engineer reviews and signs the ADR, which is committed into the repository
to immediately enrich the [Context Layer](./context-layer).

## Exit gate

A work item leaves Spec and enters [Build](./layer-build) only when:

1. every acceptance criterion is deterministically observable and machine-verifiable,
2. blast radius is classified and the required level of minimum human validation is assigned ([Decision Rights](./decision-rights)),
3. an AI implementation plan has been reviewed and approved by the specification engineer,
4. all architectural changes are recorded in an ADR committed to the Context Layer.
