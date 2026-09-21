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

## Stage 1 — Foundation and guardrails (4–8 weeks)

**Goal:** make the safe, fast path exist before asking anyone to use it.

- Stand up [Foundation](./layer-foundation): environments from source, one pipeline skeleton,
  preview deploys.
- Turn on [Guardrails](./guardrails): branch protection, scanning, secret push protection.
- Publish the [AI Usage Policy](./ai-policy) and sanction the tools.
- Set up the model gateway with quotas and cost attribution.

**Exit:** a new service can be created, deployed to preview, and merged to production without a
ticket to a human.

## Stage 2 — One squad, full stack (1 quarter)

**Goal:** run the whole model somewhere real before scaling it.

- Pick one squad with a genuine outcome and a supportive lead. Not the most critical system; not
  the least.
- Run L1 → L6 as written: scorecard, intent records, plan-first build loop, risk-weighted review,
  progressive release, hypothesis ledger.
- Build the first [Context Layer](./context-layer) artifacts from observed corrections.
- Stand up the [evaluation](./evaluation) harness with its first twenty cases.

**Exit:** the pilot squad's lead time and change failure rate have improved, and it can describe the
model without reading this site.

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
