# Overview

Agentic Software Factory is an **operating model**: the way a software organization actually works to deliver,
support, and improve software. It defines how people, processes, tools, decisions, and
responsibilities fit together.

It is not an architecture, not a methodology certificate, and not a tool. It is the organizational
and process architecture behind building and running software — rebuilt for a world where **AI is
leveraged at maximum capability across the entire lifecycle, from the client meeting to release**.

> **Agentic Software Factory is the modern operating model that connects client dialogue, autonomous AI execution,
> deterministic verification, and continuous delivery into one continuous system.**

## The core pillars of the model

Agentic Software Factory is built around four fundamental shifts:

1. **Meeting-Driven Development**: Software development begins directly in the client or stakeholder
   meeting. AI captures, transcribes, and extracts business intent into structured specifications,
   eliminating the telephone game of manual ticket writing and backlog grooming.
2. **Zero Developer Coding**: Developers **do not write code syntax anymore**. Engineers operate as
   **Specification Engineers**, **Context Architects**, and **Deterministic Control Builders**,
   while AI agents autonomously generate 100% of code, tests, and documentation.
3. **Dense Deterministic Controls for AI Auto-Validation**: Rather than relying on fuzzy prompts or
   superficial AI self-review, the platform establishes dense, binary, non-probabilistic controls:
   compilers, strict type systems, AST linters, contract verifications, mutation testing, and
   security scanners. AI agents execute against these controls in closed self-healing loops until
   every gate passes.
4. **Minimum Human Validation**: Manual line-by-line code review of generated code is an obsolete
   bottleneck. Once deterministic controls auto-validate 100% of the implementation, humans perform
   targeted validation strictly on business intent, user experience, and risk invariants.

## Why the name

- **Agentic** — autonomous AI agents driving implementation, testing, and self-healing in closed loops.
- **Software Factory** — an industrialized, repeatable system where software moves predictably from client intent to verified production release through layered gates.

## The shape of the model

Agentic Software Factory is made of **seven layers** crossed by **three pillars**.

```mermaid
---
caption: Agentic Software Factory layers and pillars
---

flowchart TB
  subgraph pillars[Pillars - cross every layer]
    people[People - Specification Engineers & Outcome Owners]
    governance[Governance - Minimum Human Validation & Guardrails]
    context[Context - Context Layer & Deterministic Controls]
  end
  l1[L1 Signal - Meeting-Driven Demand] --> l2[L2 Intent - Executable Specifications] --> l3[L3 Build - Autonomous AI Generation] --> l4[L4 Proof - Deterministic Auto-Validation] --> l5[L5 Release - Progressive Rollout] --> l6[L6 Learn - Outcome Feedback]
  l6 -. feedback to client signals .-> l1
  l0[L0 Foundation - Rails & Tooling] --- l1
  l0 --- l3
  l0 --- l5
```

| Layer | Name | Question it answers |
|---|---|---|
| L0 | [Foundation](./layer-foundation) | What does every squad get for free? |
| L1 | [Signal](./layer-signal) | What did the client ask for, and what is worth doing? |
| L2 | [Intent](./layer-intent) | What exactly are we building, and what are the deterministic acceptance criteria? |
| L3 | [Build](./layer-build) | How do AI agents autonomously generate the implementation? |
| L4 | [Proof](./layer-proof) | How do deterministic controls auto-validate the change, and where is minimum human validation applied? |
| L5 | [Release](./layer-release) | How does it reach users progressively without risk? |
| L6 | [Learn](./layer-learn) | What did reality say, and how does it refine client intent and the Context Layer? |

| Pillar | Owns | Reference |
|---|---|---|
| People | Squad shape, specification engineering, minimum human sign-off | [Squads](./squads) |
| Governance | Decision rights, AI policy, blast-radius risk gates | [Decision Rights](./decision-rights) |
| Context | Instructions, skills, agents, specs, deterministic testbeds | [Context Layer](./context-layer) |

## What is different from a classic software organization

A classic organization relies on manual coding, tribal knowledge, and labor-intensive reviews.
Agentic Software Factory reorganizes every role around maximum AI capability:

| Classic organization | Agentic Software Factory |
|---|---|
| Developers write syntax manually in an IDE | Developers **do not code**; AI generates 100% of code, tests, and docs |
| Engineers spend hours on line-by-line PR reviews | Dense **deterministic controls auto-validate**; humans do **minimum validation** on intent |
| Requirements lost in manual tickets and hand-offs | **Meeting-Driven Development**: AI transcribes and structures client meetings into formal Intent |
| Knowledge lives in heads, chats, and outdated wikis | Knowledge lives in the committed [Context Layer](./context-layer) (instructions, skills, specs) |
| AI used ad hoc as an autocomplete assistant | Autonomous AI agents operate with closed-loop self-healing under platform guardrails |
| Velocity measured in story points and PR volume | Flow measured in meeting-to-release lead time, deterministic pass rates, and customer outcomes |

## The core constraint

When code generation becomes autonomous and cheap, the bottleneck moves. It is never *writing* code;
it is **capturing true client intent, and proving deterministically that what was generated satisfies it**.

Agentic Software Factory therefore invests heavily in:
- **L1 / L2 (Meeting-Driven Intent)**: Capturing client needs directly through AI synthesis and transforming them into unambiguous, testable specifications.
- **L4 (Deterministic Proof)**: Building dense, ungameable deterministic harnesses that auto-validate AI generation in closed self-healing loops before asking for minimum human sign-off.

```
Client Meeting  →  Signal  →  Intent  →  Build (AI)  →  Proof (Auto-Val)  →  Release  →  Learn
      |             ^^^^^^    ^^^^^^                        ^^^^^                         |
      +----------> Human Intent Validation            Minimum Human Sign-off              |
                                                               |                          |
                                                               +--------------------------+
```

## Where to go next

- New to the model: read [Principles](./principles), then walk L1 → L6.
- Adopting it in an existing organization: start with the [Adoption Roadmap](./adoption).
- Looking for definitions: see the [Glossary](./glossary).
