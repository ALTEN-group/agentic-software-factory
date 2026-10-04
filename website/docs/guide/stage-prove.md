---
pageClass: page-stage-cyan
---

# ✅ 5 — Prove

<div class="stage-hero-banner banner-cyan">
  <span class="stage-hero-badge">STAGE 5</span>
  <span class="stage-hero-desc">Deterministic gate validation &amp; agent auto-remediation</span>
</div>

Quality is not a phase and not a human line-by-line reading marathon. In The Agentic Software Factory, Prove is the
stage that combines **dense deterministic controls for AI auto-validation** with **minimum human
validation** to build confidence that generated software is correct, safe, and aligned with client intent.

## Purpose

| Input | Output | Owner |
|---|---|---|
| The pull request from [4 — Code](./stage-code), already green in the agent's loop | A pull request that has passed every control in the CI and has human validation recorded at the level its blast radius requires, ready to release | Developer |

## Why deterministic controls replace manual code review

When code is generated autonomously by AI, requiring humans to manually read syntax line-by-line is
a dangerous anti-pattern:
- **Reviewer fatigue**: Humans skimming large diffs miss subtle logic flaws and hallucinated assumptions.
- **Cognitive bottleneck**: Delivery velocity collapses back to the speed of manual reading.
- **False security**: "Looks good to me" provides zero guarantee.

The Agentic Software Factory solves this by shifting the verification burden to **dense, objective, deterministic
controls** that execute in closed loops, reserving human attention strictly for high-level business
intent and safety boundaries.

## The deterministic control harness

Deterministic controls are binary: they either pass or fail with absolute certainty. No probabilistic
guesswork is permitted.

Most controls also run earlier, in the agent's own loop in [4 — Code](./stage-code), so failures are usually fixed before the pull request exists. Prove runs them again on the pull request, in a clean environment, as a backstop. It also runs the controls that only run in the CI. Each control is described in [Deterministic Controls](./deterministic-controls).

### The deterministic controls

| Control | Type | Enforcement | What it proves |
|---|---|---|---|
| **Clean CI Re-run** | Gate | CI in a clean environment | Re-runs the build, type check, linter, and unit and integration tests from [4 — Code](./stage-code) where the agent cannot influence the result |
| **Criteria Test Verification** | Gate | Test runner | Proves that every acceptance criterion in the Plan record has a passing assertion |
| **Contract & Schema Compatibility** | Contract | OpenAPI / JSON Schema / Pact | Guarantees that public interfaces and consumer contracts never break silently |
| **Mutation Testing Bar** | Gate | Mutation test runner | **Proves the tests themselves**: introduces mutants into code; tests must catch and kill them |
| **API Tests** | Contract | HTTP API tests (for example Supertest) | Proves each endpoint returns the agreed status codes and responses, for valid and invalid requests |
| **Fuzz Tests** | Probe | API fuzzing from the OpenAPI spec (for example RESTler) | Proves the API handles unexpected and malformed input without errors or crashes |
| **Database Tests** | Gate | SQL assertions against a migrated database (for example PostgreSQL with Liquibase) | Proves the schema and migrations behave as specified: reads, writes, archiving, and audit history |
| **E2E Tests** | Probe | Browser tests of real user journeys (for example Playwright) | Proves the main journeys work from the user's side, on the running application |
| **Security & Policy-as-Code** | Guard | Semgrep / Trivy / OPA Conftest, secret and push protection | Verifies absence of known CVEs, secrets, and policy violations. Secret and push protection also runs at commit time in Code and is enforced again here in CI |
| **Preview Smoke Tests** | Probe | Ephemeral preview | Proves the application starts, routes traffic, and responds to health checks |

The API, fuzz, database, and E2E tests are generated with the code, like unit tests, and run against a real running stack or a migrated database. Criteria Test Verification and Mutation Testing keep them honest, by proving that they cover the acceptance criteria and that they catch real defects.

## Agent auto-remediation

If any deterministic gate fails in CI, the AI agent is automatically triggered with the error
diagnostics. The agent:
1. reads the failing gate output, such as a clean re-run error, an unmet acceptance criterion, a surviving mutant, or a contract break,
2. diagnoses the exact fault,
3. autonomously fixes the code. It can never weaken or skip a deterministic control to get a pass,
4. commits the update and re-triggers the deterministic harness.

This cycle repeats automatically until every deterministic control passes, or the fix-loop limit set in
[4 — Code](./stage-code) is reached and the Developer steps in. Humans are never called to troubleshoot trivial compilation or formatting failures.

## Where AI is used

The deterministic controls decide. AI writes the test suites and does the repair work.

| Task | AI role | Human role |
|---|---|---|
| **Failure diagnosis** | Read the failing gate output and locate the fault | None for routine failures |
| **Remediation** | Rewrite the code to satisfy the gate, within the fix-loop limit, never weakening a control | Intervene only when the limit is reached |
| **Test suites** | Write and maintain the API, fuzz, database, and E2E tests that the controls run | Confirm the tests cover the acceptance criteria |

## Minimum human validation

Once all deterministic controls are green, the pull request enters **Minimum Human Validation**.
Reviewers **do not read syntax line-by-line**. Instead, human validation is restricted to three
specific questions:

1. **Client Intent**: Does this feature faithfully deliver what the client requested in the meeting?
2. **Behavioral Experience**: Does the live preview environment look, behave, and feel right?
3. **Safety & Blast Radius**: Does the change respect operational constraints and carry a clean rollback path?

### Risk-weighted human validation

How much human validation a change needs depends on its blast radius, which is classified in [2 — Think](./stage-think)
and checked again in [3 — Plan](./stage-plan) against the file scope. The tiers (Low, Medium, High, Critical) and the validation each requires are defined once in
[Governance](./governance#blast-radius-and-required-human-validation).

## The bug rule

Every production defect must result in a new automated check or control (a failing test case, a stricter
linter rule, a schema validator, or a new guard) committed before the fix. The AI agent fixes the code to satisfy the new check or control, so the bug cannot quietly return.

## Exit gate

A change leaves Prove and enters [Release](./stage-release) when:

1. every deterministic control is green,
2. minimum human validation is recorded at the level required by the blast radius,
3. for High and Critical changes, the rollback mechanism named in [Think](./stage-think) is configured and validated.
