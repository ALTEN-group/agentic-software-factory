# L4 — Proof

Quality is not a phase and not a team. Proof is the layer that converts generated drafts into
changes the organization is willing to stand behind.

## Purpose

| Input | Output | Owner |
|---|---|---|
| A pull request from [Build](./layer-build) | Evidence that the change is correct, safe, and reversible | The squad, with platform-owned gates |

## Why this layer grows

When code generation becomes cheap, the volume of change rises and the cost of verification becomes
the binding constraint. Flow Stack answers by making verification **automated, layered, and
risk-weighted** — not by adding reviewers.

## The gates

| Gate | Blocks merge | Automated | Notes |
|---|---|---|---|
| Lint / format | Yes | Yes | Style never reaches a human reviewer |
| Type check | Yes | Yes | Contracts across modules |
| Unit tests | Yes | Yes | Derived from acceptance criteria |
| Integration tests | Yes | Yes | Real dependencies in containers |
| Contract tests | Yes | Yes | For every published interface |
| Security scan | Yes | Yes | Dependencies, secrets, SAST |
| AI review pass | No (advisory) | Yes | Risk, missing tests, smells, spec drift |
| Human review | Yes | No | Level set by blast radius |
| Exploratory testing | For high-risk flows | No | Time-boxed, human, hypothesis-driven |
| Performance / fuzz | For flagged surfaces | Yes | Thresholds enforced in CI |

## Risk-weighted human review

| Blast radius | Example | Required review |
|---|---|---|
| **Low** | Copy change, internal refactor behind tests | One squad reviewer |
| **Medium** | New endpoint, schema addition, new dependency | Squad reviewer + owning engineer of the area |
| **High** | Auth, permissions, billing, PII, data migration | Two reviewers, one of them security or the engineering lead |
| **Critical** | Irreversible migration, public contract break, infrastructure change | Engineering lead sign-off + rollback plan + staged rollout |

Reviewers spend their attention proportionally to the damage a mistake would cause, not to the
number of lines a model produced.

## Where AI is used

| Task | AI role | Human role |
|---|---|---|
| Test generation | Unit, integration, contract tests from criteria | Judge whether coverage is meaningful |
| Edge-case simulation | Boundary, concurrency, failure-injection cases | Decide what must be covered |
| Defect triage | Cluster failures, propose root cause | Confirm and assign |
| Flaky test analysis | Detect patterns, propose fixes or quarantine | Approve quarantine, never silently |
| Regression coverage | Turn every production bug into a test | Verify the test would have caught it |
| Review pass | Flag risk, missing tests, spec drift | Decide what is actionable |

::: danger
An AI review is never an approval. It is an input to a human approval. A pull request approved only
by an automated reviewer cannot be merged.
:::

## The bug rule

Every production bug produces a test before it produces a fix. The test is committed in the same
pull request as the fix and fails without it.

## Exit gate

A change leaves Proof when all blocking gates are green, the required human review is recorded, and
a rollback path exists.
