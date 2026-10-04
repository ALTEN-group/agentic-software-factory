# Governance

Who decides, and what AI may do. Speed comes from knowing who decides, so The Agentic Software Factory makes decision rights
explicit: squads never wait for permission they did not need, and never take a decision that was not theirs. AI is
treated as a production capability: owned, versioned, budgeted, and audited.

## Who decides

### Default

**The squad decides**, unless the decision appears in the table below.

### Decision table

| Decision | Decided by | Consulted | Recorded as |
|---|---|---|---|
| What to build next inside the agreed outcome | Product Owner | Squad, customers | Scorecard row |
| Whether to run an experiment | Product Owner | Architect | Hypothesis entry |
| Implementation approach inside the squad's code | Developer | Architect | Pull request |
| Public contract or cross-service boundary change | Architect | Owning squads | Decision record |
| Data model change affecting other squads | Architect | Support, affected squads | Decision record + migration plan |
| Security-sensitive change (auth, PII, billing) | Architect | Developer, squad | Review record on the pull request |
| Adding a new runtime, database, or vendor | Architect | DevOps | Decision record |
| AI usage policy and model access | Architect | Legal | Policy version |
| Adopting a new model, agent, or prompt standard | Architect | Squads | Evaluation report |
| Release of a customer-facing commitment | Product Owner | Architect | Changelog |
| Rollback during an incident | Maintainer | None — act first | Incident record |
| Deleting an invalidated feature | Product Owner | Squad | Ledger verdict |

### Escalation

Escalate only for: cross-squad conflict, security exposure, compliance obligation, external
commitment, or budget impact. An escalation names the decision, the options, the recommendation, and
the date by which silence means the recommendation is adopted.

### Blast radius and required human validation

The weight of a decision is set by its blast radius and by how hard it is to undo. Blast radius is classified once, in
[2 — Think](./stage-think), and checked again in [3 — Plan](./stage-plan) against the file scope. It then sets the human validation a change needs in [5 — Prove](./stage-prove).

| Blast radius | Criteria | Required human validation |
|---|---|---|
| **Low** | Internal refactor, non-breaking schema change, copy edit behind green deterministic tests | **Zero-touch auto-merge** or 1-click squad acknowledgement |
| **Medium** | New public endpoint, schema addition, integration with an external vendor | **Single-person validation**: Developer verifies client intent and the preview environment |
| **High** | Auth, permissions, billing, PII processing, data migration | **Dual validation**: Developer + Architect verify business intent, access boundaries, and the rollback mechanism |
| **Critical** | Irreversible data migration, breaking public contract, infrastructure change | **Lead sign-off**: Architect + Product Owner approve business continuity and a staged rollout |

### Line-by-line review ban

**Line-by-line manual code syntax review is banned as a gate.** Anything that can be evaluated automatically is
enforced by automated checks and [Deterministic Controls](./deterministic-controls). Human review is strictly
**Minimum Human Validation**, described in [5 — Prove](./stage-prove#minimum-human-validation).

## Accountability

AI executes the process at maximum capability: meeting transcription, business need extraction, 100% of code
generation, and deterministic validation with agent auto-remediation. **Accountability always resolves to a named
person.** These always do:

- final acceptance of any merged change,
- any customer-facing commitment, and the decision of what problem to solve,
- the validation of business intent and safety invariants (**Minimum Human Validation**),
- any security-sensitive change, including sign-off on high-blast radius security, compliance, and architectural boundaries,
- any change to models, prompts, or agents affecting trust or compliance,
- the resolution of any incident, and its postmortem actions.


## Tooling

Only tools on the sanctioned list may be used with Internal or Confidential data. Sanctioning
requires: enterprise tenancy, no training on submitted data, audit logging, SSO, and a signed data
processing agreement.

## Auditability

| What | Retained | Where |
|---|---|---|
| Agent actions on repositories and infrastructure | 12 months | Platform audit log |
| Model, prompt, and agent versions used in CI | 12 months | Build metadata |
| Evaluation reports for adopted changes | Indefinitely | Repository |
| Cost per squad and per workflow | 24 months | Cost dashboard |

## Cost

Model spend is attributed per user and reviewed weekly. A workflow whose cost exceeds the value it
creates is redesigned or retired — cheaper models, tighter context, or no AI at all.

### Violations

A policy violation is handled as an incident. A policy that can only be respected
through vigilance is a [Deterministic Controls](./deterministic-controls) defect.
