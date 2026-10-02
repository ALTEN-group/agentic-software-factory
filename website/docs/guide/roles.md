# Roles

Roles in Agentic Software Factory describe **accountabilities**, not legacy job descriptions. Because developers
**do not write code syntax**, engineering accountabilities shift entirely toward specification,
context curation, deterministic testing, and safety governance.

## Squad roles

### Product lead

- Owns customer relationship and outcome metrics.
- Leads client meetings and collaborates with AI to synthesize the [Triage](./stage-triage) backlog.
- Ranks the [Triage](./stage-triage) scorecard and defends business value decisions.
- Validates that finished software faithfully solves the client's business need.
- Decides *do now / experiment / later / no* — recording the rationale for `no`.

### Specification Engineer

- **Does not write code syntax manually.**
- Attends client meetings to capture deep technical constraints and domain models.
- Refines AI-synthesized [Plan](./stage-plan) records, defining unambiguous, testable acceptance criteria.
- Validates the implementation plan in the Validate step of [Plan](./stage-plan), before autonomous code generation starts.
- Designs and commits the **automated checks** (types, linters, tests) and the **dense deterministic controls** (contract suites, mutation tests, security scans).
- Conducts **Minimum Human Validation** focusing on client intent and safety invariants — never line-by-line syntax reviews.
- Carries operational and production support for what the squad deploys.

### Architect

- Owns cross-cutting architectural cohesion, system boundaries, and API standards.
- Validates technical design plans for high-blast radius initiatives before [Code](./stage-code) begins.
- Reviews and signs Architecture Decision Records (ADRs).
- Shared across squads; ensures that autonomous agent code generation does not fragment architectural patterns.

### Designer

- Owns user experience, interaction architecture, and design tokens.
- Defines observable UI/UX criteria directly from client conversations.
- Validates the live preview environment during Minimum Human Validation.

### AI / Context Specialist

- Curates and maintains the squad's [Persistent Context](./persistent-context) (instructions, prompts, skills, specialized agents).
- Tunes agent configurations and the fix-loop settings used in Code and Prove.
- Runs evaluations before new models, system prompts, or agent roles are adopted.

## Enablement roles

### Engineering lead

- Owns cross-squad technical architecture and ADR governance.
- Final technical arbiter on **Critical** blast-radius changes.
- Ensures the platform rails provide world-class agentic development rails.

### Security & compliance owner

- Defines automated security guardrails and policy-as-code rules (OPA / Semgrep).
- Mandatory reviewer on high-blast radius changes (auth, encryption, billing, PII).
- Enforces data classification boundaries preventing client PII from leaking to external models.

### Platform owner

- Owns self-service environments, deterministic CI/CD runners, and progressive deployment rails.
- Ensures agent sandboxes and preview environments deploy instantly without manual intervention.

### AI enablement lead

- Owns the [AI usage policy](./ai-policy), model routing gateways, and cost attribution.
- Provides client meeting intelligence infrastructure (transcription, need extraction, Plan drafting).
- Owns the organization-wide evaluation harness.

## Role matrix per stage

| Stage | Accountable | Consulted | AI Agent Execution |
|---|---|---|---|
| [🎙️ 0 — Meet](./stage-meet) | Product lead + Specification engineer | Client | Client dialogue capture & discovery |
| [🎯 1 — Triage](./stage-triage) | Product lead | Specification engineer, client | Transcript analysis, business need ranking & backlog issue logging |
| [💡 2 — Think](./stage-think) | Product lead + Architect | Specification engineer, security | **Option exploration, Forge reuse discovery, ADR drafting** |
| [📋 3 — Plan](./stage-plan) | Product lead + Specification engineer | Architect, designer, security | **Plan & spec drafting, ambiguity detection** |
| [⚡ 4 — Code](./stage-code) | Specification engineer | Architect (high-risk) | **Fast autonomous generate-test-fix loops** |
| [✅ 5 — Prove](./stage-prove) | Specification engineer (Minimum Human Validation) | Security owner (high-risk) | **Deterministic gate validation & agent auto-remediation** |
| [🚀 6 — Release](./stage-release) | Squad | Product lead, platform | **Automated deployment, reversible at any step** |
| [📈 7 — Learn](./stage-learn) | Product lead + data owner | Whole squad, AI specialist | **Production telemetry analysis & predictive monitoring** |
