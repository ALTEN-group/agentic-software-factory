---
pageClass: page-stage-indigo
---

# 📋 3 — Plan

<div class="stage-hero-banner banner-indigo">
  <span class="stage-hero-badge">STAGE 3</span>
  <span class="stage-hero-desc">Implementation breakdown, file scope &amp; boundary constraints</span>
</div>

Where the chosen approach becomes an ordered implementation checklist for the coding agents. Each step names the files to change, the action, the new code to implement, a narrow verification, and a bootable check.

A good plan answers three questions before any code is written:

1. **Where** may the agents work, and where must they not ?
2. **In what order**, in steps small enough to check one by one ?
3. **How do we prove** each step, and the whole change, is right ?

## Purpose

| Input | Output | Owner |
|---|---|---|
| The validated Think record from [2 — Think](./stage-think) | A plan with the scope, acceptance criteria, an ordered implementation checklist, and a test plan | Architect + developer |

## The Plan record

The Plan record is committed with the work item alongside the backlog issue and the Think record.

| Section | Description |
|---|---|---|
| **File scope & boundaries** | The files and areas the agents may change, and the ones they must not touch |
| **Prerequisites** | Dependencies, environment variables, or services needed before Step 1 |
| **Acceptance criteria** | 3 to 8 observable statements that are either true or false, written so a test can check them |
| **Implementation checklist** | Ordered, atomic steps, each with its files, action, new code, a verification command, a bootable check, and the criterion it serves
| **Test plan** | For each acceptance criterion, which test proves it and in which step it is created |
| **Open questions & assumptions** | Anything unanswered or assumed at the implementation level. Open questions are answered before Code starts |

Changes to Persistent Context identified in Think, such as a new instruction or skill, appear as steps in the checklist like any other work. 
A plan has usually no rollback section as a revert normally undoes a change. A change that a revert cannot undo, such as a data migration, gets its own reverse step in the checklist. For High and Critical changes, the rollback mechanism is named in the [Think record](./stage-think#the-think-record).

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

AI turns the validated Think record into the plan; the developer validates. Helped by the architect if necessary.

| Task | AI role | Human role |
|---|---|---|
| **File scope & prerequisites** | Draft the file scope and the dependencies needed before Step 1, from the Think record and the codebase | Confirm the file boundaries and the dependencies |
| **Acceptance criteria** | Convert the need into observable, true-or-false statements, and flag any that are vague | Confirm they match what the client asked for |
| **Implementation checklist** | Break the scope into ordered, atomic steps with exact files, actions, and new code | Validate scope, file boundaries, and order |
| **Step verification & test plan** | Provide a narrow verification command and bootable check for each step, and map criteria to tests | Confirm the checks cover every acceptance criterion |
| **Open questions & assumptions** | List open questions and assumptions at the implementation level | Answer the questions and confirm the assumptions |
| **Plan output validation** | Check that every section is present, every step has the required fields, and no file is outside scope | Review and approve the plan |

## Exit gate

A work item leaves Plan and enters [4 — Code](./stage-code) only when:

1. the file scope is defined, and every in-scope file is covered by an implementation step, with no out-of-scope files added,
2. every acceptance criterion is observable, and each one is covered by a step and a test,
3. each ordered step lists its files, action, new code, verification command, and bootable check,
4. open questions are answered, and assumptions are recorded,
5. any change that a revert cannot undo has its own reverse step,
6. the blast radius tier from Think still holds for the file scope. If the plan touches more than Think assumed, such as authentication, data, or a public contract, the tier is raised and the required human validation changes with it,
7. the developer has reviewed and approved the plan.
