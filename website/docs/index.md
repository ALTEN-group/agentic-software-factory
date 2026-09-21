---
layout: home

hero:
  name: Flow Stack
  text: The AI-native operating model
  tagline: A layered system that keeps work flowing from signal to production — people, process, AI, and governance as one continuous stack.
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
  - icon: 🧱
    title: Seven layers, one flow
    details: Foundation, Signal, Intent, Build, Proof, Release, Learn. Every unit of work crosses the same layers in the same order, so bottlenecks are visible instead of anecdotal.
  - icon: 🤖
    title: AI as a production capability
    details: Copilots, agents, and evaluation harnesses are owned, versioned, and measured like any other part of the platform — not improvised per developer.
  - icon: 👥
    title: Outcome-owning squads
    details: Small cross-functional squads own a user outcome end-to-end, from discovery through production support, backed by lightweight platform enablement.
  - icon: ⚖️
    title: Explicit decision rights
    details: AI accelerates work; named humans stay accountable for customer commitments, security-sensitive changes, incidents, and final merges.
  - icon: 🧠
    title: A persistent context layer
    details: Instructions, skills, agents, and specs are committed artifacts. The organization's knowledge is reusable input for every model call instead of tribal memory.
  - icon: 📈
    title: Measured on flow, not effort
    details: Lead time, deployment frequency, change failure rate, and AI leverage metrics steer the model. Output volume is never the target.
---

## Development process: Meeting-Driven Development

Flow Stack replaces status meetings with short, role-specific checkpoints around an AI-driven
loop. Each task moves through an LLM step; humans inject **persistent context** — not opinions
repeated live — and step in only where a decision or judgment call is required.

```mermaid
---
caption: Meeting-Driven Development — one work item, start to release
---
flowchart LR
    subgraph Team ["Team Structure"]
        direction TB

        PO["1 Product Owner"]
        ARCH["1 Architect"]
        DEV1["1 Developer"]
        CUST["Customer"]
        DEV2["1 Developer"]

        MEET["Meeting"] --> L1(("LLM"))
        L1 --> NEED["Business need"]
        NEED --> L2(("LLM"))
        L2 --> PLAN["Plan"]
        PLAN --> L3(("LLM"))
        L3 --> CODE["Code"]
        CODE -.->|iterate| L3
        CODE --> L4(("LLM"))
        L4 --> TESTS["Tests"]
        TESTS --> L5(("LLM"))
        L5 --> RELEASE["Release"]

        FORGE["Forge"] --> L2
        CTX["Instructions, skills..."] --> L3
        DC["Deterministic controls..."] --> L4

        PO --> MEET
        ARCH --> PLAN
        DEV1 --> L3
        CUST --> CODE
        DEV2 --> TESTS
    end

    classDef people fill:#8fce6a,stroke:#5a9c3a,color:#1a3d0a,stroke-width:1.5px;
    classDef ai fill:#ffcc4d,stroke:#d99a00,color:#3d2e00,stroke-width:1.5px;
    classDef task fill:#cfe8fb,stroke:#7fb3d9,color:#0a3050,stroke-width:1.5px;
    classDef context fill:#f5a623,stroke:#c9791a,color:#3d2400,stroke-width:1.5px;

    class PO,ARCH,DEV1,CUST,DEV2 people;
    class L1,L2,L3,L4,L5 ai;
    class MEET,NEED,PLAN,CODE,TESTS,RELEASE task;
    class FORGE,CTX,DC context;
```

| Legend | Meaning |
|---|---|
| 🟩 People | The single accountable human at each checkpoint — never a group meeting |
| 🟨 AI | The LLM step that turns the previous artifact into the next one |
| 🟦 Task | The artifact produced: business need, plan, code, tests, release |
| 🟧 Persistent context | Committed knowledge (Forge, instructions, skills, deterministic controls) fed to the LLM |

This is the [Build loop](./guide/layer-build) and [Proof](./guide/layer-proof) gate of Flow Stack in
practice: a kickoff replaces the status meeting, the [Context Layer](./guide/context-layer) replaces
repeated verbal instructions, and [deterministic controls](./guide/guardrails) replace "trust me, it
works" before release.
