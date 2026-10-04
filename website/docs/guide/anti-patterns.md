# Anti-patterns

Behaviors that look like The Agentic Software Factory adoption and quietly reverse its intent. Each one has been the cause of a failed transformation somewhere.

## Operational & Engineering

### Developers still writing code syntax

The fatal anti-pattern: developers treating AI as a glorified autocomplete while continuing to
manually write application logic, boilerplate, and tests. In The Agentic Software Factory, developers do not write code; they design specifications, build deterministic controls, and curate the Persistent Context.
Hand-coding creates bottlenecks, uncommitted tribal habits, and low AI leverage.

### Manual line-by-line syntax reviews

Developers spending hours reading thousands of lines of generated diffs in pull requests. Anything that
can be checked automatically belongs in automated checks and deterministic controls, and humans perform
Minimum Human Validation on client intent and safety invariants only. See [Prove](./stage-prove#why-deterministic-controls-replace-manual-code-review).

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

Feeding a vague meeting snippet straight to a coding agent without structuring acceptance criteria.
The model fills the gaps with plausible assumptions, and auto-validation cannot verify what was
never specified. Ambiguity is cheapest to remove in [3 — Plan](./stage-plan).

### Weak deterministic controls ("Trust the model")

Relying on LLM self-critique or superficial unit tests that do not test invariants. Generated code
must face automated checks (compilers, strict type systems, AST linters, tests) and dense deterministic
controls (contract tests, mutation testing, security scans).

### Hand-fixing generated bugs

A developer spotting a bug in generated output and manually typing the fix into the code file.
The correct response is: add a deterministic test or update the [Persistent Context](./persistent-context)
instruction, then let the AI agent regenerate and fix the implementation.

### Uniform review effort

Spending the same attention on an internal refactor and an auth/PII permissions change. Review is
risk-weighted or it is theatre.

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
requests behind deterministic controls; humans validate before merge.

### Tool sprawl and context fragmentation

Spreading work across disconnected SaaS tools fragments the knowledge graph that AI agents depend on. See
[Tooling](./tooling) for why the lifecycle is consolidated into a single unified Git stack.

## Measurement

### Counting output volume

Lines of code, pull requests, suggestions accepted. Generation makes all of these trivially
inflatable and none of them meaningful.

### Never deleting anything

A codebase where invalidated features accumulate because deleting feels like waste. Every dead
feature taxes every future generation pass and every future reviewer.
