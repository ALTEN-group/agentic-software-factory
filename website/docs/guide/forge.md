# 📦 Forge

Reusable code: functions, libraries, and services. The Forge is the organization's catalog of certified building blocks,
so that AI agents compose what already exists instead of generating the same logic again for every work item.

Left unguided, agents regenerate boilerplate, utility functions, and unverified infrastructure code from scratch. That
introduces drift, security gaps, and maintenance debt. The Forge removes the need to do so.

## What the Forge contains

| Tier | Examples | Why it exists |
|---|---|---|
| **Shared services** | Authentication, identity, billing, audit logging, notification dispatch, document storage | Production-hardened services are called, never rebuilt |
| **Reusable code** | Libraries, shared client SDKs, validated domain logic, cryptographic utilities, telemetry wrappers | Agents import pre-tested packages that already meet enterprise standards |
| **In-context templates** | Project skeletons, scaffolding, and canonical design patterns (for example frameworks such as **Gatelin** or **foxnox**) injected into agent context | Agents follow the reference architecture from the first line |
| **Interface contracts** | Versioned OpenAPI, gRPC, and AsyncAPI specifications | Cross-service compatibility is fixed before generation starts |

## Where the Forge is used

The Forge feeds three stages of the [operating model](./overview).

| Stage | What happens with the Forge |
|---|---|
| [2 — Think](./stage-think) | The agent searches the catalog semantically and proposes reuse options. The chosen assets are recorded as **Forge asset bindings** in the Think record |
| [3 — Plan](./stage-plan) | The bindings are carried into the Plan record and locked, with their interface contracts, so the implementation breakdown composes them |
| [4 — Code](./stage-code) | The agent imports the bound packages and calls the bound services instead of writing bespoke logic |

## Rules

- **Compose before you build.** A custom implementation of something the Forge already offers needs a recorded reason in the Think record.
- **One fix, every consumer.** Security patches, performance work, and dependency updates made in a Forge module reach all consuming squads automatically.
- **Certified before listed.** An asset enters the catalog only with an owner, a versioned interface, tests, and documentation.
- **Deprecate explicitly.** A retired asset carries a replacement and a removal date, so agents never bind to something that is going away.

## Where it lives

Versioned in enterprise package registries, service catalogs, and in-context template repositories. It is distinct from
[Persistent Context](./persistent-context), which holds the rules and knowledge agents follow, while the Forge holds the code
they reuse.

## Health signals

| Signal | Healthy | Warning |
|---|---|---|
| Share of work items that bind at least one Forge asset | Rising | Flat or falling |
| Duplicate logic generated that a Forge asset already covers | Near zero | Recurring |
| Assets without an owner or with a stale version | None | Any |
