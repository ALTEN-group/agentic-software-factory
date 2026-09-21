# Evaluation

Prompts, instructions, skills, agents, and models are software. Flow Stack changes them the way it
changes any other software: with a test suite and a bar to clear.

## What is evaluated

| Change | Must be evaluated |
|---|---|
| New or amended instruction | Yes |
| New or amended skill or agent | Yes |
| Model swap or version bump | Yes |
| Gateway routing change | Yes |
| Tool configuration affecting output | Yes |
| A one-off prompt in a single session | No |

## The harness

A set of **cases**. Each case is an input, the context available, and a deterministic assertion on
the output.

| Case type | Asserts |
|---|---|
| **Convention** | Output follows the codebase's structure, naming, and library choices |
| **Correctness** | Generated code compiles, passes its own tests, satisfies criteria |
| **Refusal** | The assistant refuses out-of-policy requests (restricted data, unsafe actions) |
| **Scope** | The change touches only the files it should |
| **Regression** | A previously fixed failure does not return |
| **Cost** | Tokens and latency stay within the workload's budget |

Cases live with the context artifact they cover and run in CI.

## Scoring

| Dimension | Measure |
|---|---|
| Pass rate | Cases passing / total |
| Acceptance rate | Generated artifacts accepted by a human without rework |
| Rework rate | Accepted artifacts later corrected within 14 days |
| Cost per case | Tokens × price, plus latency |
| Variance | Pass rate across repeated runs — instability is a failure |

## The adoption bar

A change is adopted when, against the current baseline:

1. pass rate does not decrease,
2. no refusal case regresses — ever, under any cost argument,
3. cost per case does not increase without a stated, accepted reason,
4. variance stays within the configured band.

The evaluation report is committed with the change and retained indefinitely
([AI Usage Policy](./ai-policy)).

## Baselines

The current production configuration is the baseline. It is re-run weekly to detect **silent drift**
from provider-side model updates. A drift beyond the band opens an incident against the AI
enablement lead, not against a squad.

## Production feedback

Evaluation cases are not invented. They come from [Learn](./layer-learn):

- an output a human had to correct → a new convention or correctness case;
- an unsafe or out-of-policy suggestion → a new refusal case;
- an agent that edited files outside its brief → a new scope case;
- a workflow whose cost surprised the monthly review → a new cost case.

## Anti-pattern

Evaluating on vibes: running one prompt, liking the answer, and rolling it out. It is the fastest way
to make an entire organization consistently worse at once.
