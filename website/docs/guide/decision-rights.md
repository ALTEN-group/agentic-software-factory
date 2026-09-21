# Decision Rights

Speed comes from knowing who decides. Flow Stack makes decision rights explicit so that squads never
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

## AI-specific accountability

AI supports decisions. Humans stay accountable for:

- customer-facing commitments,
- production incidents,
- security-sensitive changes,
- model, prompt, or agent changes affecting trust and compliance,
- final acceptance of code and releases.

::: danger
No decision in the table above may be recorded as made by a tool. Every row resolves to a named
person. "The agent decided" is not a valid audit answer.
:::

## Reversibility

The weight of a decision is set by how hard it is to undo.

| Type | Bar | Example |
|---|---|---|
| **Reversible** | Decide fast, alone, in a pull request | Internal refactor, copy change |
| **Costly to reverse** | Decide with one consulted party, record an ADR | New endpoint, new dependency |
| **Irreversible** | Decide with the accountable owner, document the plan and the fallback | Destructive migration, vendor lock-in, public contract break |

Treating a reversible decision as irreversible is as expensive as the opposite — it just costs time
instead of money.
