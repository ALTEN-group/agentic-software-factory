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

Two kinds of automated verification exist, and they are kept apart on purpose.

| | Automated checks | Deterministic controls |
|---|---|---|
| **What** | Compiler and build, strict type checks, AST linters, and the unit and integration tests generated with the code | Guards, gates, contracts, and probes |
| **Purpose** | Fast feedback while the agent writes code | Independent proof that the change is safe to merge and release |
| **Who runs them** | The agent, in its own loop in [4 — Code](./stage-code), until everything is green | The platform, in CI, in [5 — Prove](./stage-prove) and in [6 — Release](./stage-release) |
| **Can the agent change them?** | Tests are written by the agent, so it can edit them | No. They live outside the agent's write scope, so they cannot be weakened to get a pass |

The checks keep the loop fast. The controls keep it honest: a test suite the agent wrote cannot be the only
proof that the agent's code is correct.

## The controls

| Control | Type | Runs in | Enforcement | Purpose |
|---|---|---|---|---|
| **Secret & Push Protection** | Guard | Commit time, enforced again in CI in Prove | Platform git hooks & CI | Blocks commits containing credentials, tokens, or private keys immediately |
| **Policy-as-Code** | Guard | Prove | Open Policy Agent (OPA) / Conftest | Enforces infrastructure, security, and cloud configuration rules deterministically |
| **License & SAST Scan** | Guard | Prove | Semgrep / Snyk / Trivy | Blocks unauthorized open-source licenses and known vulnerable dependencies |
| **Clean CI Re-run** | Gate | Prove | CI in a clean environment | Re-runs the automated checks from Code where the agent cannot influence the result |
| **Criteria Test Verification** | Gate | Prove | Test runner | Proves that 100% of acceptance criteria from the Plan record have passing assertions |
| **Mutation Testing Bar** | Gate | Prove | Stryker / Mutmut | Proves that generated test suites are meaningful and actually catch injected defects |
| **Contract & Schema Compatibility** | Contract | Prove and Release | OpenAPI / JSON Schema / Pact | Proves that changes do not break external consumers or downstream APIs |
| **Preview Smoke Tests** | Probe | Prove | Ephemeral preview | Proves the application starts, routes traffic, and responds to health checks |
| **Promotion Gate** | Gate | Release | Rollout pipeline | Advances a rollout only while health and business metrics stay inside their thresholds |
| **Health Probe** | Probe | Release | Production probes | Halts a rollout when error rate, latency, or saturation breaches its limit |
| **Rollback Threshold** | Gate | Release | Rollout pipeline | Reverses a rollout automatically when a pre-declared limit is crossed |

## How the controls get stronger

[7 — Learn](./stage-learn) feeds back into this page: a defect or rollback that a control should have caught
earlier becomes a stricter gate, threshold, or probe. This is the "Hardens" arrow in the
[operating model schema](./overview).

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
| **Rollback mechanism declared** | High and Critical PRs blocked unless automated rollback is configured |

## Failure mode to avoid

Controls that fire constantly on false positives get disabled. Each control has an owner who
watches its signal-to-noise ratio; a control that is routinely bypassed is either fixed or
removed, never left as decorative.
