# Decision Rights

Speed comes from knowing who decides. Agentic Software Factory makes decision rights explicit so that squads never
wait for permission they did not need, and never take a decision that was not theirs.

## Default

**The squad decides**, unless the decision appears in the table below.

## Decision table

| Decision | Decided by | Consulted | Recorded as |
|---|---|---|---|
| What to build next inside the outcome | Product Owner | Squad, customers | Scorecard row |
| Whether to run an experiment | Product Owner | Support | Hypothesis entry |
| Implementation approach inside the squad's code | Developer | Squad | Pull request |
| Public contract or cross-service boundary change | Architect | Owning squads | Decision record |
| Data model change affecting other squads | Architect | Support, affected squads | Decision record + migration plan |
| Security-sensitive change (auth, PII, billing) | Architect | Developer, squad | Review record on the pull request |
| Adding a new runtime, database, or vendor | Architect | DevOps | Decision record |
| AI usage policy and model access | Architect | Legal | Policy version |
| Adopting a new model, agent, or prompt standard | Architect | Squads | Evaluation report |
| Release of a customer-facing commitment | Product Owner | Support, sales | Changelog |
| Rollback during an incident | Whoever detects it | None — act first | Incident record |
| Deleting an invalidated feature | Product Owner | Squad | Ledger verdict |

## Escalation

Escalate only for: cross-squad conflict, security exposure, compliance obligation, external
commitment, or budget impact. An escalation names the decision, the options, the recommendation, and
the date by which silence means the recommendation is adopted.

## AI-specific accountability and Minimum Human Validation

AI executes the process at maximum capability: meeting transcription, business need extraction, 100% of
code generation, and deterministic validation with agent auto-remediation.

However, **accountability always resolves to a named person**:
- Humans decide **what** problem to solve and approve client commitments.
- Humans validate high-level business intent and safety invariants (**Minimum Human Validation**).
- Humans sign off on high-blast radius security, compliance, and architectural boundaries.
- Humans own incident resolution and postmortem actions.

::: danger
No decision in the table above may be recorded as made by a tool or agent. Every row resolves to a
named person. "The AI agent validated and merged it" is not a permissible audit record.
:::

## Line-by-line review ban

In Agentic Software Factory, **line-by-line manual code syntax review is officially banned as a gate**. Anything that
can be evaluated automatically is enforced by automated checks and [Deterministic Controls](./deterministic-controls) in CI.
Human review is strictly **Minimum Human Validation**, described in [5 — Prove](./stage-prove#minimum-human-validation).

## Blast radius and required human validation

The weight of a decision is set by its blast radius and by how hard it is to undo. Blast radius is classified once, in
[2 — Think](./stage-think), and checked again in [3 — Plan](./stage-plan) against the file scope. It then sets the human validation a change needs in [5 — Prove](./stage-prove).

| Blast radius | Criteria | Required human validation |
|---|---|---|
| **Low** | Internal refactor, non-breaking schema change, copy edit behind green deterministic tests | **Zero-touch auto-merge** or 1-click squad acknowledgement |
| **Medium** | New public endpoint, schema addition, integration with an external vendor | **Single-person validation**: Developer verifies client intent and the preview environment |
| **High** | Auth, permissions, billing, PII processing, data migration | **Dual validation**: Developer + Architect verify business intent, access boundaries, and the rollback mechanism |
| **Critical** | Irreversible data migration, breaking public contract, infrastructure change | **Lead sign-off**: Architect + Product Owner approve business continuity and a staged rollout |

Treating a reversible decision as irreversible is as expensive as the opposite. It just costs time
instead of money.
