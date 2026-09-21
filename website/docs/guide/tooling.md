# Tooling

Flow Stack does not mandate vendors. It mandates that each function below has exactly one sanctioned
tool, integrated with the others, owned by a named role.

## Tool map

| Function | Requirement | Owner |
|---|---|---|
| Source control | Protected branches, code owners, required checks | Platform |
| CI/CD | Reproducible builds, immutable artifacts, progressive deploy | Platform |
| Work tracking | One item per intent record, linked to pull requests | Product lead |
| AI coding assistant | Enterprise tenancy, repository context, agent mode | AI enablement |
| Model gateway | Routing, quotas, cost attribution, audit logging | AI enablement |
| Evaluation harness | Deterministic scoring of prompt/model/agent changes | AI enablement |
| Observability | Metrics, logs, traces, correlated with deploys | Platform |
| Incident management | Paging, timeline, postmortem template | Platform |
| Feature flags | Runtime toggles, percentage rollout, audit trail | Platform |
| Experimentation | Assignment, exposure logging, statistical readout | Data enablement |
| Security scanning | SAST, dependencies, secrets, images | Security |
| Documentation | Versioned with the code, published automatically | Squad |

## Integration rules

Tools are only useful when they are connected. The mandatory links:

```
intent record  ←→  branch / pull request  ←→  build artifact  ←→  deployment  ←→  telemetry
```

Given a production metric anomaly, an engineer must be able to reach the intent record that caused
it in under a minute, through links, not through memory.

## Model selection

The gateway routes each workload to the cheapest model that clears its quality bar.

| Workload | Typical tier |
|---|---|
| Summarization, clustering, classification | Small / fast |
| Code generation within known patterns | Mid |
| Architecture reasoning, incident diagnosis, cross-file refactors | Large / reasoning |
| Bulk, deterministic transformations | Smallest that passes evaluation |

Model choice is a measured decision, revisited monthly against [Evaluation](./evaluation) results
and cost, never a preference.

## Context hygiene in tools

- Scope assistants to the smallest relevant part of the repository.
- Prefer committed context artifacts over ad hoc pasted context.
- Start a new session per work item; stale sessions carry stale assumptions.
- Pin model, prompt, and agent versions in CI so that builds are reproducible.

## Tool sprawl

Adding a second tool for an existing function requires an ADR and a removal date for one of them.
Two tools for one function means two sources of truth, and a context layer that has to describe
both.
