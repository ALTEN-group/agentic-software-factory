# 🧰 Tooling

In The Agentic Software Factory, tooling cannot be a collection of disconnected SaaS products. Tool sprawl is
the primary cause of **AI context fragmentation**: when business requirements live in Jira, meeting
notes in Confluence, discussions in Slack, code in Git, pipelines in Jenkins, and releases in an external
portal, the AI agent's context is broken across authentication silos, sync lags, and incompatible APIs.

> **To maximize AI capability, minimize tooling sprawl.** Consolidate the entire lifecycle into a
> **single platform**, such as the **GitHub or GitLab ecosystem**, where business needs, backlog issues, code, deterministic verification, pipelines, and releases share one unbroken context graph.

## Why a single platform matters for AI

1. **Zero context loss from meeting to release**: An AI agent can read the original client meeting
   notes in an issue, trace the Plan acceptance criteria, inspect the repository Persistent Context, generate the code in a pull request, read CI failure logs, and publish the release without leaving the platform.
2. **Native bidirectional links**: Every PR is natively linked to its Issue, branch, commit, check run,
   preview environment, and release tag. No third-party integrations or fragile webhook syncs required.
3. **Unified permission and security boundary**: The model, agent runner, and CI pipeline operate under
   one consistent role-based access control (RBAC) and audit log.
4. **Token and latency optimization**: AI agents fetch rich, structured context via native platform APIs
   in milliseconds instead of navigating several external tool APIs.

## The unified Git stack

The Agentic Software Factory runs on one Git platform from end to end, such as GitHub or GitLab. Issues, branches, pull requests, pipelines, environments, and releases live together, so the AI agent follows one unbroken chain from the client meeting to the release without leaving the platform.

## Eliminating tool sprawl

Every external tool introduced into the software factory imposes a **context penalty**:
- If a tool does not natively integrate into the agent's context graph, it creates an information black hole.
- Any proposal to adopt an external SaaS tool outside the core platform requires a decision record proving that the capability cannot be met natively and detailing how AI context will be preserved without loss.
