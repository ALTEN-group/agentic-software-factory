# Metrics

Flow Stack is steered by a deliberately small set of metrics. Everything measured is measured because
a decision depends on it.

## Flow metrics

The four delivery metrics, measured per squad, trended over rolling four-week windows.

| Metric | Definition | Direction |
|---|---|---|
| **Lead time for change** | First commit → running in production | Down |
| **Deployment frequency** | Production deployments per week | Up |
| **Change failure rate** | Deployments causing a rollback, flag-off, or incident | Down |
| **Time to restore** | Detection → mitigation | Down |

These are health indicators, not targets. A squad gaming deployment frequency with empty deploys has
broken the instrument, not improved the flow.

## Outcome metrics

| Metric | Definition |
|---|---|
| **Hypothesis validation rate** | Validated / total hypotheses closed |
| **Feature deletion rate** | Invalidated features removed within one cycle |
| **Time to evidence** | Intent committed → first real usage signal |

A validation rate near 100 % means the squad is only shipping safe bets and is not learning
anything. A healthy range is uncomfortable.

## AI leverage metrics

| Metric | Definition | Watch for |
|---|---|---|
| **Acceptance rate** | Generated artifacts merged without substantial rework | Falling → context layer drift |
| **Rework rate** | Accepted output corrected within 14 days | Rising → review is too shallow |
| **Assisted share per layer** | Share of each layer's output produced with AI | Concentration in L3 only |
| **Cost per merged change** | Model spend / merged changes | Rising without lead-time gain |
| **Context hit rate** | Sessions where committed context was sufficient | Falling → artifacts missing or stale |

## Quality metrics

| Metric | Definition |
|---|---|
| **Escaped defect rate** | Defects found in production / total defects found |
| **Coverage on changed lines** | Per pull request, non-decreasing |
| **Flaky test ratio** | Quarantined tests / total tests |
| **Mean review depth on high-risk changes** | Time spent reviewing, weighted by blast radius |

## What is deliberately not measured

| Not measured | Why |
|---|---|
| Lines of code | Generation makes it meaningless and perverse |
| Story points velocity | Measures estimation, not value |
| Individual output | Destroys the collaboration the model depends on |
| Assistant suggestion acceptance in the editor | Correlates with nothing that matters |
| Hours worked | Not an outcome |

## Review

Flow and quality metrics are reviewed weekly by the squad; AI leverage and cost monthly with
enablement; the metric set itself quarterly. A metric that has not driven a decision in two quarters
is removed.
