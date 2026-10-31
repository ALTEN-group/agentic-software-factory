# Overview

The Agentic Software Factory is an **operating model for AI-driven delivery**, from client meeting to production. It defines who owns each outcome, how agents work, and which checks allow a change to ship.

- **Agentic**: AI agents implement, test, and fix changes autonomously.
- **Software Factory**: each change follows repeatable stages with clear exit checks.

## Operating Model diagram

<DeliveryFlowchart />

Work flows from top to bottom. The green blocks (Persistent Context, Deterministic Controls and the Forge) feed
the stages they support. A weekly audit and the Learn stage can open new issues in Triage, which closes the loop.

## The three enablers

- **[Persistent Context](./persistent-context)**: committed instructions, prompts, skills, and agents that ground the AI.
- **[Forge](./forge)**: proven functions, libraries, and services that agents reuse instead of rebuilding the same logic.
- **[Deterministic Controls](./deterministic-controls)**: automated safeguards that block changes that fail safety, security, or compliance rules.

## One change, end to end

Example: a client needs faster inventory reconciliation.

1. **Meet.** In a client call, an operations director says managers lose 45 minutes every morning reconciling exports. AI transcribes the call, and the Product Owner clarifies edge cases with the client in the room.
2. **Triage.** AI cites the quote, scores the need, and creates a backlog issue. The Product Owner marks it *todo*.
3. **Think.** AI compares options, chooses a Forge reconciliation service, and records the rationale and risks.
4. **Plan.** AI defines the files, steps, code, and tests, then validates and approves the plan automatically.
5. **Code and Prove.** The coding agent generates code and tests, runs the build, type check, linter, tests, and deterministic controls, then fixes any failures and repeats the loop until all pass.
6. **Release.** The change is deployed automatically and exposed gradually. A threshold breach would reverse it.
7. **Learn.** Predictive monitoring watches the outcome metric. The verdict, and anything learned, flows back into Persistent Context and Deterministic Controls if needed.

## Principles

These principles apply to every change:

1. **Start with the client.** AI turns conversations into evidence-linked business needs.
2. **Developers do not code syntax.** Writing code is an automated capability of AI agents. Developers specify, curate context, and validate.
3. **Validate automatically.** Agents run builds, tests, and controls, then fix failures within the retry limit.
4. **Decide autonomously, verify independently.** Agents choose the approach; Prove checks intent, behaviour, and safety. People handle unresolved failures, not routine sign-off.
5. **Everything that matters is a committed artifact.** Instructions, prompts, skills, agents, specs, decision records, control suites, and runbooks live in a repository and evolve through pull requests.
6. **Generated code must pass [Prove](./stage-prove).** Generation alone is not evidence that a change works.
7. **Secure and compliant by default.** The platform applies policy-as-code and automated scanners, so squads do not have to remember them. See [Deterministic Controls](./deterministic-controls).

## What is different from a classic software organization

| Classic organization | The Agentic Software Factory |
|---|---|
| Developers write syntax manually in an IDE | Developers **do not code**; AI generates 100% of code, tests, and docs |
| Developers spend hours on line-by-line PR reviews | **Deterministic controls and independent agents validate**; people resolve exceptions |
| Requirements lost in manual tickets and hand-offs | **Meeting-Driven Development**: AI turns client meetings into tagged, ranked backlog issues |
| Knowledge lives in heads, chats, and outdated wikis | Knowledge lives in the committed [Persistent Context](./persistent-context) |
| AI used ad hoc as an autocomplete assistant | Autonomous AI agents operate with closed-loop self-healing under guardrails |
| Velocity measured in story points and PR volume | Flow measured in meeting-to-release lead time, deterministic pass rates, and customer outcomes |

The bottleneck shifts from writing code to **understanding the client and verifying the result**.

For the bad habits that quietly break this model, see [Anti-patterns](./anti-patterns).
