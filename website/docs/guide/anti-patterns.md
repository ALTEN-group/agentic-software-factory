# Anti-patterns

Behaviours that look like Agentic Software Factory adoption and quietly reverse its intent. Each one has been the
cause of a failed transformation somewhere.

## Operational & Engineering

### Developers still writing code syntax

The fatal anti-pattern: developers treating AI as a glorified autocomplete while continuing to
manually write application logic, boilerplate, and tests. In Agentic Software Factory, developers do not write
code; they design specifications, build deterministic controls, and curate the Context Layer.
Hand-coding creates bottlenecks, uncommitted tribal habits, and low AI leverage.

### Manual line-by-line syntax reviews

Engineers spending hours reading thousands of lines of generated diffs in pull requests. This causes
reviewer fatigue, blinds reviewers to deep logic errors, and stalls delivery. If a check can be
verified deterministically (types, formatting, linting, complexity, contracts, unit correctness),
it **must be enforced by deterministic controls** in CI. Humans perform Minimum Human Validation on
client intent and safety invariants only.

### Skipping client meetings & building from stale tickets

Engineers isolated from client dialogue, relying on third-hand ticket summaries. In Meeting-Driven
Development, client dialogue is the primary signal source, captured and structured by AI in real time.

### The AI centre of excellence that owns delivery

A central team that writes the AI-assisted code for everyone. It becomes a queue, squads lose
ownership, and the practice never spreads. Enablement ships capabilities, not features.

### Enablement as an approval board

Platform or security turning into a gate squads must ask permission from. The correct answer to
recurring approval requests is an automated deterministic guardrail, not a meeting.

### Technology-layer squads

"Frontend squad", "API squad", "data squad". Every user outcome then requires three squads and two
hand-offs. Boundaries follow outcomes.

## Process & Quality

### Skipping Spec

Feeding a vague meeting snippet straight to a build agent without structuring acceptance criteria.
The model fills the gaps with plausible assumptions, and auto-validation cannot verify what was
never specified. Ambiguity is cheapest to remove in [L2 Spec](./layer-spec).

### Weak deterministic controls ("Trust the model")

Relying on LLM self-critique or superficial unit tests that do not test invariants. Generated code
must face dense deterministic controls: compilers, strict type systems, AST linters, contract tests,
and mutation testing.

### Hand-fixing generated bugs

An engineer spotting a bug in generated output and manually typing the fix into the code file.
The correct response is: add a deterministic test or update the [Context Layer](./context-layer)
instruction, then let the AI agent regenerate and heal the implementation.

### Uniform review effort

Spending the same attention on an internal refactor and an auth/PII permissions change. Review is
risk-weighted or it is theatre.

### Batching releases

Holding changes for a weekly release "for safety". Batching multiplies blast radius and destroys the
correlation between a change and its effect.

## Context & AI usage

### Prompting instead of context

Increasingly elaborate prompts re-explaining the same conventions in chat. That is a missing
[Context Layer](./context-layer), not a prompt engineering skill gap.

### The everything instruction

One 900-line instruction file covering all of engineering. Models weight it poorly, humans stop
reading it, and it drifts. Small, scoped, evidence-driven artifacts.

### Stale context left in place

An instruction describing a framework the company migrated away from. Worse than no instruction: it
produces confident, consistent, wrong output at scale.

### Vibes-based rollout

Trying a new model on one prompt, liking it, enabling it for everyone. Without
[evaluation](./evaluation), a single change can make the whole organization worse overnight.

### Agents with production credentials

An agent able to act directly on production because it was convenient. Agents act through pull
requests behind deterministic controls; humans validate before merge.

### Tool sprawl and context fragmentation

Spreading work across disconnected SaaS tools (Jira for tickets, Confluence for specs, Slack for
discussions, Jenkins for CI, and Git for code). This fragments the knowledge graph that AI agents
depend on, forcing brittle integrations, synchronization lags, and loss of original client meeting
context. Agentic Software Factory consolidates the lifecycle into a single unified substrate (such as the GitHub
ecosystem) where business needs, code, deterministic CI, and releases share one unbroken context graph.

## Measurement

### Counting output volume

Lines of code, pull requests, suggestions accepted. Generation makes all of these trivially
inflatable and none of them meaningful.

### Never deleting anything

A codebase where invalidated features accumulate because deleting feels like waste. Every dead
feature taxes every future generation pass and every future reviewer.
