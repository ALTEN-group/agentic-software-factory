# 🧠 Persistent Context

Persistent Context is the organization's knowledge in a form an AI can consume. It is the
highest-leverage investment in The Agentic Software Factory.

## Why

An AI model has no memory of your codebase, your conventions, or your decisions. Every session starts
from zero. Without Persistent Context, each Developer re-explains the same things forever.

In an operating model where **developers do not code** and **AI writes 100% of the implementation**,
Persistent Context is the primary "code" of the organization.

## Primitives

Persistent Context is built from four kinds of file: **instructions** (standing rules), **prompts** (reusable tasks),
**skills** (multi-step workflows), and **agents** (specialists). How each one is loaded, which to use when, and how to
write them is explained in coding-pal's [Persistent Context architecture](https://alten-group.github.io/coding-pal/guide/persistent-context).
coding-pal also publishes catalogs of
[instructions](https://alten-group.github.io/coding-pal/guide/catalog-instructions),
[prompts](https://alten-group.github.io/coding-pal/guide/catalog-prompts),
[skills](https://alten-group.github.io/coding-pal/guide/catalog-skills), and
[agents](https://alten-group.github.io/coding-pal/guide/catalog-agents).

## Persistent Context across the stages

Persistent Context supports **[0 — Meet](./stage-meet)** through **[5 — Prove](./stage-prove)**.
[7 — Learn](./stage-learn) enriches Persistent Context in return:

| Stage | What Persistent Context does there |
|---|---|
| **0 — Meet** | Supplies the domain glossary, specifications, and meeting agent instructions and prompts, and receives new client terminology back |
| **1 — Triage** | Grounds the mapping of needs to existing capabilities and domain glossaries |
| **2 — Think** | Supplies architectural invariants, decision records, and domain boundaries that bound the options |
| **3 — Plan** | Informs constraints and non-functional invariants carried into the plan |
| **4 — Code** | Guides AI agents with repository conventions, type rules, and execution skills |
| **5 — Prove** | Constrains agent auto-remediation loops so automated patches comply with decision records and contracts |
| **7 — Learn** | Receives new instructions, prompts, skills, agents, and decision records from production evidence |

## Who owns it

The Architect owns Persistent Context, with every team contributing changes through pull requests.

## Where it lives

Persistent Context lives in two places, depending on how widely it applies.

| | Project-specific | Shared (global and generic) |
|---|---|---|
| **What** | What only this application needs: its own instructions, specifications, and decision records | What every project needs: coding standards, test conventions, and generic agents, skills, and prompts |
| **Where** | In the application repository, next to the code it describes | In a dedicated repository, such as [coding-pal](https://alten-group.github.io/coding-pal/) |
| **How it reaches a project** | It is already there, and is reviewed like the code it describes | It is installed into each project with a package manager (coding-pal uses [APM](https://alten-group.github.io/coding-pal/guide/apm-distribution)), so one change reaches every project |

Both are committed, reviewed through pull requests, and versioned.

## Rules

1. **Committed, reviewed, versioned.** A context artifact changes through a pull request.
2. **Evidence-driven.** New artifacts come from [7 — Learn](./stage-learn): something was corrected
   twice, or re-explained twice.
3. **Small and specific.** Instructions that try to cover everything get ignored by models and
   humans alike.
4. **Scoped precisely.** Instructions declare the narrowest matching pattern that works; broad
   patterns waste context on every request.
5. **Deleted when wrong.** An outdated instruction is worse than none: it produces confident,
   consistent, wrong output.
6. **Never contains secrets.** Context artifacts are read by tools and shared across sessions.

## Health signals

| Signal | Healthy | Unhealthy |
|---|---|---|
| Fix-loop iterations needed | Trending down (1–2 loops) | Flat or above 3 loops |
| Manual human corrections during validation | Near zero | Frequent |
| Instruction count | Stable, each one used | Growing without pruning |
| First-pass green rate in Code | > 80% | < 50% |
| Generated output matching codebase conventions | High | Requires rewriting |
