# L0 — Foundation

The layer squads never have to build. Foundation is everything a squad receives on day one so that
it can spend its attention on the outcome it owns.

## Purpose

Remove undifferentiated work from squads and make the safe path the default path.

| Input | Output | Owner |
|---|---|---|
| Platform roadmap, squad friction reports, incident findings | Environments, pipelines, secure defaults, shared services, AI infrastructure | Platform / Enablement |

## What Foundation provides

### Environments

| Environment | Purpose | Provisioned by |
|---|---|---|
| `local` | Full stack on a laptop via Compose | Template repository |
| `preview` | Ephemeral per-pull-request deployment | CI |
| `staging` | Production-shaped, seeded data | Platform |
| `production` | Customer traffic | Platform |

An environment that cannot be created from source in one command is a Foundation defect.

### Delivery pipeline

Every repository gets the same pipeline skeleton:

```
commit
  ↓
[lint + format]        - style is never a review topic
  ↓
[type check]           - contracts hold
  ↓
[unit tests]           - logic holds
  ↓
[integration tests]    - the pieces fit
  ↓
[security scan]        - dependencies, secrets, SAST
  ↓
[AI review pass]       - risk, missing tests, smells
  ↓
[preview deploy]       - reviewable artifact
```

### Secure defaults

- Secrets from a managed store, never from a file in a repository.
- Non-root containers with host-matched `UID`/`GID`.
- Dependency and image scanning on every build.
- Least-privilege database grants per schema.

### Shared services

Authentication, authorization, notification, storage, and observability are consumed, not rebuilt.
A squad that needs a variant raises it with the owning enablement function.

### AI infrastructure

Foundation also owns the plumbing of the AI operating layer:

- model access, quotas, and cost attribution per squad;
- the repository template that ships the [Context Layer](./context-layer);
- the [evaluation](./evaluation) harness used to qualify model and prompt changes;
- audit logging of agent actions on protected resources.

## Exit gate

A capability is part of Foundation only when it is:

1. self-service (no ticket to a human),
2. documented in a runbook,
3. covered by an alert or a health check,
4. reproducible from source.

Anything failing one of these four is still a project, not a foundation.

## Anti-pattern

A Foundation team that becomes an approval queue. Foundation ships *capabilities*, not permissions.
