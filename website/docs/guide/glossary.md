# Glossary

Terms used throughout Agentic Software Factory, with the precise meaning they carry in this model.

| Term | Meaning in Agentic Software Factory |
|---|---|
| **Operating model** | How people, process, tools, decisions, and responsibilities fit together to deliver and run software. |
| **Meeting-Driven Development (MDD)** | The operating flow where software changes originate directly in client and stakeholder conversations, transcribed, synthesized, and structured into formal Intent records by AI in real time. |
| **Zero Developer Coding** | The operational standard where developers do not write syntax. AI generates 100% of code, tests, and documentation, while engineers focus on specifications, architecture, and verification. |
| **Specification Engineer** | The evolved role of the software developer who designs formal problem specifications, curates the Context Layer, and constructs deterministic control suites rather than manually authoring code. |
| **Deterministic Controls** | Binary, executable verification mechanisms (compilers, strict type checkers, AST linters, contract tests, mutation testing, SAST, schema validators) that objectively prove correctness without probabilistic ambiguity. |
| **AI Auto-Validation** | The closed-loop self-healing cycle where an AI agent executes code against deterministic controls, analyzes compiler/test failures, and autonomously iterates until 100% of gates pass. |
| **Minimum Human Validation** | The targeted governance step where humans validate high-level business intent, client outcome, and safety invariants once deterministic controls are green — completely eliminating manual line-by-line syntax reviews. |
| **Layer** | One of the seven stages every unit of work crosses (L0–L6). A layer has an owner, an input, an output, and an exit gate. |
| **Pillar** | A concern that crosses every layer: People, Governance, Context. |
| **Squad** | A small cross-functional team that owns a user outcome end-to-end, from client discovery to production support. |
| **Outcome** | A measurable change in customer or business behaviour. Not a feature, not a ticket. |
| **Need** | Any raw input suggesting something is worth doing, prioritized via client meetings, usage data, and experiments. |
| **Spec** | A prioritized need turned into a decidable, machine-testable statement: problem, outcome metric, acceptance criteria, constraints, and architecture. |
| **Exit gate** | The condition a work item must satisfy to leave a layer. Gates are automated via deterministic controls wherever possible. |
| **Blast radius** | The maximum damage a change can do if it is wrong. Determines the level of minimum human validation required. |
| **Context Layer** | The committed corpus the organization feeds to models: instructions, skills, agents, specs, ADRs. |
| **Forge** | The packaged bundle of specs, ADRs, and instructions assembled for a specific work item, fed to the model at the [Spec](./layer-spec) planning step. |
| **Instruction** | A standing rule injected automatically when matching files are in context. |
| **Skill** | An on-demand, named workflow with a contract, references, and sometimes scripts. |
| **Agent** | A named specialist configuration selected explicitly for a bounded kind of work. |
| **AI leverage** | The proportion of the delivery lifecycle executed autonomously by AI, approaching 100% in generation and auto-validation. |
| **Acceptance** | A targeted human validation that an auto-validated artifact satisfies client intent and safety boundaries. |
| **Progressive delivery** | Releasing behind flags, to a canary, or to a percentage of traffic, with automatic rollback triggers. |
| **Enablement function** | A lightweight shared team (platform, security, data, AI enablement) that makes squads faster without owning their outcomes. |
| **Flow metric** | Lead time, deployment frequency, change failure rate, time to restore. The steering instruments of the model. |
| **Anti-pattern** | A behaviour that looks like adoption but reverses the intended effect. See [Anti-patterns](./anti-patterns). |
