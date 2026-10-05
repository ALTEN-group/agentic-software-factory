# 🛡️ Deterministic Controls

Guards, gates, contracts, and probes: the automated, deterministic controls that make the safe path the only path.

## Why

AI agents generate a large volume of change at high speed, and **developers do not code manually** or read it line by
line. Rules that depend on people remembering them cannot keep up. The rules have to run on their own and return pass
or fail.

> A squad or agent should have to work hard to do something unsafe, and should never have to work
> hard to do something safe.

Any rule that only exists in a policy document is not a control. It is a hope. In the Agentic Software Factory,
**all deterministic controls are executable and deterministic**.

## Deterministic Controls and Persistent Context

Deterministic controls are not the same thing as [Persistent Context](./persistent-context), but they are part of it.

- **Different jobs.** Persistent Context holds the knowledge that guides agents: instructions, prompts, skills, and
  agents. The model reads it and interprets it. A control is a script that returns pass or fail, so the agent cannot
  reinterpret the result.
- **Delivered the same way.** Controls are packaged as skills, so they live and travel like the rest of Persistent
  Context. They are kept in the shared repository or in the project, installed into each project, versioned, and
  reviewed through pull requests. In [coding-pal](https://alten-group.github.io/coding-pal/guide/deterministic-controls),
  the guards, gates, contracts, and probes are skills that agents run in their own loop.

## Automated checks and deterministic controls

Both are deterministic: a script returns pass or fail, never an opinion. They differ in what they check.

| | Automated checks | Deterministic controls |
|---|---|---|
| **What** | Compiler and build, type checks, linters, and automated tests generated with the code | Guards, gates, contracts, and probes |
| **Purpose** | Prove the code works | Prove the change is safe to merge and release |
| **Where they run** | In the agent's own loop in [4 — Code](./stage-code), then again in the CI on the pull request in [5 — Prove](./stage-prove) | The same two places |
| **Can the agent change them?** | The agent writes the tests, so it can edit them | The rules and scripts are fixed, and the agent runs them but does not change them. Generated test suites are held to account by Criteria Test Verification and Mutation Testing |

Running them early keeps the loop fast: a failure is fixed in seconds inside the agent's loop, not in a later CI cycle. The repeat run in the CI is a backstop, in a clean environment, for anything that slipped through. The CI also runs controls that only run there, such as the preview smoke tests.

## The controls

| Control | Type | Runs in | Enforcement | Purpose |
|---|---|---|---|---|
| **Secret & Push Protection** | Guard | Agent loop, commit time, and CI | Platform git hooks & CI | Blocks commits containing credentials, tokens, or private keys immediately |
| **Policy-as-Code** | Guard | Agent loop and CI | Open Policy Agent (OPA) / Conftest | Enforces infrastructure, security, and cloud configuration rules deterministically |
| **License & SAST Scan** | Guard | Agent loop and CI | Semgrep / Snyk / Trivy | Blocks unauthorized open-source licenses and known vulnerable dependencies |
| **Clean CI Re-run** | Gate | CI (backstop) | CI in a clean environment | Repeats the checks and controls on the pull request, where the agent cannot influence the result |
| **Criteria Test Verification** | Gate | Agent loop and CI | Test runner | Proves that 100% of acceptance criteria from the Plan record have passing assertions |
| **Mutation Testing Bar** | Gate | Agent loop and CI | Stryker / Mutmut | Proves that generated test suites are meaningful and actually catch injected defects |
| **Contract & Schema Compatibility** | Contract | Agent loop and CI | OpenAPI / JSON Schema / Pact | Proves that changes do not break external consumers or downstream APIs |
| **API Tests** | Contract | Agent loop and CI | HTTP API tests (for example Supertest) | Proves each endpoint returns the agreed status codes and responses |
| **Fuzz Tests** | Probe | CI (preview) | API fuzzing from the OpenAPI spec (for example RESTler) | Proves the API handles unexpected and malformed input without errors or crashes |
| **Database Tests** | Gate | Agent loop and CI | SQL assertions against a migrated database | Proves the schema and migrations behave as specified |
| **E2E Tests** | Probe | CI (preview) | Browser tests of real user journeys (for example Playwright) | Proves the main journeys work on the running application |
| **Preview Smoke Tests** | Probe | CI (preview) | Ephemeral preview | Proves the application starts, routes traffic, and responds to health checks |

## How the controls get stronger

[7 — Learn](./stage-learn) feeds back into this page: a defect or rollback that a control should have caught
earlier becomes a stricter gate, threshold, or probe.

## Failure mode to avoid

Controls that fire constantly on false positives get disabled. Each control has an owner who
watches its signal-to-noise ratio; a control that is routinely bypassed is either fixed or
removed, never left as decorative.
