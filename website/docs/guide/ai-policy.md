# AI Usage Policy

AI is treated as a production capability: owned, versioned, budgeted, audited. This page is the
policy squads work under. It is owned by the AI enablement lead and reviewed with security and legal
each quarter.

## Sanctioned usage

| Usage | Status |
|---|---|
| Code, test, and documentation generation in sanctioned tools | Allowed |
| Summarization and clustering of internal, non-sensitive content | Allowed |
| Analysis of production logs and traces through approved tooling | Allowed with redaction |
| Autonomous agents acting on a repository behind a pull request | Allowed, human merge required |
| Autonomous agents acting directly on production | Prohibited |
| Pasting customer data, secrets, or credentials into any prompt | Prohibited |
| Personal accounts or unsanctioned tools for company work | Prohibited |

## Data classification

| Class | Examples | May be sent to a model |
|---|---|---|
| **Public** | Open-source code, published docs | Yes |
| **Internal** | Private source code, internal docs, tickets | Yes, in sanctioned tooling only |
| **Confidential** | Contracts, financials, security findings | Only in approved enterprise tenancy |
| **Restricted** | Customer PII, credentials, secrets, payment data | Never |

Redaction is a platform capability, not a personal discipline: log and trace tooling strips
restricted fields before any AI analysis path can read them.

## Tooling

Only tools on the sanctioned list may be used with Internal or Confidential data. Sanctioning
requires: enterprise tenancy, no training on submitted data, audit logging, SSO, and a signed data
processing agreement.

## Attribution and licensing

- Generated code is reviewed for license contamination by the dependency scanner.
- Suggestions matching public code above the configured threshold are blocked by the tool.
- Third-party content pasted into a prompt must be content the company is licensed to use.

## Human accountability

The following always resolve to a named person:

- final acceptance of any merged change,
- any customer-facing commitment,
- any security-sensitive change,
- any change to models, prompts, or agents affecting trust or compliance,
- the resolution of any incident.

## Auditability

| What | Retained | Where |
|---|---|---|
| Agent actions on repositories and infrastructure | 12 months | Platform audit log |
| Model, prompt, and agent versions used in CI | 12 months | Build metadata |
| Evaluation reports for adopted changes | Indefinitely | Repository |
| Cost per squad and per workflow | 24 months | Cost dashboard |

## Cost

Model spend is attributed per squad and reviewed monthly. A workflow whose cost exceeds the value it
creates is redesigned or retired — cheaper models, tighter context, or no AI at all.

## Violations

A policy violation is handled as an incident, not as a disciplinary matter first: contain, assess
exposure, notify if required, then fix the path that allowed it. A policy that can only be respected
through vigilance is a [Guardrails](./guardrails) defect.
