# Platform Rails

The substrate squads never have to build from scratch. Platform Rails provide everything a squad receives on day one so that it can focus 100% of its attention on the business outcome it owns.

## Purpose

Remove undifferentiated heavy lifting from squads and make the safe, autonomous path the default path.

| Input | Output | Owner |
|---|---|---|
| Platform roadmap, squad friction reports, incident findings | Environments, deterministic pipelines, secure defaults, the Forge catalog, Persistent Context and the agents catalog, shared services | Platform / Enablement |

## What Platform Rails provide

### Reusable code & in-context templates
The [Forge](./forge) catalog of reusable functions, libraries, services, and in-context templates is published and maintained through the rails. Security patches and dependency updates made once in the Forge reach every consuming squad.

### Persistent Context & agents catalog
The rails centrally provision [Persistent Context](./persistent-context) and an enterprise **Agents Catalog**: a curated set of production-ready agents (such as Plan, Coding, Remediation, and Security agents), each pre-packaged with audited prompts, bounded toolsets, and skills for its role. Platforms like **`coding-pal`** keep these bundles synchronized across developer workstations and CI runners.

### Environments

| Environment | Purpose | Provisioned by |
|---|---|---|
| `local` | Full stack on a laptop via Compose | Template repository |
| `preview` | Ephemeral per-pull-request deployment | CI |
| `staging` | Production-shaped, seeded data | Platform |
| `production` | Customer traffic | Platform |

An environment that cannot be created from source in one command is an architectural defect.

### Delivery pipeline
Every repository gets the same verification skeleton, with automated checks in Code and [Deterministic Controls](./deterministic-controls) in CI:

```
AI agent generation
  ↓
[local automated checks]      - build, types, linters, tests
  ↓
[pull request]                 - immutable commit with audit log
  ↓
[CI deterministic controls]   - clean re-run, contracts, mutation & security scan
  ↓
[preview deploy]               - live artifact with automated smoke tests
  ↓
[minimum human validation]     - targeted review of business intent and safety invariants
```

### Secure defaults
- Secrets from a managed store, never from a file in a repository.
- Non-root containers with host-matched `UID`/`GID`.
- Dependency and image scanning on every build.
- Least-privilege database grants per schema.
- Sandboxed agent execution environments with zero direct production access.

### Unified platform substrate
Standardized on the **GitHub ecosystem** to eliminate tool sprawl and preserve an unbroken context graph for AI agents, as detailed in **[Tooling](./tooling)**.

### Meeting & AI infrastructure
Plumbing for the agentic operating model:
- Meeting intelligence connectors: transcription, semantic extraction, and need-synthesis pipelines feeding **[0 — Meet](./stage-meet)**;
- Model access, routing gateways, quotas, and cost attribution per squad;
- Repository templates shipping [Persistent Context](./persistent-context) and the configuration for automated checks and deterministic controls;
- Local agent runners with fix-loop hooks.
