# 5 — Release

Getting a proven change in front of users with the smallest possible blast radius and the shortest
possible path back.

## Purpose

| Input | Output | Owner |
|---|---|---|
| A change that passed [4 — Proof](./layer-proof) | Value in production, observable and reversible | Squad, on platform rails |

## Model

- Trunk-based: merge to `main` is the release trigger.
- Every merge produces an immutable, versioned artifact.
- Deploy is automatic to `staging`, then progressive to `production`.
- Feature flags decouple *deploy* from *release*.

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
| Regression detection | Correlate metric and log anomalies with the rollout | Trigger rollback |
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
threshold breach, and the observability dashboard for the change is live in [Learn](./layer-learn).
