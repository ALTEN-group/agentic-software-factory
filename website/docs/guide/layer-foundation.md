# L0 — Foundation

The layer squads never have to build. Foundation is everything a squad receives on day one so that
it can spend its attention on the outcome it owns.

## Purpose

Remove undifferentiated work from squads and make the safe path the default path.

| Input | Output | Owner |
|---|---|---|
| Platform roadmap, squad friction reports, incident findings | Environments, pipelines, secure defaults, shared services, AI infrastructure | Platform / Enablement |

## What Foundation provides

### Environments

| Environment | Purpose | Provisioned by |
|---|---|---|
| `local` | Full stack on a laptop via Compose | Template repository |
| `preview` | Ephemeral per-pull-request deployment | CI |
| `staging` | Production-shaped, seeded data | Platform |
| `production` | Customer traffic | Platform |

An environment that cannot be created from source in one command is a Foundation defect.

### Delivery pipeline & deterministic harness

Every repository gets the same deterministic verification skeleton:

```
AI agent generation
  ↓
[closed self-healing loop] - agent runs local deterministic suite until green
  ↓
[commit & push]
  ↓
[lint + AST checks]        - style, structure & architectural boundaries enforced
  ↓
[strict type check]        - types & interface contracts hold
  ↓
[unit tests]               - logic assertions derived from intent criteria
  ↓
[integration tests]        - containerized dependencies & real interactions
  ↓
[contract tests]           - OpenAPI, JSON Schema, Protobuf verification
  ↓
[mutation tests]           - proves test suite kills generated code mutants
  ↓
[security & policy scan]   - secrets, dependencies, SAST, policy-as-code (OPA)
  ↓
[preview deploy]           - live artifact with automated smoke tests
  ↓
[minimum human validation] - targeted review of business intent and safety invariants
```

### Secure defaults

- Secrets from a managed store, never from a file in a repository.
- Non-root containers with host-matched `UID`/`GID`.
- Dependency and image scanning on every build.
- Least-privilege database grants per schema.
- Sandboxed agent execution environments with zero direct production access.

### Shared services

Authentication, authorization, notification, storage, and observability are consumed, not rebuilt.
A squad that needs a variant raises it with the owning enablement function.

### Unified platform substrate

Foundation provides a single unified platform substrate — standardized on the **GitHub ecosystem** — to eliminate tool sprawl and preserve an unbroken context graph for AI agents:
- **Signal & Intent tracking**: GitHub Issues and GitHub Projects, keeping client requirements where the code lives.
- **Discussions & client Q&A**: GitHub Discussions, indexing decisions next to code.
- **Code & Context Layer**: GitHub Repositories versioning instructions, skills, agents, and ADRs.
- **Deterministic CI & self-healing**: GitHub Actions running linters, compilers, mutation tests, and contract suites.
- **Automated security**: GitHub Advanced Security (Secret Push Protection, Dependabot, CodeQL).
- **Ephemeral previews & releases**: GitHub Environments and GitHub Releases with automated changelogs.

### AI & meeting infrastructure

Foundation also owns the plumbing of the agentic operating layer:

- meeting intelligence connectors: real-time transcription, semantic extraction, and intent synthesis pipelines;
- model access, routing gateways, quotas, and cost attribution per squad;
- the repository template that ships the [Context Layer](./context-layer) and deterministic control configurations;
- local agent runners with self-healing feedback loop hooks;
- the [evaluation](./evaluation) harness used to qualify model, prompt, and agent changes;
- audit logging of all agent actions across protected workspaces.

## Exit gate

A capability is part of Foundation only when it is:

1. self-service (no ticket to a human),
2. documented in a runbook,
3. covered by an alert or a health check,
4. reproducible from source.

Anything failing one of these four is still a project, not a foundation.

## Anti-pattern

A Foundation team that becomes an approval queue. Foundation ships *capabilities*, not permissions.
