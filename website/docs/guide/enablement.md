# Enablement

Enablement functions exist to make squads faster. They are not departments, not approval boards, and
not owners of squad outcomes.

## The rule

> An enablement function ships **capabilities**, never **permissions**.

If a squad has to ask an enablement function for permission to proceed on routine work, the function
has drifted into governance and must be corrected.

## Functions

| Function | Ships | Does not do |
|---|---|---|
| Platform / DevOps | Environments, pipelines, deployment rails, observability | Deploy on behalf of squads |
| Security / compliance | Secure defaults, scanners, policy-as-code, threat models | Manual sign-off on routine changes |
| Data / ML enablement | Analytics pipelines, experiment framework, model access | Own squad metrics |
| AI enablement | Context layer standards, agents, evaluation harness, cost controls | Write squad code |

## Operating rules

1. **Self-service or it does not exist.** A capability that requires a human in the loop is
   unfinished.
2. **Adoption is the metric.** Enablement is measured by squad adoption and by friction removed, not
   by delivery of internal projects.
3. **Embed, do not intake.** When a squad struggles, an enablement engineer joins the squad for a
   sprint. Tickets are the fallback, not the interface.
4. **Deprecate loudly.** Every replaced capability has a migration path and a removal date.

## The paved road

Enablement publishes one recommended path per problem: one way to create a service, one way to add a
database, one way to deploy, one way to add AI to a workflow.

| Squads on the paved road | Squads off the paved road |
|---|---|
| Get automatic upgrades, support, and guardrails | Own their choice, its maintenance, and its risk review |

Leaving the paved road is allowed and recorded in an ADR. It is never silently tolerated.

## Escalation to governance

Enablement escalates when a squad's choice creates risk beyond that squad: a security exposure, a
compliance breach, an irreversible data decision, or a cost trajectory that threatens the budget.
Those escalations follow [Decision Rights](./decision-rights).
