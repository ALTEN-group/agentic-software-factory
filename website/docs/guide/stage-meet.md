---
pageClass: page-stage-orange
---

# 🎙️ 0 — Meet

<div class="stage-hero-banner banner-orange">
  <span class="stage-hero-badge">STAGE 0</span>
  <span class="stage-hero-desc">Client dialogue &amp; discovery</span>
</div>

Where demand originates and ground truth is captured. Agentic Software Factory is **Meeting-Driven** : raw client conversations, stakeholder interviews, and discovery workshops are
captured as traceable inputs that establish clear intent for the entire software factory. Stage 0 preserves source and context, establishing what matters and why.

## Purpose

Eliminate requirements decay and the traditional "telephone game" by capturing authentic client intent directly at the source.

| Input | Output | Owner |
|---|---|---|
| Client dialogue, stakeholder discovery sessions, voice and video calls, incident debriefs | Transcripts, semantic meeting synthesis, highlighted domain quotes, and customer intent anchors | Client + Product Owner |

## What is lost without it

In traditional delivery, a client's words pass through several people before an engineer sees them, and each hand-off keeps
less.

| | Traditional ticket | Meeting-Driven backlog issue |
|---|---|---|
| **What the client said** | "Our regional managers spend 45 minutes every morning cross-referencing CSV exports from SAP with local inventory sheets before trucks can roll." | The same sentence, quoted verbatim, with a link to the exact moment in the transcript |
| **What the engineer receives** | "Improve inventory export" | A named problem, who is blocked, and what it costs them |
| **What is gone** | The 45 minutes, the SAP source, the trucks waiting, the people affected | Nothing |
| **How it can be checked later** | It cannot. The only record is someone's summary | Every later stage can be checked against the original words |

AI agents cannot infer the unstated nuances of a client's business. If those nuances are lost before the work reaches them,
no amount of testing brings them back. Capturing the dialogue at the source keeps next stages anchored to what the client actually said.

## Core capabilities

### 1. Transcription & speaker attribution
AI ingest client meetings (discovery calls, sprint reviews, steering committees) and generate timestamped transcripts in which every statement is attributed to a speaker (speaker diarization).

### 2. Verbatim intent anchoring
Rather than summarizing conversations into generic bullet points, the meeting pipeline extracts verbatim quotes and anchors them to domain concepts. When a need moves through [1 — Triage](./stage-triage) to [3 — Plan](./stage-plan), the Plan record cites the exact client quote justifying the change:

> *"Our regional managers spend 45 minutes every morning cross-referencing CSV exports from SAP with local inventory sheets before trucks can roll."*
> — Operations Director, Meeting Transcript (2026-09-24, 00:14:32)

## Persistent Context in Meet

[Persistent Context](./persistent-context) gives the meeting agent its instructions and the domain glossary, so terms are
transcribed correctly and every Meeting Pack has the same structure. New client terms flow back into it.

## The Meeting Pack artifact

At the conclusion of each meeting, the intelligence pipeline produces an immutable **Meeting Pack**:

1. **Full transcript**: Verbatim text indexed by timestamp and speaker.
2. **Executive synthesis**: 1-page summary of business drivers, urgency, and core challenges discussed.
3. **Domain concepts & terminology**: New terms or acronyms introduced by the client, staged for commit to [Persistent Context](./persistent-context).
4. **Candidate business needs**: Needs ready for ranking and logging as backlog issues in **[1 — Triage](./stage-triage)**.

## Where AI is used

AI captures and structures the dialogue; the product owner steers the conversation and the client confirms what was said.

| Task | AI role | Human role |
|---|---|---|
| **Transcription** | Convert the audio or video stream to a timestamped, speaker-attributed transcript | Verify speaker accuracy |
| **Quote anchoring** | Extract verbatim quotes and link them to domain concepts | Confirm the quotes reflect the client's meaning |
| **Meeting Pack synthesis** | Produce the executive synthesis, new terminology, and candidate business needs, using the glossary and instructions in Persistent Context | Confirm the problem statements with the client |

## Exit gate

A meeting successfully closes when:

1. The meeting transcript has been captured, verified for speaker accuracy, and committed to the repository substrate.
2. The client has confirmed that the synthesized problem statements accurately reflect their business pain.
3. Candidate business needs have been emitted to the backlog for ranking in **[1 — Triage](./stage-triage)**.
