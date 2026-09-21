# Guardrails

Guardrails are the automated, deterministic controls that make the safe path the only path.
Agentic Software Factory relies on them fundamentally because **developers do not code manually** and AI agents
generate massive volumes of change at high velocity.

## Principle

> A squad or AI agent should have to work hard to do something unsafe, and should never have to work
> hard to do something safe.

Any rule that only exists in a policy document is not a guardrail. It is a hope. In Agentic Software Factory,
**all guardrails are executable, deterministic, and non-probabilistic**.

## Deterministic auto-validation guardrails

These controls form the closed-loop auto-validation harness in [Proof](./layer-proof) that agents
must satisfy before human validation:

| Guardrail | Enforcement | Purpose |
|---|---|---|
| **AST Linter & Architecture Boundaries** | Biome / ESLint / custom AST rules | Prevents anti-patterns, cyclic dependencies, and architectural boundary violations |
| **Strict Type Checking** | Compiler (`tsc --strict`, Rust, Go) | Guarantees compile-time safety, zero unhandled `null`/`undefined`, and interface integrity |
| **Criteria Test Verification** | Test runner | Proves that 100% of acceptance criteria from the Intent record have passing assertions |
| **Contract & Schema Compatibility** | OpenAPI / JSON Schema / Pact | Proves that changes do not break external consumers or downstream APIs |
| **Mutation Testing Bar** | Stryker / Mutmut | Proves that generated test suites are meaningful and actually catch injected defects |
| **Policy-as-Code** | Open Policy Agent (OPA) / Conftest | Enforces infrastructure, security, and cloud configuration rules deterministically |
| **Secret & Push Protection** | Platform git hooks & CI | Blocks commits containing credentials, tokens, or private keys immediately |
| **License & SAST Scan** | Semgrep / Snyk / Trivy | Blocks unauthorized open-source licenses and known vulnerable dependencies |

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
| **Closed self-healing loop limit** | Agents capped at 5 self-healing attempts per run to prevent infinite token loops |
| **Client data sanitization** | Automatic PII and credential redaction on all meeting transcripts and context feeds |
| **Sanctioned enterprise models only** | Model gateway enforces no-training agreements and SSO authentication |
| **Budget and quota limits** | Model gateway enforces token and cost ceilings per squad |

## Minimum Human Validation guardrails

| Guardrail | Enforcement |
|---|---|
| **No syntax review** | Reviewers are instructed not to read syntax; deterministic controls own syntax |
| **Observable preview required** | PRs cannot be approved without an ephemeral preview deployment link |
| **Explicit Intent sign-off** | Human must check off that client meeting Intent criteria are satisfied |
| **Rollback mechanism declared** | High and Critical PRs blocked unless automated rollback is configured |

## Failure mode to avoid

Guardrails that fire constantly on false positives get disabled. Each guardrail has an owner who
watches its signal-to-noise ratio; a guardrail that is routinely bypassed is either fixed or
removed, never left as decorative.
