---
pageClass: page-stage-blue
---

# 🚀 6 — Release

<div class="stage-hero-banner banner-blue">
  <span class="stage-hero-badge">STAGE 6</span>
  <span class="stage-hero-desc">Automated deployment, reversible at any step</span>
</div>

Release delivers a change that has passed the Prove stage safely. The change is deployed automatically to a test environment then in to production. In production it reaches users gradually, and every
step can be undone quickly if something goes wrong.

Deploying and releasing are two different things. Deploying puts the new code in production, switched off. Releasing is
switching it on for users, for a few at first, then for everyone.

## Purpose

| Input | Output | Owner |
|---|---|---|
| A change that passed [5 — Prove](./stage-prove) | Value in production, observable and reversible | DevOps |

## Model

- Trunk-based: a tag on `main` is the release trigger.
- Every release produces an immutable, versioned artifact.
- Deploy is automatic to `staging`, then progressive to `production`.
- The `enable` feature flag lets you deploy code before releasing it to users.
- Every release uses the outcome metric already committed in the [1 — Triage](./stage-triage) backlog issue. [7 — Learn](./stage-learn) takes over and checks it once the rollout completes.

```mermaid
---
caption: From merge to users, automated and reversible at every step
config:
  flowchart:
    padding: 8
    wrappingWidth: 320
    nodeSpacing: 30
    rankSpacing: 34
---
flowchart TB
  MERGE(["&nbsp;&nbsp;Tag on main&nbsp;&nbsp;"])
  BUILD["Build the artifact<br/>immutable, versioned, signed"]
  STAGING["Deploy to staging<br/>smoke &amp; QA tests"]
  CANARY["Canary 5%<br/>health & business metrics watched"]
  PROG["Progressive 25%, 50%, 100%<br/>automatic promotion on green windows"]
  FLAG(["&nbsp;&nbsp;Flag enabled for everyone&nbsp;&nbsp;"])
  BACK(["&nbsp;&nbsp;Roll back&nbsp;&nbsp;"])

  MERGE --> BUILD --> STAGING --> CANARY --> PROG --> FLAG
  CANARY -.->|"threshold breached"| BACK
  PROG -.->|"threshold breached"| BACK

  classDef start fill:#4338ca,stroke:#6366f1,color:#ffffff
  classDef step fill:#0369a1,stroke:#0ea5e9,color:#ffffff
  classDef done fill:#047857,stroke:#10b981,color:#ffffff
  classDef back fill:#b45309,stroke:#f59e0b,color:#ffffff
  class MERGE start
  class BUILD,STAGING,CANARY,PROG step
  class FLAG done
  class BACK back
```

The `enable` feature flag is the actual release decision. Everything before it is deployment. The rollback paths are in the [Rollback](#rollback) section below.

## Rollout rules

The deployment pipeline applies a few fixed rules at each step. They are standard features of progressive delivery
tooling, and no AI is involved in these decisions.

| Rule | What it checks | Effect |
|---|---|---|
| **Promotion** | Health and business metrics stay inside their thresholds for the whole watch window | The rollout advances to the next step automatically |
| **Health check** | Smoke and QA tests in staging, then error rate, latency, and saturation at each step in production | A failing check halts the rollout |
| **Rollback threshold** | A limit declared per change before deployment | Crossing it triggers rollback automatically |

Watching for problems after the release belongs to [7 — Learn](./stage-learn).

## Rollback

| Mechanism | Time to effect | Used for |
|---|---|---|
| Feature flag off | Seconds | Behavior regressions |
| Traffic shift back to previous version | < 1 minute | Deployment-level failures |
| Redeploy previous artifact | Minutes | Config or runtime issues |
| Forward fix | Hours | Data-affecting issues where rollback is unsafe |

Every change with a **High** or **Critical** blast radius has its rollback mechanism named in the
[Think record](./stage-think#the-think-record) and validated in [5 — Prove](./stage-prove) before it is deployed. A change with no rollback path is not deployed.

## Where AI is used

AI has no role in Release itself. The release notes and the changelog are drafted from merged pull requests during Code stage, and a developer approves them. The rollout runs on standard deployment tooling, with no AI involved.

## Primitives in Persistent Context

Release separates declaration from execution, running on primitives published by [coding-pal](https://alten-group.github.io/coding-pal/):

### Declaration & Planning Primitives
- A **Release Planner** agent synthesizes the blast radius and rollback from `think.md`, the file scope from `plan.md`, and the outcome metric from `triage.md` into the `release.md` declaration.
- A **release** instruction enforces release standards: deploy is not release, the feature flag is the release decision, releases are tightly scoped to primary issues (avoiding large unneeded batches), immutable versioned artifacts, and DevOps sign-off before tagging.

### Deterministic Gate & Rollout Skills
- A **release-plan (validator)** skill (`validate-release.mjs`) deterministically gates the declaration: proves tier parity with Think and Plan, asserts strict canary percentage ladders, validates health thresholds (error rate, latency, saturation), and verifies the rollback mechanism.
- A **release-plan (evaluator)** skill (`evaluate-rollout.mjs`) reads live observability metrics during the rollout to compute **promote**, **hold**, or **rollback** deterministically, with zero AI involvement.

### Pipeline Infrastructure & Records
- The **Release record** (`specs/issue-<n>/release.md`) defines the rollout stages, watch windows, thresholds, and Learn outcome metric.
- A **release workflow template** (`release.yml`) provides the GitHub Actions progressive rollout pipeline (artifact tagging, staging smoke check, canary steps, and automated rollback execution).

See the [coding-pal Release guide](https://alten-group.github.io/coding-pal/guide/domain-release).

## Exit gate

A release is complete when the rollout has reached 100%, the watch window has passed without
threshold breach, and the observability dashboard for the change is live in [Learn](./stage-learn).
