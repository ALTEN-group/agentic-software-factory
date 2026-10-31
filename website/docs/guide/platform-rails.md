# 🛤️ Platform Rails

Platform Rails give every squad a ready-to-use delivery setup.

## Purpose

Make safe, autonomous delivery the default.

## What Platform Rails provide

### Forge, Persistent Context & agents catalog

The rails distribute [the Forge](./forge), [Persistent Context](./persistent-context), and the [Deterministic Controls](./deterministic-controls) to every project, so every squad starts from the same set. The Architect owns their content.

### Delivery pipeline

Every repository gets the same verification skeleton: automated checks and controls in the agent's loop, then the same checks and controls again in the CI.

The stage pages describe the delivery pipeline for [Think](./stage-think#delivery-pipeline), [Plan](./stage-plan#delivery-pipeline), [Code](./stage-code#delivery-pipeline), [Prove](./stage-prove#delivery-pipeline), and [publication/deployment](./stage-release#publication-and-deployment-pipelines). The same flow can run on any Git hosting and CI/CD platform.

#### Triggers, checkpoints, and status

**Triggers start work; statuses report progress.** Triggers can be actions, labels, API calls, or manual launches. A board-status change starts work only if configured to do so.

Let the requester choose how far to run:

| Requested checkpoint | Runs until |
|---|---|
| Think | Validated specification, then human review |
| Plan | Validated implementation plan, then human review |
| Code | Open change request (pull request or merge request), then human review |
| Complete delivery | Prove, authorized merge, and configured publication/deployment steps |

Queue work to limit concurrent runs. On resume, reuse valid specs and existing change requests. Revalidate anything affected by changed requirements or code.

Review pauses are optional. Otherwise, all risk tiers proceed automatically after validation. Record the agent identity, evidence, and date—not a human signature.

**A phase status means the phase has started, not passed.** Set it before running the agent. Example board mapping:

| Workflow | Status at phase start | Status after successful completion |
|---|---|---|
| Think | **Think** | Stays **Think** until Plan starts |
| Plan | **Plan** | Stays **Plan** until Code starts |
| Code | **Code** | Stays **Code** until Prove starts, including during human review |
| Prove | **Prove** (or **Release** on a combined board) | Records validation success; **Done** only when the agreed completion criteria are met |

Use a separate indicator for review pauses; no review column is required. Give automation permission to update work items and publish results.

**Done means completed.** Define whether that means merged, published, or fully deployed. Failed runs may keep their phase status; record the failure separately so they do not look active.

::: warning Merge and delivery boundaries
Merge only after controls and independent Prove assessment pass. Escalate unresolved failures; never weaken controls. Publication and deployment may run separately: passing Prove does not mean the change is live.
:::

### One Git platform

Standardized on the **Git ecosystem** to eliminate tool sprawl and preserve an unbroken context graph for AI agents, as detailed in **[Tooling](./tooling)**.
