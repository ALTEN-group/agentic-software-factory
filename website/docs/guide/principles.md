# Principles

Nine principles govern every decision in Flow Stack. When a rule in this documentation conflicts
with local convenience, the principle wins.

## 1. Build quickly, validate constantly

Shipping is how a hypothesis becomes evidence. Anything that delays feedback — long branches,
batched releases, manual approval queues — is treated as a defect in the model, not a fact of life.

## 2. Automate everything repetitive

Any task performed the same way three times is a candidate for automation: a script, a CI job, a
skill, or an agent. The team's scarce resource is judgement, not keystrokes.

## 3. Keep human judgement on high-risk decisions

AI is a multiplier, never an uncontrolled autonomous actor. The higher the blast radius, the more
explicit the human accountability. See [Decision Rights](./decision-rights).

## 4. Decisions are made close to the customer

Squads decide inside their outcome. Escalation is for cross-squad conflicts, security exposure, and
external commitments — not for routine trade-offs.

## 5. Context beats prompting

A well-fed model with a poor prompt outperforms a well-prompted model with no context. The
organization invests in the [Context Layer](./context-layer) before it invests in prompt tricks.

## 6. Everything that matters is a committed artifact

Instructions, skills, agent definitions, specs, ADRs, test plans, and runbooks live in the
repository, are reviewed, and are versioned. Nothing operationally important lives only in a chat
history.

## 7. Generated code is a draft until proven

Output from a model has the same status as output from a new hire: plausible, useful, unverified.
[Proof](./layer-proof) is the layer that converts drafts into changes the team stands behind.

## 8. Secure and compliant by default

Guardrails are applied by the platform, not by discipline. A squad should have to work hard to do
something unsafe. See [Guardrails](./guardrails).

## 9. Optimize flow, never output

More pull requests is not progress. The model is steered by lead time, change failure rate, and
customer outcomes. See [Metrics](./metrics).

## Principle conflicts

When two principles collide, this is the resolution order:

1. Safety and compliance (8, 3)
2. Customer outcome (4, 1)
3. Flow (9, 2)
4. Leverage (5, 6, 7)

A squad that cannot resolve a conflict in that order escalates it as a governance question, not as
an engineering question.
