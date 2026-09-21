# Roles

Roles in Agentic Software Factory describe **accountabilities**, not legacy job descriptions. Because developers
**do not write code syntax**, engineering accountabilities shift entirely toward specification,
context curation, deterministic testing, and safety governance.

## Squad roles

### Product lead

- Owns customer relationship and outcome metrics.
- Leads client meetings and collaborates with AI to synthesize the [Signal](./layer-signal) backlog.
- Ranks the opportunity scorecard and defends business value decisions.
- Validates that finished software faithfully solves the client's business need.
- Decides *do now / experiment / later / no* — recording the rationale for `no`.

### Specification Engineer (formerly Developer)

- **Does not write code syntax manually.**
- Attends client meetings to capture deep technical constraints and domain models.
- Refines AI-synthesized [Intent](./layer-intent) records, defining unambiguous, testable acceptance criteria.
- Validates the AI agent's technical plan before autonomous code generation starts.
- Designs and commits **dense deterministic controls** (types, linters, contract suites, mutation tests).
- Conducts **Minimum Human Validation** focusing on client intent and safety invariants — never line-by-line syntax reviews.
- Carries operational and production support for what the squad deploys.

### Architect

- Owns cross-cutting architectural cohesion, system boundaries, and API standards.
- Validates technical design plans for high-blast radius initiatives before [Build](./layer-build) begins.
- Reviews and signs Architecture Decision Records (ADRs).
- Shared across squads; ensures that autonomous agent code generation does not fragment architectural patterns.

### Designer

- Owns user experience, interaction architecture, and design tokens.
- Defines observable UI/UX criteria directly from client conversations.
- Validates the live preview environment during Minimum Human Validation.

### AI / Context Specialist

- Curates and maintains the squad's [Context Layer](./context-layer) (instructions, skills, specialized agents).
- Tunes deterministic harnesses and closed-loop self-healing agent configurations.
- Runs [evaluation](./evaluation) before new models, system prompts, or agent roles are adopted.

## Enablement roles

### Engineering lead

- Owns cross-squad technical architecture and ADR governance.
- Final technical arbiter on **Critical** blast-radius changes.
- Ensures the platform Foundation provides world-class agentic development rails.

### Security & compliance owner

- Defines automated security guardrails and policy-as-code rules (OPA / Semgrep).
- Mandatory reviewer on high-blast radius changes (auth, encryption, billing, PII).
- Enforces data classification boundaries preventing client PII from leaking to external models.

### Platform owner

- Owns self-service environments, deterministic CI/CD runners, and progressive deployment rails.
- Ensures agent sandboxes and preview environments deploy instantly without manual intervention.

### AI enablement lead

- Owns the [AI usage policy](./ai-policy), model routing gateways, and cost attribution.
- Provides client meeting intelligence infrastructure (transcription, extraction, Intent generation).
- Owns the organization-wide evaluation harness.

## Role matrix per layer

| Layer | Accountable | Consulted | AI Agent Execution |
|---|---|---|---|
| [L0 Foundation](./layer-foundation) | Platform owner | Engineering lead, security owner | Self-service template generation & monitoring |
| [L1 Signal](./layer-signal) | Product lead | Specification engineer, client | **Meeting transcription & Intent extraction** |
| [L2 Intent](./layer-intent) | Product lead + Specification engineer | Architect, designer, security | **Specification drafting & ambiguity detection** |
| [L3 Build](./layer-build) | Specification engineer | Architect (high-risk) | **100% Autonomous code & test generation** |
| [L4 Proof](./layer-proof) | Specification engineer (Minimum Human Validation) | Security owner (high-risk) | **Closed-loop deterministic auto-validation** |
| [L5 Release](./layer-release) | Squad | Product lead, platform | **Progressive rollout & anomaly monitoring** |
| [L6 Learn](./layer-learn) | Product lead + data owner | Whole squad, AI specialist | **Outcome correlation & Context Layer updates** |
