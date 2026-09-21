# Guardrails

Guardrails are the automated controls that make the safe path the default path. Flow Stack relies on
them precisely because it moves fast and generates a lot of change.

## Principle

> A squad should have to work hard to do something unsafe, and should never have to work hard to do
> something safe.

Any rule that only exists in a document is not a guardrail. It is a hope.

## Repository guardrails

| Guardrail | Enforcement |
|---|---|
| Protected `main`, no direct pushes | Branch protection |
| Required status checks before merge | Branch protection |
| Required human approval, level by blast radius | Code owners + branch protection |
| Secret scanning, push protection | Platform, blocking |
| Dependency and license scanning | CI, blocking |
| Signed, immutable build artifacts | CI |

## Runtime guardrails

| Guardrail | Enforcement |
|---|---|
| Non-root containers, host-matched `UID`/`GID` | Base images and dockerfiles |
| Secrets from a managed store only | Runtime injection; no secret files in images |
| Least-privilege database grants per schema | Migration tooling |
| Network segmentation between internal and external | Compose / orchestrator networks |
| Rate limiting and authentication at the edge | Gateway |

## AI guardrails

| Guardrail | Enforcement |
|---|---|
| Restricted data never reaches a prompt | Redaction in the tooling path, not in the user's head |
| Only sanctioned tools with enterprise tenancy | SSO + device policy |
| Agents act through pull requests, never on production | Credential scoping |
| Agent actions on protected resources are logged | Platform audit log |
| Model, prompt, and agent versions pinned in CI | Build metadata |
| Per-squad quotas and cost alerts | Model gateway |
| Public-code-match blocking | Tool configuration |

## Quality guardrails

| Guardrail | Enforcement |
|---|---|
| Acceptance criteria must have tests | [Proof](./layer-proof) gate |
| Coverage may not decrease on changed files | CI, blocking |
| No new dependency without review | CI flag + code owners |
| Performance thresholds on flagged surfaces | CI benchmarks |
| Every production bug produces a failing test first | Team rule, checked in review |

## Failure mode to avoid

Guardrails that fire constantly on false positives get disabled. Each guardrail has an owner who
watches its signal-to-noise ratio; a guardrail that is routinely bypassed is either fixed or
removed, never left as decorative.
