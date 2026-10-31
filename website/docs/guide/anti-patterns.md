# 🚧 Anti-patterns

Habits that undermine autonomous delivery—and what to do instead.

## Operational & Engineering

### Developers still writing code syntax

Using AI as autocomplete while still writing logic and tests by hand. Let agents write the code; focus on specifications, controls, and Persistent Context.

### Manual line-by-line syntax reviews

Reading generated diffs by hand as a merge gate. Use automated checks and independent [Prove assessment](./stage-prove#why-deterministic-controls-replace-manual-code-review). People resolve failures, not routine sign-off.

### Skipping client meetings & building from stale tickets

Developers isolated from client dialogue, relying on third-hand ticket summaries. In Meeting-Driven
Development, client dialogue is the primary signal source, captured and structured by AI ([0 — Meet](./stage-meet)).

### The AI center of excellence that owns delivery

A central team that writes the AI-assisted code for everyone. It becomes a queue, squads lose
ownership, and the practice never spreads. Enablement ships capabilities, not features.

### Enablement as an approval board

Platform or security turning into a gate squads must ask permission from. The correct answer to
recurring approval requests is an automated deterministic guardrail, not a meeting.

### Technology-layer squads

"Frontend squad", "API squad", "data squad". Every user outcome then requires three squads and two
hand-offs. Boundaries follow outcomes.

## Process & Quality

### Skipping Plan

Sending a vague request straight to a coding agent. Define testable acceptance criteria in [Plan](./stage-plan) first.

### Weak deterministic controls ("Trust the model")

Relying on LLM self-critique or superficial unit tests that do not test invariants. Generated code
must face automated checks (compilers, strict type systems, AST linters, tests) and dense deterministic
controls (contract tests, mutation testing, security scans).

### Hand-fixing generated bugs

Fixing generated code by hand. Add a failing test or correct the [context](./persistent-context), then let the agent fix the implementation.

### Uniform review effort

Applying the same checks to a copy edit and a permissions change. Match validation evidence to risk.

### Batching releases

Holding changes for a weekly release "for safety". Batching multiplies blast radius and destroys the
correlation between a change and its effect.

## Context & AI usage

### Prompting instead of context

Increasingly elaborate prompts re-explaining the same conventions in chat. That is a missing
[Persistent Context](./persistent-context), not a prompt engineering skill gap.

### The everything instruction

One 900-line instruction file covering all of engineering. Models weight it poorly, humans stop
reading it, and it drifts. Small, scoped, evidence-driven artifacts.

### Stale context left in place

An instruction describing a framework the company migrated away from. Worse than no instruction: it
produces confident, consistent, wrong output at scale.

### Vibes-based rollout

Trying a new model on one prompt, liking it, enabling it for everyone. Without
rigorous evaluation, a single change can make the whole organization worse overnight.

### Agents with production credentials

An agent able to act directly on production because it was convenient. Agents act through pull
requests behind deterministic controls and independent automated validation before merge. Autonomous decisions do not grant unrestricted production access.

### Tool sprawl and context fragmentation

Scattering requirements, code, and evidence across disconnected tools. Keep them linked on [one Git platform](./tooling).

## Measurement

### Counting output volume

Lines of code, pull requests, suggestions accepted. Generation makes all of these trivially
inflatable and none of them meaningful.

### Never deleting anything

A codebase where invalidated features accumulate because deleting feels like waste. Every dead
feature taxes every future generation pass and every future reviewer.
