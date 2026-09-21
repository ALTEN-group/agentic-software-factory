# Decision Rights

Speed comes from knowing who decides. Agentic Software Factory makes decision rights explicit so that squads never
wait for permission they did not need, and never take a decision that was not theirs.

## Default

**The squad decides**, unless the decision appears in the table below.

## Decision table

| Decision | Decided by | Consulted | Recorded as |
|---|---|---|---|
| What to build next inside the outcome | Product lead | Squad, customers | Scorecard row |
| Whether to run an experiment | Product lead | Data owner | Hypothesis entry |
| Implementation approach inside the squad's code | Engineer | Squad | Pull request |
| Public contract or cross-service boundary change | Engineering lead | Owning squads | ADR |
| Data model change affecting other squads | Engineering lead | Data owner, affected squads | ADR + migration plan |
| Security-sensitive change (auth, PII, billing) | Security owner | Engineering lead, squad | Review record on the pull request |
| Adding a new runtime, database, or vendor | Engineering lead | Platform owner, security | ADR |
| AI usage policy and model access | AI enablement lead | Security, legal | Policy version |
| Adopting a new model, agent, or prompt standard | AI enablement lead | Squads | Evaluation report |
| Release of a customer-facing commitment | Product lead | Support, sales | Changelog |
| Rollback during an incident | Whoever detects it | None — act first | Incident record |
| Deleting an invalidated feature | Product lead | Squad | Ledger verdict |

## Escalation

Escalate only for: cross-squad conflict, security exposure, compliance obligation, external
commitment, or budget impact. An escalation names the decision, the options, the recommendation, and
the date by which silence means the recommendation is adopted.

## AI-specific accountability and Minimum Human Validation

AI executes the process at maximum capability: meeting transcription, intent structuring, 100% of
code generation, and closed-loop deterministic auto-validation.

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

In Agentic Software Factory, **line-by-line manual code syntax review is officially banned as a gate**:
- If a check can be evaluated deterministically (types, formatting, linting, complexity, contracts, unit correctness), it **must be enforced by deterministic controls** in CI.
- Human review is strictly **Minimum Human Validation**: checking the client intent, reviewing the preview environment, verifying invariant safety, and confirming rollback readiness.

## Reversibility

The weight of a decision is set by how hard it is to undo.

| Type | Bar | Example |
|---|---|---|
| **Reversible** | Zero-touch auto-merge or 1-click validation once all deterministic controls are green | Internal refactor, copy change, non-breaking logic update |
| **Costly to reverse** | Single specification engineer validation + ADR | New public endpoint, new external dependency, schema addition |
| **Irreversible** | Dual human sign-off (Lead + Security) + verified rollback plan | Destructive data migration, breaking public API contract, infrastructure re-architecture |

Treating a reversible decision as irreversible is as expensive as the opposite — it just costs time
instead of money.
