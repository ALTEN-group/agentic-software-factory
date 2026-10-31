---
pageClass: page-stage-pink
---

# 💡 2 — Think

<div class="stage-hero-banner banner-pink">
  <span class="stage-hero-badge">STAGE 2</span>
  <span class="stage-hero-desc">Options exploration, trade-offs &amp; architectural decisions</span>
</div>

Think chooses how to solve a prioritized issue. AI compares options, reuses [Forge](./forge) assets, and follows Persistent Context rules. [Plan](./stage-plan) then turns the chosen approach into tasks.

## Purpose

| Input | Output | Owner |
|---|---|---|
| A `todo` issue from [Triage](./stage-triage), [Forge](./forge), and Persistent Context | Chosen approach, options, reusable assets, constraints, risk tier, and required decision records | Developer + Architect |

## The Think record

Each work item records its approach before planning starts.

| Field | Content | Length |
|---|---|---|
| **Options considered** | The credible approaches, including reuse from the Forge versus custom build | 2–4 options |
| **Chosen approach** | The selected option and the reasoning behind it | 1 paragraph |
| **Forge asset bindings** | Pre-approved reusable services, libraries, and API contracts composed into the approach | List of Forge references |
| **Constraints & invariants** | Decision records, security, compliance, latency, and schema compatibility rules that bound the solution | Bullets |
| **Blast radius** | Affected systems and [risk tier](./governance#blast-radius-and-required-human-validation): Low, Medium, High, or Critical. This sets [Prove](./stage-prove) evidence requirements. High/Critical also name the rollback | Tier + bullets |

[Plan](./stage-plan) reuses these decisions and checks whether its file scope raises the risk tier.

## Where AI is used

AI compares options, chooses the approach, and records why. The Architect and Developer own the constraints and handle unresolved failures—not routine approval.

| Task | Autonomous AI responsibility | Human exception handling |
|---|---|---|
| **Option exploration** | Evaluate trade-offs, cost, and risk; choose and justify an approach | Resolve an ambiguity that prevents validation |
| **Forge discovery & composition** | Select suitable assets and validate integration bindings | Resolve failed compatibility checks |
| **Codebase & context scan** | Ground the approach in actual components and constraints | Correct a missing or conflicting constraint |
| **Impact & contract analysis** | Set the blast radius and record API, schema, and boundary decisions | Handle unresolved control failures |

## Decision records

AI chooses the approach for every change using repository evidence, constraints, and conventions.
Public API, database schema, service-boundary changes, and all Critical changes also require a formal decision record.
The record names the automation and date, passes validation, and is committed to Persistent Context.
All risk tiers proceed automatically when their controls pass. No human signature is required or fabricated.

## Agents and skills {#primitives-in-persistent-context}

Think runs on Persistent Context primitives published by [coding-pal](https://alten-group.github.io/coding-pal/):

- A **Thinker** agent explores 2 to 4 options, discovers Forge candidates, sets the blast radius, and writes the `think.md` record.
- A **think** instruction enforces repository constraints and explicit attribution of AI decisions.
- The **think-plan** skill deterministically validates the Think record: 2 to 4 credible options, valid Forge bindings, blast radius tier justification, and a named rollback mechanism for High and Critical tiers.
- The **decision records** (`docs/decisions/`) and **Forge catalog** (`docs/forge/`) are the Persistent Context resources the agent inspects to constrain solutions and bind reusable assets.

See the [coding-pal Think & Plan guide](https://alten-group.github.io/coding-pal/guide/domain-think-plan).

## Delivery pipeline

The Think pipeline turns a work item into a validated specification, using the shared [triggers and checkpoints](./platform-rails#triggers-checkpoints-and-status):

1. Checks the queue and existing work: wait, start Think, or resume a later phase.
2. Sets status to **Think** before running the agent.
3. Defines the problem, approach, scope, and constraints.
4. Validates the spec and links it to the work item.
5. Creates linked upstream work if needed and blocks this item until it is delivered.
6. Records automated approval and hands off to [Plan](./stage-plan#delivery-pipeline), unless review was requested.

**Stops at:** requested review, an upstream dependency, or handoff to Plan. Status stays **Think** until Plan starts. Report unresolved failures to a developer; unrelated queued work can continue.

### Resume after an upstream delivery

A dependency-resume pipeline restarts consumer work after an upstream delivery notification:

1. Identifies the delivered component/version and verifies that the required artifact is available to consumers.
2. Finds blocked work items linked to that dependency.
3. Adds upgrade instructions and clears the dependency block once the prerequisite is satisfied.
4. Queues the items for resumption, reusing still-valid records and starting the next eligible phase when capacity is available.

**Stops at:** unblocked work queued for resumption, or no matching work. Keep the block if the artifact is unavailable. This pipeline does not implement, merge, or publish the consumer.

## Exit gate

A work item leaves Think and enters [3 — Plan](./stage-plan) only when:

1. options are compared and an approach is chosen,
2. applicable Forge assets are bound,
3. Persistent Context constraints are checked,
4. the [risk tier](./governance#blast-radius-and-required-human-validation) is justified, with rollback named for High/Critical,
5. required decision records are validated, and context updates are listed for Plan.
