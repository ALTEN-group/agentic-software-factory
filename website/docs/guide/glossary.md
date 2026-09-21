# Glossary

Terms used throughout Flow Stack, with the precise meaning they carry in this model.

| Term | Meaning in Flow Stack |
|---|---|
| **Operating model** | How people, process, tools, decisions, and responsibilities fit together to deliver and run software. |
| **Layer** | One of the seven stages every unit of work crosses (L0–L6). A layer has an owner, an input, an output, and an exit gate. |
| **Pillar** | A concern that crosses every layer: People, Governance, Context. |
| **Squad** | A small cross-functional team that owns a user outcome end-to-end, from discovery to production support. |
| **Outcome** | A measurable change in customer or business behaviour. Not a feature, not a ticket. |
| **Signal** | Any raw input suggesting something is worth doing: interview, ticket, metric, experiment, sales feedback. |
| **Intent** | A signal turned into a decidable, testable statement: problem, outcome metric, acceptance criteria, constraints. |
| **Exit gate** | The condition a work item must satisfy to leave a layer. Gates are automated where possible. |
| **Blast radius** | The maximum damage a change can do if it is wrong. Drives how much human review it gets. |
| **Context Layer** | The committed corpus the organization feeds to models: instructions, skills, agents, specs, ADRs. |
| **Instruction** | A standing rule injected automatically when matching files are in context. |
| **Skill** | An on-demand, named workflow with a contract, references, and sometimes scripts. |
| **Agent** | A named specialist configuration selected explicitly for a bounded kind of work. |
| **AI leverage** | The share of a delivery step produced by AI and accepted after review, measured per layer. |
| **Acceptance** | A human decision that a generated artifact is correct, safe, and aligned with intent. |
| **Progressive delivery** | Releasing behind flags, to a canary, or to a percentage of traffic, with automatic rollback triggers. |
| **Enablement function** | A lightweight shared team (platform, security, data, AI enablement) that makes squads faster without owning their outcomes. |
| **Flow metric** | Lead time, deployment frequency, change failure rate, time to restore. The steering instruments of the model. |
| **Anti-pattern** | A behaviour that looks like adoption but reverses the intended effect. See [Anti-patterns](./anti-patterns). |
