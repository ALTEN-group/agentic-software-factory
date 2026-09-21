# L2 — Intent

Where an opportunity becomes something a machine can build and a human can verify. Intent replaces
long specification documents with short, testable statements plus AI-generated technical drafts.

## Purpose

| Input | Output | Owner |
|---|---|---|
| A prioritized opportunity | A work item with problem, outcome metric, acceptance criteria, constraints, and an implementation plan | Product lead + engineer |

## The Intent record

Every work item carries the same five fields. Nothing else is mandatory.

| Field | Content | Length |
|---|---|---|
| **Problem** | Who is blocked, by what, and what it costs them | 2–3 sentences |
| **Outcome metric** | The number that moves if this works | 1 line |
| **Acceptance criteria** | Observable behaviours, written as assertions | 3–8 bullets |
| **Constraints** | Security, compliance, performance, compatibility, budget | Bullets |
| **Out of scope** | What this explicitly does not do | Bullets |

Example acceptance criteria:

```
- An unauthenticated request to /orders returns 401 with no body.
- A consumer with role `viewer` receives 403 on POST /orders.
- A valid order creation returns 201 and emits `order.created` exactly once.
- Creating an order with an unknown product id returns 400 and creates nothing.
```

## Where AI is used

| Task | AI role | Human role |
|---|---|---|
| Story shaping | Turn a customer need into problem + criteria drafts | Validate product intent |
| Technical design note | Draft the approach against the real codebase | Own the architecture decision |
| Edge-case discovery | Enumerate boundaries, failure modes, concurrency cases | Decide which are in scope |
| Test plan | Derive unit, integration, and contract test outlines from criteria | Approve coverage |
| Ambiguity detection | Flag criteria that are not observable or not testable | Rewrite them |
| Impact analysis | List affected modules, contracts, consumers, migrations | Confirm blast radius |

The ambiguity pass is the highest-value AI use in this layer: it is cheap, it is fast, and it
catches the defects that are most expensive to find in [Proof](./layer-proof).

## Design decisions

A change that alters a public contract, a data model, or a cross-service boundary needs a short
**ADR** (context, decision, consequences, alternatives rejected). AI drafts it; the engineering
lead signs it; it is committed next to the code.

## Exit gate

A work item leaves Intent when:

1. every acceptance criterion is observable and testable,
2. the blast radius is stated and the review level is assigned (see [Decision Rights](./decision-rights)),
3. an implementation plan exists and a human has validated its scope,
4. any required ADR is merged.

::: tip
A work item that cannot pass this gate is not *underspecified* — it is usually *undecided*. Send it
back to [Signal](./layer-signal) rather than starting to build around the ambiguity.
:::
