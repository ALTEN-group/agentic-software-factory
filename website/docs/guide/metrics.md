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

## Metrics per use case

The flow metrics show how the whole line performs. To improve one AI task, measure that task on its own. A **use case** is
one AI-assisted task inside a stage, such as creating automated tests. For every use case, measure the same few things per
user story:

| Measure | Question it answers |
|---|---|
| **Time spent** | How long does this subtask take for one user story? |
| **Iterations** | How many attempts does it take to get it right? |
| **Cost** | How much does the model spend for one user story? |
| **Human intervention** | How often does a person have to step in? |
| **First-pass success** | How often is it right the first time? |

Durations come from the timestamps the pipeline already records (issue, branch, pull request, CI run), so nobody times
anything by hand. The examples below show what a healthy use case looks like over time.

### Automated test creation (Code)

Tests are generated together with the code. The first question is where the time goes in a user story. The second is
whether the test-creation subtask gets faster as the team improves its context and skills.

<MetricChart
  type="bar"
  title="Where the time goes in one user story"
  unit="minutes"
  :labels="['Generate code', 'Create tests', 'Fix loop', 'Documentation']"
  :values="[18, 22, 9, 4]"
/>

Test creation is the biggest slice here, so it is worth measuring on its own.

<MetricChart
  title="Time spent on test creation, per user story (median per week)"
  unit="minutes"
  :labels="['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']"
  :values="[42, 38, 35, 33, 29, 27, 24, 22]"
  :target="30"
  target-label="target 30"
/>

A falling line means the context and skills for writing tests are improving. A flat line usually means a missing test skill
or instruction. A rising line usually means the acceptance criteria in the Plan record are too vague.

### Fix loops (Code)

<MetricChart
  type="bar"
  title="Average fix loops per work item"
  unit="loops"
  :labels="['W1', 'W2', 'W3', 'W4', 'W5', 'W6']"
  :values="[4.2, 3.8, 3.5, 3.1, 2.9, 2.6]"
  :target="3"
  target-label="limit 3"
/>

Above 3 loops, the work item was probably too big or too vague when it left Plan.

### Backlog issue creation (Triage)

<MetricChart
  title="Hours from the end of a meeting to a ranked backlog issue"
  unit="hours"
  :labels="['W1', 'W2', 'W3', 'W4', 'W5', 'W6']"
  :values="[20, 16, 12, 9, 7, 6]"
  :target="8"
  target-label="target 8"
/>

This is the speed of turning a client conversation into logged, ranked work.

### Deterministic controls on the first run (Prove)

<MetricChart
  title="Pull requests passing all controls on the first CI run"
  unit="%"
  :labels="['W1', 'W2', 'W3', 'W4', 'W5', 'W6']"
  :values="[62, 66, 71, 75, 79, 83]"
  :target="80"
  target-label="target 80%"
  :lower-is-better="false"
/>

A low rate points to weak automated checks in Code or missing context.

### Time to restore (Learn)

<MetricChart
  title="Minutes from detecting a fault to mitigating it"
  unit="minutes"
  :labels="['W1', 'W2', 'W3', 'W4', 'W5', 'W6']"
  :values="[38, 31, 26, 19, 14, 12]"
  :target="15"
  target-label="target 15"
/>

The same targets as the flow metrics apply. The use case view shows which part of the work is improving.

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

Flow, quality, AI leverage, and cost metrics are reviewed weekly by the squad; the metric set itself
quarterly. A metric that has not driven a decision in two quarters
is removed.
