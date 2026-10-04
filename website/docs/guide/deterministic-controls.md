# Deterministic Controls

Guards, gates, contracts, and probes: the automated, deterministic controls that make the safe path the only path.
Agentic Software Factory relies on them fundamentally because **developers do not code manually** and AI agents
generate massive volumes of change at high velocity.

## Principle

> A squad or AI agent should have to work hard to do something unsafe, and should never have to work
> hard to do something safe.

Any rule that only exists in a policy document is not a control. It is a hope. In Agentic Software Factory,
**all deterministic controls are executable, deterministic, and non-probabilistic**.

## Automated checks and deterministic controls

Both are deterministic: a script returns pass or fail, never an opinion. They differ in what they check.

| | Automated checks | Deterministic controls |
|---|---|---|
| **What** | Compiler and build, strict type checks, AST linters, and the unit and integration tests generated with the code | Guards, gates, contracts, and probes |
| **Purpose** | Prove the code works | Prove the change is safe to merge and release |
| **Where they run** | In the agent's own loop in [4 — Code](./stage-code), then again in the CI on the pull request in [5 — Prove](./stage-prove) | The same two places, and some also in [6 — Release](./stage-release) |
| **Can the agent change them?** | Tests are written by the agent, so it can edit them | Controls are fixed scripts and rules that the agent runs but does not change |

Running them early keeps the loop fast: a failure is fixed in seconds inside the agent's loop, not in a later CI
cycle. Controls are packaged as skills that any agent can call, as pre-commit hooks, or as CI steps. The repeat run in
the CI is a backstop, in a clean environment, for anything that slipped through. The CI also runs controls that only run there, such as the preview smoke tests.

## The controls

| Control | Type | Runs in | Enforcement | Purpose |
|---|---|---|---|---|
| **Secret & Push Protection** | Guard | Agent loop, commit time, and CI | Platform git hooks & CI | Blocks commits containing credentials, tokens, or private keys immediately |
| **Policy-as-Code** | Guard | Agent loop and CI | Open Policy Agent (OPA) / Conftest | Enforces infrastructure, security, and cloud configuration rules deterministically |
| **License & SAST Scan** | Guard | Agent loop and CI | Semgrep / Snyk / Trivy | Blocks unauthorized open-source licenses and known vulnerable dependencies |
| **Clean CI Re-run** | Gate | CI (backstop) | CI in a clean environment | Repeats the checks and controls on the pull request, where the agent cannot influence the result |
| **Criteria Test Verification** | Gate | Agent loop and CI | Test runner | Proves that 100% of acceptance criteria from the Plan record have passing assertions |
| **Mutation Testing Bar** | Gate | Agent loop and CI | Stryker / Mutmut | Proves that generated test suites are meaningful and actually catch injected defects |
| **Contract & Schema Compatibility** | Contract | Agent loop, CI, and Release | OpenAPI / JSON Schema / Pact | Proves that changes do not break external consumers or downstream APIs |
| **API Tests** | Contract | Agent loop and CI | HTTP API tests (for example Supertest) | Proves each endpoint returns the agreed status codes and responses |
| **Fuzz Tests** | Probe | CI (preview) | API fuzzing from the OpenAPI spec (for example RESTler) | Proves the API handles unexpected and malformed input without errors or crashes |
| **Database Tests** | Gate | Agent loop and CI | SQL assertions against a migrated database | Proves the schema and migrations behave as specified |
| **E2E Tests** | Probe | CI (preview) | Browser tests of real user journeys (for example Playwright) | Proves the main journeys work on the running application |
| **Preview Smoke Tests** | Probe | CI (preview) | Ephemeral preview | Proves the application starts, routes traffic, and responds to health checks |
| **Promotion Gate** | Gate | Release | Rollout pipeline | Advances a rollout only while health and business metrics stay inside their thresholds |
| **Health Probe** | Probe | Release | Production probes | Halts a rollout when error rate, latency, or saturation breaches its limit |
| **Rollback Threshold** | Gate | Release | Rollout pipeline | Reverses a rollout automatically when a pre-declared limit is crossed |

## How the controls get stronger

[7 — Learn](./stage-learn) feeds back into this page: a defect or rollback that a control should have caught
earlier becomes a stricter gate, threshold, or probe. This is the "Hardens" arrow in the
[operating model diagram](./overview).

## Runtime guardrails

| Guardrail | Enforcement |
|---|---|
| Non-root containers, host-matched `UID`/`GID` | Base images and dockerfiles |
| Secrets from a managed store only | Runtime injection; zero secrets in code or images |
| Least-privilege database grants per schema | Database migration tooling |
| Network segmentation between internal and external | Container / orchestrator network policies |
| Rate limiting and edge token authentication | API Gateway |

## AI agent execution guardrails

| Guardrail | Enforcement |
|---|---|
| **Zero direct production access** | Agent credentials scoped to sandbox repositories and preview environments only |
| **All code via pull requests** | Protected `main`; agents can only push to ephemeral feature branches |
| **Closed fix loop limit** | Agents capped at 5 fix attempts per run to prevent infinite token loops |
| **Client data sanitization** | Automatic PII and credential redaction on all meeting transcripts and context feeds |
| **Sanctioned enterprise models only** | Model gateway enforces no-training agreements and SSO authentication |
| **Budget and quota limits** | Model gateway enforces token and cost ceilings per squad |

## Minimum Human Validation guardrails

The human step itself is guarded. See [Minimum human validation](./stage-prove#minimum-human-validation) for how it works.

| Guardrail | Enforcement |
|---|---|
| **No syntax review** | Reviewers are instructed not to read syntax; automated checks and deterministic controls own syntax |
| **Observable preview required** | PRs cannot be approved without an ephemeral preview deployment link |
| **Plan sign-off** | Human must check off that the Plan acceptance criteria are satisfied |
| **Rollback mechanism declared** | High and Critical PRs blocked unless the rollback mechanism named in [Think](./stage-think) is configured |

## Failure mode to avoid

Controls that fire constantly on false positives get disabled. Each control has an owner who
watches its signal-to-noise ratio; a control that is routinely bypassed is either fixed or
removed, never left as decorative.
