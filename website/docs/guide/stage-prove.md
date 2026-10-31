---
pageClass: page-stage-cyan
---

# ✅ 5 — Prove

<div class="stage-hero-banner banner-cyan">
  <span class="stage-hero-badge">STAGE 5</span>
  <span class="stage-hero-desc">Deterministic gate validation &amp; agent auto-remediation</span>
</div>

Prove reruns controls in clean CI. An independent agent checks intent, behaviour, and safety. Passing changes can merge automatically, without human sign-off.

## Purpose

| Input | Output | Owner |
|---|---|---|
| A change request that passed [Code](./stage-code) checks | CI results, independent assessment, and risk-tier evidence allowing automatic merge | Developer (accountable for automation) |

## Why deterministic controls replace manual code review

Manual review cannot keep up with generated changes and can miss defects. Use executable checks and independent agent assessment. People intervene on unresolved failures or exhausted retries.

## The deterministic control harness

Controls return pass or fail. Most already ran in [Code](./stage-code); Prove reruns them in clean CI and adds CI-only checks. See [Deterministic Controls](./deterministic-controls).

### The deterministic controls

| Control | Type | Enforcement | What it checks |
|---|---|---|---|
| **Clean CI Re-run** | Gate | Clean CI environment | Reruns the build, types, lint, and tests from [Code](./stage-code), outside the agent's control |
| **Criteria Test Verification** | Gate | Test runner | Each Plan criterion has a passing assertion |
| **Contract & Schema Compatibility** | Contract | OpenAPI / JSON Schema / Pact | Public interfaces do not break consumers silently |
| **Mutation Testing Bar** | Gate | Mutation test runner | Tests detect injected defects |
| **API Tests** | Contract | HTTP tests, e.g. Supertest | Status codes and responses match the contract for valid and invalid requests |
| **Fuzz Tests** | Probe | OpenAPI fuzzing, e.g. RESTler | Malformed input does not cause server errors or crashes |
| **Database Tests** | Gate | SQL assertions on a migrated database | Reads, writes, migrations, archiving, and audit history match the spec |
| **E2E Tests** | Probe | Browser tests, e.g. Playwright | Main user journeys work on the running app |
| **Security & Policy-as-Code** | Guard | Semgrep / Trivy / OPA Conftest, secret protection | Scans for known vulnerabilities, secrets, and policy violations. Secret checks also run at commit time |
| **Preview Smoke Tests** | Probe | Ephemeral preview | Startup, routing, and health endpoints work |

Generate API, fuzz, database, and E2E tests with the code. Run them on a real stack or migrated database. Check criterion coverage and use mutation testing to assess whether tests catch injected defects.

## Agent auto-remediation

When a CI gate fails, the agent:
1. reads the diagnostics,
2. finds and fixes the fault without changing or skipping controls,
3. commits the fix and reruns the checks.

Repeat until all checks pass or the [retry limit](./stage-code) is reached. Then escalate to a developer.

## Where AI is used

Controls decide pass/fail. AI writes tests, repairs code, and performs the independent assessment.

| Task | AI role | Human role |
|---|---|---|
| **Failure diagnosis** | Read the failing gate output and locate the fault | None for routine failures |
| **Remediation** | Rewrite the code to satisfy the gate, within the fix-loop limit, never weakening a control | Intervene only when the limit is reached |
| **Test suites** | Write and maintain suites; controls verify acceptance-criteria coverage | Intervene if coverage cannot be established |

## Independent automated assessment {#minimum-human-validation}

An independent Prove agent records evidence for three questions:

1. **Client Intent**: Does this feature faithfully deliver what the client requested in the meeting?
2. **Behavioral Experience**: Does the live preview environment look, behave, and feel right?
3. **Safety & Blast Radius**: Does the change respect operational constraints and carry a clean rollback path?

### Risk-weighted automated validation

The evidence required depends on the blast radius, classified in [2 — Think](./stage-think)
and checked in [3 — Plan](./stage-plan). All tiers can proceed automatically; High and Critical retain rollback verification and Critical retains staged rollout requirements, as defined in
[Governance](./governance#blast-radius-and-required-human-validation).

## The bug rule

Every production defect must result in a new automated check or control (a failing test case, a stricter
linter rule, a schema validator, or a new guard) committed before the fix. The AI agent fixes the code to satisfy the new check or control, so the bug cannot quietly return.

## Agents and skills {#primitives-in-persistent-context}

Prove runs on deterministic verification primitives published by [coding-pal](https://alten-group.github.io/coding-pal/):

### Auto-Remediation & Governance
- A **Gate Fixer** agent reads failing gate diagnostics and surgically repairs the implementation within the fix-loop limit.
- A **prove-controls** instruction enforces control integrity: agents may run controls but never weaken, edit, or bypass them; waivers require a documented reason, approver, and expiry; bug fixes require a failing test first.

### Verification & Quality Gate Skills
- A **criteria-verify** skill parses test reports and verifies 100% assertion coverage for every acceptance criterion in `plan.md`.
- A **mutation-bar** skill executes mutation testing against changed code, asserting that tests catch and kill injected mutants to prevent false-positive suites.
- A **contract-compat** skill verifies that public API contracts, schemas, and message formats remain backward-compatible with consumers.

### Integrity, Security & Behavioral Probes
- A **control-guard** skill protects the harness itself: detects and rejects any PR that weakens test thresholds, disables workflows, or touches protected control files, while enforcing the bug rule.
- A **secret-guard** and **dependency-guard** skill verify zero hardcoded tokens/keys and ensure newly introduced packages comply with license and vulnerability policies.
- A **preview-smoke** skill probes the running ephemeral deployment to verify startup, HTTP routing, and health checks before merge.

### Pipeline & Automated Approval
- A **pr-record** skill validates automated assessment results, rollback evidence, and staged rollout references according to the tier determined in Think and Plan. It never presents automation as human sign-off.
- A **verification-pipeline** workflow template provides the clean-room CI skeleton that executes the gates in order.

See the [coding-pal Prove guide](https://alten-group.github.io/coding-pal/guide/domain-prove).

## Delivery pipeline

The Prove pipeline validates an existing change request before it can be merged, using the shared [triggers and checkpoints](./platform-rails#triggers-checkpoints-and-status):

1. Sets the work item's phase status to **Prove** (or **Release** on a combined board) before validation starts; this does not mean the change has passed.
2. Runs checks covering specs, scope, secrets, dependencies, tests, builds, acceptance criteria, and change-request metadata.
3. Runs the Prove agent to assess the implementation and write a validation record.
4. If checks fail, runs automatic fixes and retries up to the configured limit, **5 attempts in the factory baseline**, then requests developer intervention.
5. Records the evidence-backed automated verdict and authorizes merge when all required controls and assessments pass, at every blast radius.

After validation, the platform merges and removes the branch according to delivery policy. It passes the revision and evidence to [Release](./stage-release#publication-and-deployment-pipelines).

Set **Done** only at the agreed completion point: merge, publication, or rollout.

**Stops at:** requested review, handoff to Release, or unresolved failure. Reaching the retry limit blocks merge. A later delivery failure does not undo a merge; follow the release recovery policy.

**A successful Prove run does not by itself prove publication or production rollout.** Track those outcomes in their own pipelines.

## Exit gate

A change leaves Prove and enters [Release](./stage-release) when:

1. every deterministic control is green,
2. independent automated assessment and required risk-tier evidence are recorded,
3. for High and Critical changes, the rollback mechanism named in [Think](./stage-think) is configured and validated.
