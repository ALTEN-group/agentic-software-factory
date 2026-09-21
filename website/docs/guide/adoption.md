# Adoption Roadmap

Flow Stack is adopted in four stages. Each stage has an entry condition, a scope, and an exit
signal. Skipping a stage is the most reliable way to fail.

## Stage 0 — Baseline (2 weeks)

**Goal:** know where you actually are.

- Measure the four [flow metrics](./metrics) for every team, however ugly the numbers.
- Map the current path from idea to production, including every wait state.
- Inventory AI usage: who uses what, with which data, under which account.
- Classify data and identify where Restricted data currently flows.

**Exit:** a written current-state map and a baseline metric set everyone agrees is true.

## Stage 1 — Foundation, deterministic harness & guardrails (4–8 weeks)

**Goal:** make the safe, autonomous path exist before asking squads to stop writing manual code.

- Stand up [Foundation](./layer-foundation): environments from source, unified pipeline skeleton,
  ephemeral preview deploys.
- Build the **deterministic harness**: AST linters, strict compilers (`tsc --strict`), contract test runners,
  mutation testing framework (Stryker), and security scanners (Semgrep, Trivy).
- Establish the **meeting intelligence pipeline**: automated transcription, speaker diarization,
  and AI Intent extraction tools.
- Turn on [Guardrails](./guardrails): branch protection, secret push protection, and policy-as-code.
- Publish the [AI Usage Policy](./ai-policy) and configure model gateways with quotas and cost attribution.

**Exit:** an AI agent can generate code, run against local deterministic controls, deploy an ephemeral
preview, and open a PR without manual intervention.

## Stage 2 — One squad, full Meeting-Driven flow (1 quarter)

**Goal:** run the complete model somewhere real before scaling it.

- Pick one squad with an active client engagement and an open-minded lead.
- Run L1 → L6 as written:
  - Client meetings transcribed and structured by AI directly into Intent records.
  - Zero developer coding: AI generates 100% of code, tests, and documentation.
  - Closed-loop AI self-healing against deterministic controls.
  - Minimum Human Validation focused strictly on client intent and safety invariants.
  - Progressive release with automated rollback triggers.
- Build the first [Context Layer](./context-layer) artifacts (instructions, skills, specialized agents).
- Stand up the [evaluation](./evaluation) harness with baseline regression cases.

**Exit:** the pilot squad's meeting-to-release lead time drops significantly, developers have stopped
typing code syntax, and change failure rate remains near zero.

## Stage 3 — Scale by pull (2–3 quarters)

**Goal:** spread the model through demand, not mandate.

- Pilot squad members embed in the next squads for a sprint each.
- Enablement converts the pilot's artifacts into the paved road.
- Add squads one at a time; each one contributes context artifacts and evaluation cases back.
- Move decision rights to the [table](./decision-rights) as squads prove they can hold them.

**Exit:** most squads are on the paved road and the operating-model retrospective, not a programme
office, drives changes to the model.

## Sequencing rules

| Rule | Reason |
|---|---|
| Guardrails before acceleration | Speed without guardrails converts a small mistake into an incident |
| Foundation before squads | Otherwise every squad rebuilds the same plumbing, with AI, faster, worse |
| Context layer before agents | Agents amplify whatever context exists, including its absence |
| Evaluation before model changes | Otherwise every change is a coin flip applied to everyone |
| Metrics before claims | You cannot report an improvement you never baselined |

## Realistic expectations

| Horizon | What to expect |
|---|---|
| First month | No velocity gain. Friction, new tooling, new habits. |
| First quarter | Lead time improves in the pilot; review load feels heavier, correctly. |
| Two quarters | Context layer starts paying; acceptance rate climbs; onboarding shortens. |
| One year | The model is how the company works; the argument is about its details, not its existence. |

A leadership team that expects gains in week two will dismantle the model in week six.
