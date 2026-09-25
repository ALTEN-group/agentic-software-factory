# 0 — Foundation

The layer squads never have to build. Foundation is everything a squad receives on day one so that
it can spend its attention on the outcome it owns.

## Purpose

Remove undifferentiated work from squads and make the safe path the default path.

| Input | Output | Owner |
|---|---|---|
| Platform roadmap, squad friction reports, incident findings | Environments, deterministic pipelines, secure defaults, reusable code & in-context templates, persistent context & agents catalog, shared services | Platform / Enablement |

## What Foundation provides

### Reusable code & in-context templates

In an agentic software factory, the single highest-leverage lever for software consistency and quality is **reusable code**. Left unguided, AI agents will regenerate boilerplate, bespoke utility functions, and unverified infrastructure code from scratch for every work item — introducing subtle drift, security vulnerabilities, and maintenance debt.

Foundation equips squads and autonomous agents with certified building blocks through **The Forge**:

- **Reusable code assets**: Production-hardened libraries, shared client SDKs, domain service building blocks, and standardized interface contracts. Instead of generating redundant logic, agents bind to and import pre-tested packages that comply with enterprise standards out of the box.
- **In-context templates**: Structural scaffolding, project skeletons, and canonical design patterns injected directly into agent context. When an agent bootstraps a service, implements an endpoint, or configures a pipeline, in-context templates guide the LLM to adhere to the organization's reference architecture from line one.
- **Concrete enterprise implementations**: Frameworks and asset registries (such as **Gatelin** and **foxnox**) provide concrete vehicles for distributing these reusable modules and in-context templates, giving agents immediate access to validated blueprints and component libraries.
- **Unified maintenance over duplicate creation**: Security patches, performance enhancements, and dependency updates made in reusable modules propagate across all consuming squads automatically, avoiding fragmented, duplicated codebases.

### Persistent context & agents catalog

To ensure AI models execute deterministically within organizational boundaries, Foundation centrally provisions the **Persistent Context Layer** and an enterprise **Agents Catalog**:

- **Persistent Context**: Centrally maintained and synchronized across repositories, persistent context supplies the ground truth that models cannot infer: committed coding conventions, repository rules, architectural decision records (ADRs), domain glossaries, and interface specifications. Agents never operate in an informational vacuum.
- **Agents Catalog**: Rather than leaving individual squads to invent ad-hoc system prompts and unvetted AI personas, Foundation maintains a curated catalog of production-ready AI agents (such as Specification Agents, Coding Agents, Auto-Repair Agents, and Security Auditors). Each agent comes pre-packaged with audited system prompts, bounded toolsets, and specialized developer skills tailored to its role.
- **Tooling enablement**: Platforms like **`coding-pal`** act as the operational backbone for this capability, cataloging approved agents and keeping persistent context bundles synchronized across developer workstations and CI runners.

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
- the evaluation harness used to qualify model, prompt, and agent changes;
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
