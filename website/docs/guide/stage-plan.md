---
pageClass: page-stage-indigo
---

# 📋 3 — Plan

<div class="stage-hero-banner banner-indigo">
  <span class="stage-hero-badge">STAGE 3</span>
  <span class="stage-hero-desc">Implementation breakdown, file scope &amp; boundary constraints</span>
</div>

Plan turns the chosen approach into small, ordered steps. Each step lists the files, action, code, verification command, and application startup check.

A good plan answers three questions before any code is written:

1. **Where** may the agents work, and where must they not?
2. **In what order** should the steps run? Is each step small enough to check on its own?
3. **How do we prove** each step, and the whole change, is right?

## Purpose

| Input | Output | Owner |
|---|---|---|
| The validated Think record from [2 — Think](./stage-think) | A plan with the file scope, acceptance criteria, an ordered implementation checklist, code to implement, and a test plan | Architect + Developer |

## The Plan record

The Plan record is committed with the work item alongside the backlog issue and the Think record.

| Section | Description |
|---|---|
| **File scope & boundaries** | The files and areas the agents may change, and the ones they must not touch |
| **Prerequisites** | Dependencies, environment variables, or services needed before Step 1 |
| **Acceptance criteria** | 3 to 8 observable statements that are either true or false, written so a test can check them |
| **Implementation checklist** | Ordered, atomic steps, each with its files, action, new code, a verification command, a bootable check, and the criterion it serves |
| **Test plan** | For each acceptance criterion, which test proves it and in which step it is created |
| **Open questions & assumptions** | Anything unanswered or assumed at the implementation level. Open questions are answered before Code starts |

Include Think's context updates as steps. Add a reverse step for changes a code revert cannot undo, such as data migrations. High/Critical rollback mechanisms are named in [Think](./stage-think#the-think-record).

### Acceptance criteria

Criteria are written so that a test can check them without judgement:

```text
- Given an unauthenticated request to GET /api/v1/orders, then the response is 401 with an empty body.
- Given a user with the role viewer, when sending POST /api/v1/orders, then the response is 403.
- Given a valid order for a known product, when POST /api/v1/orders, then the response is 201 and exactly one order.created event is published.
- Given an order for an unknown product, when POST /api/v1/orders, then the response is 400 and no row is written.
```

### The implementation checklist

Each step is one small change that can be checked on its own. A step has:

| Field | Meaning |
|---|---|
| **Files** | The exact files to create or change. Nothing outside the file scope |
| **Action** | What the step does, in one line |
| **New code** | The code to implement for this step, drafted by AI |
| **Verification** | A narrow command that proves this step, for example one test file |
| **Bootable check** | A command that proves the whole application still starts and works after the step |
| **Serves** | The acceptance criterion this step helps to satisfy |

A step is well formed when:

- it does **one thing**, and is small enough for an agent to finish within a few fix loops (see the fix-loop count in [Metrics](./metrics)),
- it **depends only on earlier steps**, so the order always builds,
- it leaves the application **bootable**, never half-broken,
- it can be **checked by a command**, not by opinion,
- every file in the file scope appears in a step, and **no step touches a file outside it**.

## Where AI is used

AI produces, cross-checks, and approves the plan automatically. The Developer and Architect intervene only when a failed control or unresolved ambiguity prevents continuation.

| Task | Autonomous AI responsibility | Human exception handling |
|---|---|---|
| **File scope & prerequisites** | Define and validate file boundaries and dependencies from Think | Resolve a boundary conflict |
| **Acceptance criteria** | Derive observable criteria and check traceability to the request | Resolve ambiguity that prevents validation |
| **Implementation checklist** | Generate and validate ordered, atomic steps | Handle an unresolvable validation failure |
| **Step verification & test plan** | Map every criterion to runnable checks and tests | Repair gaps in the control policy |
| **Open questions & assumptions** | Resolve from available evidence; make assumptions explicit | Supply missing intent when validation cannot proceed |
| **Plan output validation** | Run deterministic checks and record automated approval | Intervene after unresolved failure |

## Agents and skills {#primitives-in-persistent-context}

Plan runs on Persistent Context primitives from [coding-pal](https://alten-group.github.io/coding-pal/):

- A **Planner** agent converts the Think record into atomic steps, establishes explicit file boundaries, and drafts `plan.md`.
- A **plan** instruction requires atomic steps, mapped tests, code snippets, and no scope expansion beyond Think.
- The **think-plan** skill checks file scope, step coverage, acceptance tests, and risk-tier consistency against Think.
- The **Think record** (`think.md`) is the immediate Persistent Context input that bounds the plan.

See the [coding-pal Think & Plan guide](https://alten-group.github.io/coding-pal/guide/domain-think-plan).

## Delivery pipeline

The Plan pipeline converts the specification into an implementation plan, using the shared [triggers and checkpoints](./platform-rails#triggers-checkpoints-and-status):

1. Restores the validated Think spec.
2. Sets status to **Plan** before running the agent.
3. Defines the steps, files, tests, and docs.
4. Validates the plan against Think.
5. Links the versioned plan to the work item.
6. Records automated approval and hands off to [Code](./stage-code#delivery-pipeline), unless review was requested.

**Stops at:** requested review, failed validation, or handoff to Code. Status stays **Plan** until Code starts. Report unresolved failures to a developer; unrelated queued work can continue.

## Exit gate

A work item leaves Plan and enters [4 — Code](./stage-code) only when:

1. every in-scope file has a step; no step touches an out-of-scope file,
2. every criterion is observable and covered by a step and a test,
3. each ordered step lists its files, action, new code, verification command, and bootable check,
4. open questions are answered, and assumptions are recorded,
5. any change that a revert cannot undo has its own reverse step,
6. the risk tier and validation requirements match the final scope,
7. the plan passes deterministic validation and its automated approval is recorded.
