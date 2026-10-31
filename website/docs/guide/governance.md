# ⚖️ Governance

Agents decide and execute within recorded rules. Named people own those rules, budgets, and outcomes.

## Who decides

### Default

**All changes can run autonomously**, including public API, schema, security-sensitive, High, and Critical changes. People intervene on unresolved failures or exhausted retries. Review pauses are optional and must be requested.

The owners below are **accountable, not mandatory approvers**. Automated decisions record the agent identity, date, options, evidence, and consequences. They never claim human sign-off.

### Decision table

| Decision | Accountable owner | Consulted on exceptions | Recorded as |
|---|---|---|---|
| What to build next inside the agreed outcome | Product Owner | Squad, customers | Scorecard row |
| Whether to run an experiment | Product Owner | Architect | Hypothesis entry |
| Implementation approach inside the squad's code | Developer | Architect | Pull request |
| Public contract or cross-service boundary change | Architect | Owning squads | Decision record |
| Data model change affecting other squads | Architect | affected squads | Decision record + migration plan |
| Security-sensitive change (auth, PII, billing) | Architect | Developer, squad | Review record on the pull request |
| Adding a new runtime, database, or vendor | Architect | DevOps | Decision record |
| AI usage policy and model access | Architect | Legal | Policy version |
| Adopting a new model, agent, or prompt standard | Architect | Squads | Evaluation report |
| Release of a customer-facing commitment | Product Owner | Architect | Changelog |
| Rollback during an incident | DevOps or QA and maintainer | None — act first | Incident record |
| Deleting an invalidated feature | Product Owner | Squad | Ledger verdict |

### Escalation

Escalate only for: cross-squad conflict, security exposure, compliance obligation, external
commitment, or budget impact. An escalation names the decision, the options, the recommendation, and
the date by which silence means the recommendation is adopted.

### Blast radius and required automated validation {#blast-radius-and-required-human-validation}

Blast radius means the scope and reversibility of a change. [Think](./stage-think) sets the tier; [Plan](./stage-plan) checks it. The tier determines the evidence required in [Prove](./stage-prove), not who must sign.

| Blast radius | Criteria | Required automated validation |
|---|---|---|
| **Low** | Internal refactor, non-breaking schema change, copy edit | Green controls and independent assessment of intent, behaviour, and safety |
| **Medium** | New public endpoint, schema addition, external integration | Low-tier evidence plus contract and integration checks appropriate to the change |
| **High** | Auth, permissions, billing, PII, data migration | Access-boundary and safety checks, with verified rollback evidence |
| **Critical** | Irreversible migration, breaking public contract, infrastructure change | High-tier evidence plus a decision record, continuity checks, and a validated staged rollout |

### Line-by-line review ban

**Manual line-by-line code review is not an allowed gate.** Use automated checks and [controls](./deterministic-controls). [Prove](./stage-prove#minimum-human-validation) independently assesses intent, behaviour, and safety. Human review is optional or handles exceptions.

## Accountability

AI transcribes meetings, extracts needs, writes code, and fixes failed checks. **A named person remains accountable**, without approving each run, for:

- the objectives and policies under which changes are accepted automatically,
- any customer-facing commitment, and the decision of what problem to solve,
- the controls and evidence used to validate business intent and safety invariants,
- security, compliance, and architectural boundaries, including automated High/Critical decisions,
- any change to models, prompts, or agents affecting trust or compliance,
- the resolution of any incident, and its postmortem actions.

## Tooling

Only tools on the sanctioned list may be used with company or client data. Sanctioning
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

Model spend is attributed per squad and reviewed weekly. A workflow whose cost exceeds the value it
creates is redesigned or retired — cheaper models, tighter context, or no AI at all.

## Violations

A policy violation is handled as an incident. A policy that can only be respected
through vigilance is a [Deterministic Controls](./deterministic-controls) defect.
