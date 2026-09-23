# Tooling: The Unified Substrate

In Agentic Software Factory, tooling is not an arbitrary collection of disconnected SaaS products. Tool sprawl is
the primary cause of **AI context fragmentation**: when business requirements live in Jira, meeting
notes in Confluence, discussions in Slack, code in Git, pipelines in Jenkins, and releases in an external
portal, the AI agent's context is broken across authentication silos, sync lags, and incompatible APIs.

> **To maximize AI capability, minimize tooling sprawl.** Consolidate the entire lifecycle into a
> **single unified substrate** — exemplified by the **GitHub ecosystem** — where business needs,
> code, deterministic verification, and release share one unbroken context graph.

## Why a single substrate matters for AI

1. **Zero context loss from meeting to release**: An AI agent can read the original client meeting
   notes in an Issue, trace the Intent criteria, inspect the repository Context Layer, generate the code
   in a Pull Request, read CI failure logs from Actions, and publish the Release without leaving the platform.
2. **Native bidirectional links**: Every PR is natively linked to its Issue, branch, commit, check run,
   preview environment, and release tag. No third-party integrations or fragile webhook syncs required.
3. **Unified permission and security boundary**: The model, agent runner, and CI pipeline operate under
   one consistent role-based access control (RBAC) and audit log.
4. **Token and latency optimization**: AI agents fetch rich, structured context via native platform APIs
   in milliseconds instead of navigating dozens of external tool APIs.

## The unified GitHub operating stack

Agentic Software Factory implements this unified model by utilizing the GitHub platform end-to-end:

| Lifecycle Stage | Capability | GitHub Native Implementation | Why it preserves AI context |
|---|---|---|---|
| **1 — Need & 2 — Plan** | Meeting notes, backlog & issue tracking | **GitHub Issues** + **GitHub Projects** | Transcripts, problem statements, and Plan records live directly where code lives |
| **Context & Architecture** | Instructions, skills, specs, ADRs, agents | **Repository Markdown (`.github/`, `docs/`)** | Persistent Context and curated agent catalogs (e.g., via `coding-pal`) loaded directly into agent prompts |
| **The Forge (Asset Reuse)** | Reusable code & in-context templates | **Enterprise package registries & templates** | Pre-built modules and in-context templates (e.g., `Gatelin`, `foxnox`) injected into agent prompts to avoid bespoke coding |
| **3 — Code** | Autonomous code & test generation | **GitHub Copilot / Coding Agents / CLI** | Agents operate natively against repository files, branches, and issue context |
| **4 — Proof: Deterministic Harness** | AST lint, strict types, unit, mutation & contract tests | **GitHub Actions** | Deterministic gates run in CI; error logs stream directly back to self-healing agents |
| **4 — Proof: Preview Environments** | Ephemeral preview deployments | **GitHub Environments & Deployments** | Live preview links post directly to the PR for Minimum Human Validation |
| **4 — Proof: Security & Compliance** | Secret scanning, SAST, dependency review | **GitHub Advanced Security (CodeQL, Dependabot, Push Protection)** | Automatic blocking of vulnerabilities before code can ever merge |
| **4 — Proof: Human Validation** | Minimum Human Validation sign-off | **GitHub Pull Requests & Reviewers** | Risk-weighted approvals tied to blast radius and preview verification |
| **5 — Release** | Progressive deployment & immutable artifacts | **GitHub Actions + GitHub Releases / Packages** | Versioned tags, signed packages, and automated changelogs generated from Plan |
| **6 — Learn** | Telemetry correlation & issue retrospectives | **GitHub Issues & Discussions** | Incidents and hypothesis ledger entries link directly to the PRs and releases that caused them |

## The unbroken context chain

In a unified GitHub stack, the AI agent traverses a single unbroken chain:

```mermaid
---
caption: Unbroken AI context chain in a unified GitHub ecosystem
---
flowchart LR
    MEET["Client Meeting<br>(Issue / Discussion)"] -->|AI Spec Synthesis| INTENT["Spec Record<br>(GitHub Issue)"]
    INTENT -->|Linked Branch & Agent| PR["AI Generation<br>(GitHub Pull Request)"]
    PR -->|Automated Trigger| CI["Deterministic Harness<br>(GitHub Actions)"]
    CI -->|Failure Diagnostics| SH["AI Self-Healing<br>(Iterative Commit to PR)"]
    SH -->|Re-run| CI
    CI -->|100% Pass| PREVIEW["Preview Deploy<br>(GitHub Environment)"]
    PREVIEW -->|Targeted Sign-off| MHV["Min. Human Validation<br>(PR Approval)"]
    MHV -->|Merge to Main| REL["Progressive Release<br>(GitHub Actions & Releases)"]
```

## Model selection & gateway

While the workspace and delivery substrate is unified on GitHub, model routing remains flexible:

| Workload | Recommended Tier | Objective |
|---|---|---|
| Meeting transcription & initial extraction | Speech-to-text + Fast summarizer | High volume, low latency |
| Spec structuring & ambiguity detection | Reasoning / Frontier | Precise boundary definitions and boolean acceptance criteria |
| Autonomous code & test generation (Build) | High-capability Coding Agent | Strict adherence to Context Layer instructions |
| Closed-loop self-healing (syntax/type errors) | Fast coding model | Rapid iterative fixing of compiler and linter diagnostics |
| Architecture reasoning & cross-service ADRs | Frontier reasoning model | Broad context window and systemic invariant verification |

## Eliminating tool sprawl

Every external tool introduced into the software factory imposes a **context penalty**:
- If a tool does not natively integrate into the agent's context graph, it creates an information black hole.
- Any proposal to adopt an external SaaS tool outside the core substrate requires an ADR proving that the capability cannot be met natively and detailing how AI context will be preserved without loss.
