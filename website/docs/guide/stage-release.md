---
pageClass: page-stage-blue
---

# 🚀 6 — Release

<div class="stage-hero-banner banner-blue">
  <span class="stage-hero-badge">STAGE 6</span>
  <span class="stage-hero-desc">Automated deployment, reversible at any step</span>
</div>

Getting a proven change in front of users with the smallest possible blast radius and the shortest
possible path back. Deployment is automatic and every step can be reversed. *Deploy* puts the artifact in
production; *release* is the separate decision to expose its behaviour to users.

## Purpose

| Input | Output | Owner |
|---|---|---|
| A change that passed [5 — Prove](./stage-prove) | Value in production, observable and reversible | Squad, on platform rails |

## Model

- Trunk-based: merge to `main` is the release trigger.
- Every merge produces an immutable, versioned artifact.
- Deploy is automatic to `staging`, then progressive to `production`.
- Feature flags decouple *deploy* from *release*.
- Every release declares its watch dashboard and outcome metric up front, which [7 — Learn](./stage-learn) takes over once the rollout completes.

```
merge to main
    ↓
[build artifact]        - immutable, versioned, signed
    ↓
[deploy staging]        - automatic, smoke tests
    ↓
[canary 5%]             - health + business metrics watched
    ↓
[progressive 25/50/100] - automatic promotion on green windows
    ↓
[flag enable]           - the actual release decision
```

## Deterministic controls in Release

The [Deterministic Controls](./deterministic-controls) that validate a change in [5 — Prove](./stage-prove) keep working after
the merge. In Release, they decide when a rollout advances and when it is reversed, using fixed rules rather
than judgement:

| Control | What it checks | Effect |
|---|---|---|
| **Promotion gate** | Health and business metrics stay inside their thresholds for the whole watch window | Rollout advances to the next step automatically |
| **Health probe** | Smoke tests in staging, then error rate, latency, and saturation per step in production | A failing probe halts the rollout |
| **Rollback threshold** | A pre-declared limit per change, set before deployment | Crossing it triggers rollback automatically |
| **Contract check** | Interface contracts still hold between the new and previous versions | A breaking contract blocks promotion |

These rules are deterministic on purpose. A threshold either holds or it does not, so the decision to
promote or reverse never depends on a model's opinion. AI helps people choose the thresholds and
explains an anomaly, but it never overrides a control. The AI-based monitoring that looks ahead for
problems belongs to [7 — Learn](./stage-learn).

Breaches also feed [Deterministic Controls](./deterministic-controls) back: a rollback that a control should have
caught earlier becomes a stricter gate or threshold.

## Rollback

| Mechanism | Time to effect | Used for |
|---|---|---|
| Feature flag off | Seconds | Behaviour regressions |
| Traffic shift back to previous version | < 1 minute | Deployment-level failures |
| Redeploy previous artifact | Minutes | Config or runtime issues |
| Forward fix | Hours | Data-affecting issues where rollback is unsafe |

Every change with a **High** or **Critical** blast radius states its rollback mechanism before it is
deployed. A change with no rollback path is not deployed; it is redesigned.

## Migrations

Schema changes are **expand → migrate → contract**, never destructive in a single step. The contract
step ships only after the previous version is fully drained from production.

## Where AI is used

| Task | AI role | Human role |
|---|---|---|
| Release notes | Draft from merged pull requests, grouped by audience | Approve customer-facing wording |
| Stakeholder summary | Translate the diff into business impact | Confirm commitments |
| Risk pre-flight | Flag risky diffs, missing flags, missing rollback | Decide to proceed |
| Rollout regression detection | Correlate metric and log anomalies with the rollout, during its watch window only. Longer-horizon prediction belongs to [7 — Learn](./stage-learn) | Trigger rollback |
| Rollback proposal | Recommend a trigger and threshold per rollout | Set and own the threshold |

::: warning
Automatic promotion is allowed. Automatic *rollback* is allowed. Automatic suppression of a rollback
alert is not. A human closes every rollback event.
:::

## Release communication

| Audience | Artifact | Cadence |
|---|---|---|
| Customers | Changelog entry | Per user-visible release |
| Support | Impact note + known issues | Per release |
| Internal | Weekly digest, AI-drafted | Weekly |

## Exit gate

A release is complete when the rollout has reached 100 %, the watch window has passed without
threshold breach, and the observability dashboard for the change is live in [Learn](./stage-learn).

A reusable prompt in Persistent Context, for example "draft release notes from these merged pull requests by audience", keeps release communication consistent.

**Previous:** [5 — Prove](./stage-prove) · **Next:** [7 — Learn](./stage-learn)
