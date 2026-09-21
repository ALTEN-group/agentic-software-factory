# Anti-patterns

Behaviours that look like Flow Stack adoption and quietly reverse its intent. Each one has been the
cause of a failed transformation somewhere.

## Organizational

### The AI centre of excellence that owns delivery

A central team that writes the AI-assisted code for everyone. It becomes a queue, squads lose
ownership, and the practice never spreads. Enablement ships capabilities, not features.

### Enablement as an approval board

Platform or security turning into a gate squads must ask permission from. The correct answer to
recurring approval requests is a [guardrail](./guardrails), not a meeting.

### Technology-layer squads

"Frontend squad", "API squad", "data squad". Every user outcome then requires three squads and two
hand-offs. Boundaries follow outcomes.

### Velocity mandates

"Every squad must reach 40 % AI-generated code." Teams comply by generating code they do not need.
[Metrics](./metrics) steer; they are not quotas.

## Process

### Skipping Intent

Feeding a vague ticket straight to an assistant. The model fills the gaps with plausible
assumptions, and the review discovers them at the most expensive moment. Ambiguity is cheapest to
remove in [L2](./layer-intent).

### Review by rubber stamp

Approving large generated diffs because the pipeline is green. Tests prove the code does what the
tests say, not what the customer needs. [Proof](./layer-proof) requires a human who can explain the
change.

### Uniform review effort

Spending the same attention on a copy change and a permissions change. Review is risk-weighted or it
is theatre.

### Batching releases

Holding changes for a weekly release "for safety". Batching multiplies blast radius and destroys the
correlation between a change and its effect.

### Postmortems with twenty actions

None of them get done, and the next incident is the same one. Three actions, owners, dates.

## AI usage

### Prompting instead of context

Increasingly elaborate prompts re-explaining the same conventions. That is a missing
[Context Layer](./context-layer), not a prompting skill gap.

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
requests; humans merge.

### Shadow tooling

Personal accounts used for company work because the sanctioned tool is slower. This is a symptom:
fix the sanctioned path, then close the shadow one.

## Measurement

### Counting output

Lines, pull requests, suggestions accepted. Generation makes all of these trivially inflatable and
none of them meaningful.

### Never deleting anything

A codebase where invalidated features accumulate because deleting feels like waste. Every dead
feature taxes every future generation pass and every future reviewer.

### Reporting improvement without a baseline

Claiming a gain that was never measured before the change. [Adoption](./adoption) starts with Stage
0 for exactly this reason.
