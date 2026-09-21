# Principles

Nine principles govern every decision in Agentic Software Factory. When a rule in this documentation conflicts
with local convenience, the principle wins.

## 1. Meeting-driven and customer-anchored

Software evolution begins directly in client and stakeholder conversations. AI transcribes and
structures client dialogue into formal Intent in real time. Requirements are never lost in
translation through layers of manual ticket filing.

## 2. Developers do not code syntax

Writing code is an automated capability of AI agents, not a human activity. Engineers operate as
**Specification Engineers**, **Context Architects**, and **Deterministic Control Builders**. Human
attention is spent on client empathy, system invariants, architecture, and verification harnesses —
never on manual typing of syntax.

## 3. Auto-validation through dense deterministic controls

Code correctness is proven by deterministic, non-probabilistic controls: compilers, strict type
checkers, AST linters, contract tests, mutation testing, and security scanners. AI agents run in
closed self-healing loops against these controls until every automated gate passes.

## 4. Minimum human validation, maximum leverage

Humans do not perform line-by-line code reviews on generated syntax. Once deterministic controls
auto-validate a change, human review is minimized and laser-focused on business intent, customer
outcome, and blast-radius safety. See [Decision Rights](./decision-rights).

## 5. Context beats prompting

A well-fed model with an average prompt outperforms a well-prompted model with no context. The
organization invests in the committed [Context Layer](./context-layer) (instructions, skills,
agents, and specs) before it invests in prompt engineering.

## 6. Everything that matters is a committed artifact

Instructions, skills, agent definitions, specs, ADRs, deterministic control suites, and runbooks
live in the repository, are versioned, and evolve through pull requests. Nothing operationally
important lives only in a transient chat session or meeting memory.

## 7. Generated code is a draft until proven deterministically

Output from a model is inherently unverified until it satisfies the entire battery of deterministic
controls. [Proof](./layer-proof) is the automated layer that converts probabilistic drafts into
mathematically and behaviorally proven systems.

## 8. Secure and compliant by default

Guardrails are applied by the platform through policy-as-code and automated scanners, not by human
discipline. A squad or agent should have to work hard to do something unsafe. See [Guardrails](./guardrails).

## 9. Optimize flow, never output volume

Generating more lines of code or opening more pull requests is not progress. The model is steered
by meeting-to-release lead time, deterministic pass rates, change failure rate, and real client
value. See [Metrics](./metrics).

## Principle conflicts

When two principles collide, this is the resolution order:

1. Safety and compliance (8, 3)
2. Customer outcome and intent (1, 4)
3. Flow and auto-validation (9, 2)
4. Leverage and context (5, 6, 7)

A squad that cannot resolve a conflict in that order escalates it as a governance question, not as
an engineering question.
