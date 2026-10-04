---
pageClass: page-stage-pink
---

# 💡 2 — Think

<div class="stage-hero-banner banner-pink">
  <span class="stage-hero-badge">STAGE 2</span>
  <span class="stage-hero-desc">Options exploration, trade-offs &amp; architectural decisions</span>
</div>

Where a prioritized issue is turned into a decided approach before anything is planned or built.
Think draws on [the Forge](./forge), for code to reuse, and on [Persistent Context](./persistent-context), for the
rules and past decisions to respect. It explores the options, weighs the trade-offs, and records the decisions that
[3 — Plan](./stage-plan) then breaks down into tasks.

## Purpose

| Input | Output | Owner |
|---|---|---|
| A ranked backlog issue from [1 — Triage](./stage-triage) + **[The Forge](./forge)** + **[Persistent Context](./persistent-context)** | A Think record: the options considered, the chosen approach, **Forge asset bindings**, Persistent Context constraints, blast radius, and any new decision record | Developer + architect |

## The Think record

Every work item carries a short, reviewable record of the decision made before planning starts.

| Field | Content | Length |
|---|---|---|
| **Options considered** | The credible approaches, including reuse from The Forge versus custom build | 2–4 options |
| **Chosen approach** | The selected option and the reasoning behind it | 1 paragraph |
| **Forge asset bindings** | Pre-approved reusable services, libraries, and API contracts composed into the approach | List of Forge references |
| **Constraints & invariants** | Decision records, security, compliance, latency, and schema compatibility rules that bound the solution | Bullets |
| **Blast radius** | The affected APIs, schemas, queues, and consumers, and the tier they add up to: Low, Medium, High, or Critical, as defined in [Decision Rights](./decision-rights#blast-radius-and-required-human-validation). The tier sets the human validation the change needs in [5 — Prove](./stage-prove). For High and Critical, it also names the rollback mechanism | Tier + bullets |

The [Plan record](./stage-plan#the-plan-record) will inherit the Forge bindings, constraints, and blast radius from the Think record. They are decided here. Plan only checks that the blast radius tier still holds for its file scope.

## Where AI is used

AI explores the option space and checks it against the organization's reality; the architect and
developer make the call.

| Task | AI role | Human role |
|---|---|---|
| **Option exploration** | Draft credible approaches with trade-offs, cost, and risk for each | Select the approach and challenge the assumptions |
| **Forge discovery & composition** | Semantically query The Forge catalog, match reusable code modules and shared services to the need | Confirm asset suitability, avoid duplicate development, approve integration bindings |
| **Codebase & context scan** | Scan the codebase, Forge assets, and Persistent Context for relevant constraints | Validate the architectural approach and component boundaries |
| **Impact & contract analysis** | Detect affected APIs, database schemas, message queues, and consumer dependencies, and propose a blast radius tier | Confirm the tier, and trigger a decision record if boundaries shift |

## Decision records

If the chosen approach requires altering a public API, changing a database schema, or shifting service
boundaries, AI drafts a decision record based on repository conventions. The
architect reviews and signs the record, which is committed into the repository
to immediately enrich the [Persistent Context](./persistent-context).

## Exit gate

A work item leaves Think and enters [3 — Plan](./stage-plan) only when:

1. the credible options, including Forge reuse, have been evaluated and one approach is chosen,
2. reusable code modules and shared services from **The Forge** are bound to the approach where applicable,
3. architectural constraints, domain specs, and invariants from the **Persistent Context** are validated,
4. the blast radius tier is set (Low, Medium, High, or Critical), with the affected systems and users that justify it, and the rollback mechanism is named for High and Critical ([Decision Rights](./decision-rights#blast-radius-and-required-human-validation)),
5. any required updates to the **Persistent Context** are identified for inclusion in the Plan, and the related architectural decisions are captured in a decision record.

**Previous:** [1 — Triage](./stage-triage) · **Next:** [3 — Plan](./stage-plan)
