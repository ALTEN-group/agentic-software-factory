---
layout: home

hero:
  name: Flow Stack
  text: The Agentic Software Factory
  tagline: A modern operating model for software development using AI at maximum capability — from client meeting to production release.
  image:
    src: /logo.svg
    alt: Flow Stack
  actions:
    - theme: brand
      text: Get Started
      link: /guide/overview
    - theme: alt
      text: Enterprise Support
      link: https://www.alten.com/

features:
  - icon: 🎙️
    title: Meeting-Driven Development
    details: Client meetings are transcribed, analyzed, and structured by AI in real time into formal Intent records, eliminating manual backlog grooming and lost context.
  - icon: ⚡
    title: Zero developer coding
    details: Developers do not write code syntax. Engineers operate as specification engineers, context architects, and deterministic control builders while AI generates 100% of code.
  - icon: 🛡️
    title: Dense deterministic controls
    details: Compilers, strict type systems, AST linters, contract tests, mutation testing, and SAST drive closed-loop AI auto-validation with autonomous self-healing.
  - icon: 🎯
    title: Minimum human validation
    details: Eliminates line-by-line syntax review fatigue. Human validation is strictly focused on business intent, customer outcome, and safety invariants.
  - icon: 🧠
    title: A persistent context layer
    details: Instructions, skills, specialized agents, and specs are committed artifacts, feeding models exact repository conventions instead of fuzzy prompts.
  - icon: 📈
    title: Seven layers, one continuous flow
    details: Foundation, Signal, Intent, Build, Proof, Release, Learn. Work flows autonomously with full traceability from client conversation to live deployment.
---

## Development process: Meeting-Driven Development

Flow Stack operates on **Meeting-Driven Development**: the development lifecycle begins in the client
meeting and flows autonomously through AI generation to production release.

Developers **do not write code syntax anymore**. Instead, engineers design specifications, curate
the [Context Layer](./guide/context-layer), and build dense [deterministic controls](./guide/guardrails).
AI agents autonomously generate code and tests, auto-validating against deterministic testbeds in
closed self-healing loops before requesting **minimum human validation** for high-level business intent.

```mermaid
---
caption: Meeting-Driven Development — autonomous flow from client meeting to release
---
flowchart LR
    subgraph MDD ["Meeting-Driven Development Loop"]
        direction TB

        subgraph Actors ["Accountable Humans"]
            CUST["Customer / Stakeholder"]
            PO["Product Lead"]
            ENG["Specification Engineer"]
        end

        subgraph Process ["Autonomous AI Flow"]
            MEET["1. Client Meeting"] --> L1(("AI Synthesis"))
            L1 --> INTENT["2. Intent Record & Criteria"]
            INTENT --> L2(("AI Planner"))
            L2 --> PLAN["3. Architecture & Plan"]
            PLAN --> L3(("AI Generator"))
            L3 --> CODE["4. Code, Tests & Docs"]
            
            subgraph AutoVal ["AI Auto-Validation Loop"]
                direction TB
                CODE --> DC{"Deterministic Controls"}
                DC -->|Fail / Errors| SH(("AI Self-Healing"))
                SH -->|Auto-repair| CODE
            end
            
            DC -->|100% Pass| MHV["5. Minimum Human Validation"]
            MHV --> L5(("AI Release Engine"))
            L5 --> RELEASE["6. Progressive Release"]
        end

        subgraph ContextKnowledge ["Committed Context & Controls"]
            FORGE["Forge: Specs & ADRs"] --> L2
            CTX["Context Layer: Instructions & Skills"] --> L3
            HARNESS["Compilers, Linters, Mutation & Contract Tests"] --> DC
        end

        CUST -. Participates in .-> MEET
        PO -. Participates in .-> MEET
        ENG -. Participates in .-> MEET
        ENG -. Signs off plan .-> PLAN
        PO -. Validates intent .-> MHV
        ENG -. Validates invariants .-> MHV
    end

    classDef people fill:#8fce6a,stroke:#5a9c3a,color:#1a3d0a,stroke-width:1.5px;
    classDef ai fill:#ffcc4d,stroke:#d99a00,color:#3d2e00,stroke-width:1.5px;
    classDef task fill:#cfe8fb,stroke:#7fb3d9,color:#0a3050,stroke-width:1.5px;
    classDef context fill:#f5a623,stroke:#c9791a,color:#3d2400,stroke-width:1.5px;
    classDef gate fill:#e1d5e7,stroke:#9673a6,color:#3b1e54,stroke-width:1.5px;

    class CUST,PO,ENG people;
    class L1,L2,L3,SH,L5 ai;
    class MEET,INTENT,PLAN,CODE,RELEASE task;
    class FORGE,CTX,HARNESS context;
    class DC,MHV gate;
```

| Component | Nature | Role in the operating model |
|---|---|---|
| 🎙️ Client Meeting | Collaboration | The primary trigger for software evolution; transcribed and extracted by AI in real time |
| 🟨 AI Agents | Autonomous | Synthesizes intent, designs plans, generates 100% of code, tests, and release notes |
| 🟧 Context & Controls | Committed Assets | Instructions, skills, specs, compilers, AST linters, mutation tests, and contract suites |
| 🟪 AI Auto-Validation | Closed-Loop | Autonomous execution of deterministic controls with self-healing iterations until all pass |
| 🟩 Minimum Human Validation | Targeted Sign-Off | High-level confirmation of business intent and safety invariants — never manual syntax review |

This operational flow turns the [Build](./guide/layer-build) and [Proof](./guide/layer-proof) layers
into an autonomous engine: client dialogue replaces stale tickets, the [Context Layer](./guide/context-layer)
replaces verbal guidance, and [deterministic controls](./guide/guardrails) replace subjective human code reviews.
