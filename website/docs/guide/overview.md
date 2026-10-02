# Overview

## Operating model schema

<DeliveryFlowchart />

Work flows from top to bottom. The green blocks (Persistent Context, The Forge and Deterministic Controls) feed
the stages they support, and Learn feeds back into Persistent Context and Deterministic Controls.

Agentic Software Factory is an **operating model**: the way a software organization actually works to deliver,
support, and improve software. It defines how people, processes, tools, decisions, and responsibilities fit
together, rebuilt for a world where **AI is leveraged at maximum capability across the entire lifecycle, from the
client meeting to release**.

> **Agentic Software Factory is the modern operating model that connects client dialogue, autonomous AI execution,
> deterministic verification, and continuous delivery into one continuous system.**

- **Agentic**: autonomous AI agents driving implementation, testing, and remediation in closed loops.
- **Software Factory**: an industrialized, repeatable system where software moves predictably from client intent to verified production release through staged gates.

## The three enablers

The green blocks in the schema are the persistent assets that the stages draw on:

- **[Persistent Context](./persistent-context)**: committed instructions, prompts, skills, and agents (plus specs and ADRs) that ground the agents.
- **[The Forge](./forge)**: reusable code (functions, libraries, services), composed instead of building from scratch.
- **[Deterministic Controls](./deterministic-controls)**: guards, gates, contracts, and probes that validate generated software independently of the agent.

| Enabler | Feeds | Fed back by |
|---|---|---|
| Persistent Context | 0 — Meet, 1 — Triage, 2 — Think, 3 — Plan, 4 — Code, 5 — Prove | 7 — Learn ("Enriches") |
| The Forge | 2 — Think, 3 — Plan, 4 — Code | |
| Deterministic Controls | 5 — Prove, 6 — Release | 7 — Learn ("Hardens") |

People ([Squads](./squads), [Roles](./roles)) and governance ([Decision Rights](./decision-rights), [AI Usage Policy](./ai-policy)) cross every stage.

## One change, end to end

An illustrative example of how a single client need travels through the stages:

1. **Meet.** In a client call, an operations director says managers lose 45 minutes every morning reconciling exports. AI transcribes the call, and the specification engineer clarifies edge cases with the client in the room.
2. **Triage.** AI extracts the business need, cites the quote, scores it, and logs it as a backlog issue. The product lead ranks it *do now*.
3. **Think.** AI proposes two options. The team picks one that reuses a Forge reconciliation service, and records the choice and its blast radius.
4. **Plan.** The Plan record adds acceptance criteria and a file-level breakdown. The specification engineer validates it.
5. **Code.** The coding agent generates the change and its tests, and loops (generate, test, fix) until the build, type check, linter, and tests are green.
6. **Prove.** CI re-runs the checks clean, then applies the deterministic controls. A failing gate triggers agent auto-remediation. A human validates intent on the preview.
7. **Release.** The change is deployed automatically and exposed gradually. A threshold breach would reverse it.
8. **Learn.** Predictive monitoring watches the outcome metric. The verdict, and anything learned, flows back into Persistent Context and Deterministic Controls, and into the next meeting.

## Principles

Nine principles govern every decision. When a rule in this documentation conflicts with local convenience, the principle wins.

1. **Meeting-driven and customer-anchored.** Software evolution begins in client and stakeholder conversations. AI structures the dialogue into business needs, so requirements are never lost in manual ticket filing.
2. **Developers do not code syntax.** Writing code is an automated capability of AI agents. Engineers operate as **Specification Engineers**, **Context Architects**, and **Deterministic Control Builders**.
3. **Auto-validation through dense deterministic controls.** Fast automated checks (compilers, type checkers, linters, tests) keep the coding loop quick, and deterministic controls (contract tests, mutation testing, security scanners, policy-as-code) prove the result independently. Agents run in closed loops against them until every gate passes.
4. **Minimum human validation, maximum leverage.** No line-by-line review of generated syntax. Human review is focused on business intent, customer outcome, and blast-radius safety. See [Decision Rights](./decision-rights).
5. **Context beats prompting.** A well-fed model with an average prompt outperforms a well-prompted model with no context. Invest in the committed [Persistent Context](./persistent-context) before prompt engineering.
6. **Everything that matters is a committed artifact.** Instructions, prompts, skills, agents, specs, ADRs, control suites, and runbooks live in the repository and evolve through pull requests.
7. **Generated code is a draft until proven deterministically.** [Prove](./stage-prove) converts probabilistic drafts into behaviorally proven systems.
8. **Secure and compliant by default.** Guardrails are applied by the platform through policy-as-code and automated scanners, not by human discipline. See [Guardrails](./deterministic-controls).
9. **Optimize flow, never output volume.** Steer by meeting-to-release lead time, deterministic pass rates, change failure rate, and real client value. See [Metrics](./metrics).

When two principles collide, resolve in this order: **1.** safety and compliance (8, 3), **2.** customer outcome and intent (1, 4), **3.** flow and auto-validation (9, 2), **4.** leverage and context (5, 6, 7). A squad that cannot resolve a conflict in that order escalates it as a governance question, not as an engineering question.

## What is different from a classic software organization

| Classic organization | Agentic Software Factory |
|---|---|
| Developers write syntax manually in an IDE | Developers **do not code**; AI generates 100% of code, tests, and docs |
| Engineers spend hours on line-by-line PR reviews | Dense **deterministic controls auto-validate**; humans do **minimum validation** on intent |
| Requirements lost in manual tickets and hand-offs | **Meeting-Driven Development**: AI turns client meetings into tagged, ranked backlog issues |
| Knowledge lives in heads, chats, and outdated wikis | Knowledge lives in the committed [Persistent Context](./persistent-context) |
| AI used ad hoc as an autocomplete assistant | Autonomous AI agents operate with closed-loop self-healing under platform guardrails |
| Velocity measured in story points and PR volume | Flow measured in meeting-to-release lead time, deterministic pass rates, and customer outcomes |

When code generation becomes autonomous and cheap, the bottleneck moves. It is never *writing* code; it is
**capturing true client intent, and proving deterministically that what was generated satisfies it**.

## Where to go next

- New to the model: walk the stages from [0 — Meet](./stage-meet) to [7 — Learn](./stage-learn).
- Adopting it in an existing organization: start with the [Adoption Roadmap](./adoption).
