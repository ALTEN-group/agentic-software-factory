# Metrics

Agentic Software Factory is steered by a deliberately small set of metrics. Everything measured is measured because
a decision depends on it.

## Flow metrics

The core delivery metrics, measured per squad over rolling four-week windows:

| Metric | Definition | Direction | Target |
|---|---|---|---|
| **Meeting-to-Production Lead Time** | Client meeting transcription → running in production | Down | < 24–48 hours for standard changes |
| **Deployment frequency** | Production deployments per week | Up | Multiple daily deployments |
| **Change failure rate** | Deployments causing rollback, flag shutoff, or incident | Down | < 1% |
| **Time to restore** | Detection of production fault → mitigation | Down | < 15 minutes |

## AI autonomy & leverage metrics

| Metric | Definition | Watch for |
|---|---|---|
| **AI code generation share** | Percentage of code, tests, and docs written by AI | Target **100%** (zero human syntax typing) |
| **First-pass green rate in Code** | Work items where the agent's automated checks and tests were green on the first run | < 80% indicates Persistent Context drift or missing instructions |
| **Deterministic control pass rate** | Pull requests passing all deterministic controls on the first CI run in Prove | < 80% indicates weak automated checks or missing context |
| **Fix-loop count** | Auto-fix loops required before a green pass | > 3 loops indicates poor task decomposition in Plan |
| **Acceptance rate** | Generated artifacts merged without substantial rework | Falling indicates Persistent Context drift |
| **Rework rate** | Accepted output corrected within 14 days | Rising indicates validation is too shallow |
| **Human rework rate** | Pull requests where a human had to alter code syntax | Must trend to **0%**; fixes belong in context, not code |
| **Minimum human validation turnaround** | Time between the all-green deterministic pass and human sign-off | Rising indicates reviewers are slipping into manual reading |
| **Assisted share per stage** | Share of each stage's output produced with AI | Concentration in Stage 4 (Code) only |
| **Context hit rate** | Sessions where committed Persistent Context was sufficient | Falling indicates artifacts missing or stale |
| **Cost per merged change** | Model spend / merged changes | Cost spikes without a matching lead time reduction |

## Outcome metrics

| Metric | Definition |
|---|---|
| **Hypothesis validation rate** | Validated / total hypotheses closed |
| **Feature deletion rate** | Invalidated features removed within one cycle |
| **Time to evidence** | Plan record committed → first real usage signal |

A validation rate near 100 % means the squad is only shipping safe bets and is not learning
anything. A healthy range is uncomfortable.

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
