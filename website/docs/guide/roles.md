# Roles

Roles in Flow Stack describe **accountabilities**, not job titles or headcount. One person can hold
several; a role is never held by nobody.

## Squad roles

### Product lead

- Owns the outcome and its metric.
- Ranks the [Signal](./layer-signal) list and defends the ranking.
- Signs off customer-facing wording and commitments.
- Decides *do now / experiment / later / no* — and records the reason for `no`.

### Engineer

- Owns correctness, architecture inside the outcome, and the final merge.
- Validates every AI implementation plan before code is generated.
- Carries production support for what the squad ships.
- Cannot delegate accountability for a change to an assistant.

### Designer

- Owns interaction, flow, and content quality.
- Provides the acceptance criteria for anything a user sees.

### Data / analytics owner

- Owns instrumentation and metric definitions.
- Designs experiments and calls their outcome honestly.
- Guards against metric drift and vanity metrics.

### AI / automation specialist

- Owns the squad's slice of the [Context Layer](./context-layer).
- Packages recurring work into skills and agents.
- Runs [evaluation](./evaluation) before a model, prompt, or agent change is adopted.

## Enablement roles

### Engineering lead

- Owns cross-squad technical coherence and the ADR bar.
- Final technical arbiter on **Critical** blast-radius changes.
- Owns the health of [Foundation](./layer-foundation) from the squads' point of view.

### Security owner

- Owns secure defaults and the threat model.
- Mandatory reviewer on auth, permissions, PII, billing, and infrastructure changes.
- Owns the data classification rules that bound AI usage.

### Platform owner

- Owns environments, pipelines, and shared services.
- Accountable for self-service: any capability requiring a ticket is a defect.

### AI enablement lead

- Owns the [AI usage policy](./ai-policy), model access, quotas, and cost attribution.
- Owns the evaluation harness and the bar a change must clear to be adopted.

## Role matrix per layer

| Layer | Accountable | Consulted |
|---|---|---|
| [L0 Foundation](./layer-foundation) | Platform owner | Engineering lead, security owner |
| [L1 Signal](./layer-signal) | Product lead | Data owner, engineers |
| [L2 Intent](./layer-intent) | Product lead + engineer | Designer, security owner (high risk) |
| [L3 Build](./layer-build) | Engineer | AI specialist |
| [L4 Proof](./layer-proof) | Engineer | Security owner (high risk), designer |
| [L5 Release](./layer-release) | Squad | Platform owner, product lead |
| [L6 Learn](./layer-learn) | Product lead + data owner | Whole squad, AI enablement |
