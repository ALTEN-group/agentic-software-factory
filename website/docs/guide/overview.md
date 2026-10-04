# Overview

The Agentic Software Factory is an **operating model** for modern software organization aligning people, processes, tools, decisions and responsibilities to deliver, support and improve with **AI leveraged at maximum capability across the entire lifecycle**, from the client meeting to the release.

- **Agentic**: autonomous AI agents driving implementation, testing, and remediation in closed loops.
- **Software Factory**: an industrialized, repeatable system where software moves predictably from client intent to verified production release through staged gates.

## Operating Model diagram

<DeliveryFlowchart />

Work flows from top to bottom. The green blocks (Persistent Context, The Forge and Deterministic Controls) feed
the stages they support.

> **Agentic Software Factory is the modern operating model that connects client dialogue, autonomous AI execution,
> deterministic verification, and continuous delivery into one system.**

## The three enablers

- **[Persistent Context](./persistent-context)**: committed instructions, prompts, skills, and agents that ground the AI.
- **[The Forge](./forge)**: reusable code like functions, libraries and services.
- **[Deterministic Controls](./deterministic-controls)**: guards, gates, contracts, and probes that give AI agents deterministic feedback, letting them iteratively correct generated software until all required checks pass.

## One change, end to end

An illustrative example of how a single client need travels through the stages:

1. **Meet.** In a client call, an operations director says managers lose 45 minutes every morning reconciling exports. AI transcribes the call, and the product owner clarifies edge cases with the client in the room.
2. **Triage.** AI extracts the business need, cites the quote, scores it, and logs it as a backlog issue. The product owner ranks it *todo*.
3. **Think.** Guided by constraints and guidelines in Persistent Context, AI proposes two options and selects the one that best fits them while reusing a Forge reconciliation service. It records its rationale, the affected systems, and the impacts.
4. **Plan.** AI turns the selected approach into a Plan with acceptance criteria and a file-level breakdown. The developer confirms that it reflects the agreed intent and validates.
5. **Code and Prove.** The coding agent generates code and tests, runs the build, type check, linter, tests, and deterministic controls, then fixes any failures and repeats the loop until all pass.
6. **Release.** The change is deployed automatically and exposed gradually. A threshold breach would reverse it.
7. **Learn.** Predictive monitoring watches the outcome metric. The verdict, and anything learned, flows back into Persistent Context and Deterministic Controls if needed.

## Principles

Nine principles govern every decision. When a rule in this documentation conflicts with local convenience, the principle wins.

1. **Meeting-driven and customer-anchored.** Software evolution begins in client and stakeholder conversations. AI structures the dialogue into business needs, so requirements are never lost in manual ticket filing.
2. **Developers do not code syntax.** Writing code is an automated capability of AI agents. Developers specify, curate context, and validate.
3. **Auto-validation through dense deterministic controls.** Fast automated checks (compilers, type checkers, linters, tests) keep the coding loop quick, and deterministic controls (contract tests, mutation testing, security scanners, policy-as-code) prove the result. Agents run in closed loops against them until every gate passes.
4. **Minimum human validation, maximum leverage.** No line-by-line review of generated syntax. Human review is focused on business intent, customer outcome, and blast-radius safety.
5. **Everything that matters is a committed artifact.** Instructions, prompts, skills, agents, specs, decision records, control suites, and runbooks live in a repository and evolve through pull requests.
7. **Generated code is a draft until proven deterministically.** [Prove](./stage-prove) converts probabilistic drafts into behaviorally proven systems.
8. **Secure and compliant by default.** Guardrails are applied by the platform through policy-as-code and automated scanners. See [Guardrails](./deterministic-controls).

## What is different from a classic software organization

| Classic organization | Agentic Software Factory |
|---|---|
| Developers write syntax manually in an IDE | Developers **do not code**; AI generates 100% of code, tests, and docs |
| Engineers spend hours on line-by-line PR reviews | Dense **deterministic controls auto-validate**; humans do **minimum validation** on intent |
| Requirements lost in manual tickets and hand-offs | **Meeting-Driven Development**: AI turns client meetings into tagged, ranked backlog issues |
| Knowledge lives in heads, chats, and outdated wikis | Knowledge lives in the committed [Persistent Context](./persistent-context) |
| AI used ad hoc as an autocomplete assistant | Autonomous AI agents operate with closed-loop self-healing under guardrails |
| Velocity measured in story points and PR volume | Flow measured in meeting-to-release lead time, deterministic pass rates, and customer outcomes |

When code generation becomes autonomous and cheap, the bottleneck moves. It is never *writing* code; it is
**capturing true client intent, and proving deterministically that what was generated satisfies it**.