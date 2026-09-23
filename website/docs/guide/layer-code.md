# 3 — Code

Where specifications and plans become executable software. In Agentic Software Factory, **developers do not code manually**: AI agents autonomously
generate 100% of the code, tests, and documentation, operating in closed self-healing loops against
dense deterministic controls.

## Purpose

| Input | Output | Owner |
|---|---|---|
| A work item that passed the [2 — Plan](./layer-plan) gate + **The Forge** (bound services, modules, contracts) + **Persistent Context** (instructions, skills, repository conventions) | A verified pull request with code, comprehensive tests, and documentation that passes all local deterministic controls | Specification engineer (supervising autonomous AI agents) |

## The autonomous coding loop

```mermaid
---
caption: Autonomous Code loop with closed-loop self-healing
---

sequenceDiagram
  autonumber
  actor e as Specification Engineer
  participant a as AI Coding Agent
  participant dc as Deterministic Controls (Local)
  participant r as Repository / PR

  e->>a: Plan record + Persistent Context (rules, skills) + The Forge (bound modules & SDKs)
  a-->>e: Implementation plan & file scope
  e->>a: Approve plan & boundary constraints
  
  rect rgb(240, 248, 255)
    Note over a,dc: Closed-Loop AI Auto-Validation (Self-Healing)
    loop Until 100% Deterministic Pass
      a->>a: Generate / edit code, tests & documentation
      a->>dc: Run compiler, strict type check, AST linter & unit tests
      dc-->>a: Execution result (pass or failure logs)
      opt On Failure
        a->>a: Analyze error trace, auto-repair implementation
      end
    end
  end

  a->>r: Open pull request with 100% green deterministic proof
  r-->>e: Ready for Minimum Human Validation in 4 — Proof
```

1. **Plan first.** The AI agent reviews the Plan record, Persistent Context, and bound Forge assets,
   proposing a detailed implementation breakdown (affected files, interfaces, and boundary constraints). The specification engineer validates scope in seconds.
2. **Autonomous generation.** The agent autonomously generates the application logic, database
   migrations, tests, and documentation. No human developer writes code syntax.
3. **Closed-loop auto-validation.** The agent runs the local deterministic control harness (type
   checker, linter, unit and contract tests). If any control fails, the agent parses the failure,
   repairs the code, and re-runs the controls automatically without human intervention.
4. **Context & Forge alignment.** The [Persistent Context Layer](./context-layer) enforces codebase idioms,
   architectural boundaries, and library choices, while [The Forge](./layer-plan#reusable-assets-the-enterprise-forge)
   provides pre-built modules and services so the generated code is consistent, avoids reinventing wheels, and complies with enterprise standards.
5. **Committed proof.** Once all local deterministic controls pass, the agent commits the change,
   opens a pull request, and hands off to [4 — Proof](./layer-proof).

## Enterprise foundations in Code: The Forge & Persistent Context

Autonomous AI agents do not write isolated code in a vacuum. During code generation, the agent draws continuously from both enterprise pillars:

- **The Forge (Reusable Code & In-Context Templates)**: The agent directly imports validated code modules, packages, and client SDKs pre-bound during the Plan phase, leveraging in-context templates (such as those from **Gatelin** or **foxnox**). Rather than hallucinating bespoke utility functions or reinventing authentication/logging logic, the agent wires together verified enterprise building blocks.
- **Persistent Context (Guardrails & Agent Skills)**: The [Context Layer](./context-layer) (provisioned through persistent context and agent catalogs like **`coding-pal`**) injects exact repository conventions, style guides, and specialized developer skills (such as mutation testing or schema generation). The agent outputs syntax that seamlessly conforms to the existing codebase without human hand-crafting.

## Where AI is used

Writing software syntax is entirely delegated to AI agents:

| Task | AI share | Human role (Specification Engineer) |
|---|---|---|
| Domain logic and application services | **100%** | Validate intent fidelity against client meeting |
| Scaffolding, boilerplate, wiring | **100%** | Zero human involvement |
| Unit, integration, and contract tests | **100%** | Verify tests derive from intent criteria |
| API clients, DTOs, mappers, migrations | **100%** | Ensure backwards compatibility constraints are met |
| Architectural refactoring within patterns | **100%** | Confirm system boundaries |
| Documentation, OpenAPI specs, runbooks | **100%** | High-level review for clarity |
| Self-healing bug fixes and syntax repairs | **100%** | Intervene only if the agent reaches iteration limit |

## Non-negotiable rules

- **Developers do not write manual code.** Any attempt to manually hand-craft code in an IDE is an
  anti-pattern that bypasses the Context Layer and slows down delivery.
- **Self-healing before PR.** An agent is never permitted to open a pull request with failing
  compilation, linting, or broken tests. The agent must resolve errors deterministically.
- **Tests are generated alongside code, never retrofitted.** Tests are derived strictly from the
  acceptance criteria in the Plan record, not generated as an afterthought to fit the code.
- **Context is the steering wheel.** If an agent produces incorrect code or misunderstands a pattern,
  the engineer updates the [Context Layer](./context-layer) (instructions or skills) rather than
  manually fixing the files.
- **Dependencies are bounded.** Any new dependency introduced by an agent must be explicitly declared
  in the plan and evaluated against security and licensing guardrails.

## Branching

Short-lived feature branches created directly by agents from `main`, merged through pull requests.
Long-running branches are forbidden: they create merge conflicts that break agentic context.

## Exit gate

A pull request leaves Code and enters [Proof](./layer-proof) when:

1. 100% of the code, tests, and documentation are generated by the agent, composing bound Forge assets and obeying Persistent Context rules,
2. all acceptance criteria from the Plan record have corresponding automated tests,
3. the complete local deterministic control harness passes with zero warnings or errors,
4. the agent produces a structured summary of changes mapped directly to the original client meeting intent.
