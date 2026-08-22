# Learning OS Architecture v4.0

## Product principle
The surface should stay quiet. The underground system should become richer over time.

Learning OS is not a study timer and not a learner-ranking system. It is a durable record of how knowledge, questions, distinctions, connections, interpretations, cognitive friction, strategies, and thoughts develop through time.

The system should help the learner become better at noticing learning itself without turning learning into constant self-monitoring.

## Intellectual foundations translated into system behavior
- Bennett: TIME — where did a finite part of life become learning?
- Todd: HOW — what learning processes actually occur and become useful?
- Toyama: BECOMING — ideas may incubate, disappear, reappear, and change.
- Kurashita: EXTERNAL MIND — small records, thoughts, unfinished ideas and links become tools for thinking.
- Langer: MINDFUL DISTINCTION — notice difference, context and alternative views; resist premature closure.
- Grinder: LANGUAGE / MODELING — recover useful structure from vague language, calibrate to evidence, preserve context and choice.
- Bandler: TRANSFORMATION — what changed between A and B, and which differences may have mattered?
- Arden: PLASTICITY — understanding is not the endpoint; observe movement from effortful processing toward contextual ease across repeated use.
- Jantzen: MULTIPLE ROUTES — do not build around a fictional standard learner; representation mismatch can create friction.
- Gathercole & Alloway: WORKING MEMORY — complex learning can fail because too much must be held and processed at once. Externalize unnecessary holding demands.
- Brown: EXECUTIVE FUNCTION — activation, focus, effort, emotion, memory and action are context-sensitive parts of learning, not moral judgments about motivation.
- Amen: EMBODIED CONTEXT — retain only the broad systems insight that learning occurs in a body and context. Optional state information may help pattern discovery; do not perform brain typing or medical inference.

Detailed implementation principles live in `docs/COGNITIVE_LEARNING_ENGINE.md` and `docs/NLP_INSPIRED_DESIGN.md`.

## Core stance: no frictionless learner
Do not divide users into `normal` and `special-needs` learning paths. Human cognition varies across people, tasks, representations, contexts and time.

Difficulty is evidence to investigate, not a verdict about the learner.

Never persist fixed identity labels such as `visual learner`, `poor memory`, `unmotivated`, `bad at languages`, or diagnostic guesses.

## Underground durable model
The durable core is split into stores that are independent of the current UI:

1. `nodes`
   - Arbitrary-depth learning hierarchy.
   - Example: English > Pronunciation > v/f > voiced/unvoiced contrast.
   - Area / Thread / Topic are views, not database depth limits.

2. `sessions`
   - Containers for periods of deliberate learning.
   - Start/end timestamps, node context, content, position and duration.
   - Future optional context fields are additive.

3. `records`
   - Append-first Atomic Learning Records.
   - Each record owns a full ISO timestamp.
   - Existing types include session_start, session_end, gotit, question, surprise, distinction, revisit, thought, reflection and connection.
   - Future types may include observation, specification, reframe, representation_shift, friction, workspace_snapshot, ease, revision and context_shift.
   - Older thinking is not overwritten because current thinking changed.

4. `relations`
   - Typed links between nodes or records.
   - A relation may include `why`, because the reason for a connection is part of the learner's thinking.
   - Types may include related, similar_to, contrasts_with, prerequisite_for, example_of, exception_to, reframes, evidence_for and applies_in_context.

5. `derived` (future)
   - Rebuildable/versioned hypotheses generated from durable evidence: patterns, transition candidates, incubation chains, effort-to-ease traces, cognitive-friction hypotheses.
   - Derived data must never replace source records.

## External Working Memory
Long-form reading and complex problem solving need a resumable mental workspace. Future workspace snapshots can preserve:
- current claim/problem
- concepts currently being held
- prerequisites/references
- unresolved questions
- current hypothesis
- connections
- source position
- next return point

The goal is to restore *mental context*, not merely a page number.

## Cognitive Friction
When learning stalls, the system should consider multiple contextual explanations before personal deficit. Candidate friction categories may include conceptual, representation, working-memory, retrieval, attention-shift, activation, effort, emotional, environmental and unknown.

`unknown` is a valid and important state.

## Representation and transformation
The same learning node may be encountered through text, audio, diagram, comparison, example, action/self-production or whole context.

The engine should preserve sequences around meaningful change, for example:
`question -> comparison -> distinction -> own example -> gotit`

Repeated sequences can become tentative patterns, never permanent learner types.

## Context and state
Optional context metadata may be attached to records or sessions, but these are temporary states, not identity labels. Self-reported fatigue, sleepiness, calmness or tension may be useful context. Do not infer diagnosis, disease, brain-region activity or medical treatment.

## Views derived from the same evidence
- Learning Map — what am I learning?
- Timeline — what happened at a particular point in time?
- Thoughts & Connections — how is my external mind developing?
- Where your time went — what did a selected period of life become?
- Alternative Views / Revision History — how has interpretation changed?
- Resume Mental Context — what was I holding when I stopped?
- How you changed — what has become more precise, connected, flexible or easier over time?

These are projections of the durable core, not separate canonical databases.

## Upgrade and data-survival rules
1. Never make a UI representation the canonical data model.
2. Durable IDs, timestamps and original source records survive UI redesigns.
3. New cognitive features are additive whenever possible.
4. A later interpretation/reframe/revision never destroys the original record.
5. Derived analyses are versioned and rebuildable.
6. Unknown fields must survive export/import.
7. Migrations are explicit and recorded in metadata.
8. Before a destructive schema change, preserve a raw snapshot.
9. Backward compatibility is a product feature, not cleanup work.
10. Frequent upgrades should enrich old data rather than invalidate it.
