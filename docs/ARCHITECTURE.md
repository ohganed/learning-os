# Learning OS Architecture v5.0

## Product principle
The surface stays quiet. The underground becomes richer.

Learning OS is not a study timer, a motivation scorer, a diagnosis engine, or a learner-ranking system. It is a durable record of how knowledge, questions, distinctions, connections, interpretations, cognitive friction, representations, strategies, effort, ease, and thoughts develop through time.

The system should help the learner become better at learning without forcing constant self-monitoring.

## Intellectual foundations translated into system behavior
- Bennett: TIME — where did a finite part of life become learning?
- Todd: HOW — what learning processes actually occur and become useful?
- Toyama: BECOMING — ideas may incubate, disappear, reappear, and change.
- Kurashita: EXTERNAL MIND — small records, unfinished ideas and links become tools for thinking.
- Langer: MINDFUL DISTINCTION — notice differences, context and alternatives; resist premature closure.
- Grinder: LANGUAGE / MODELING — recover useful experiential structure from vague language, calibrate to evidence, preserve context and choice.
- Bandler: TRANSFORMATION — what changed between A and B, and which differences may have mattered?
- Arden: PLASTICITY — understanding is not the endpoint; observe movement from effortful processing toward contextual ease.
- Jantzen: MULTIPLE ROUTES — do not build around a fictional standard learner; representation mismatch can create friction.
- Gathercole & Alloway: WORKING MEMORY — complex learning can fail because too much must be held and processed at once. Externalize unnecessary holding demands.
- Brown: EXECUTIVE FUNCTION — activation, focus, effort, emotion, memory and action are context-sensitive parts of learning, not moral judgments.
- Amen: EMBODIED CONTEXT — learning occurs in a body and context; optional state data can support pattern discovery, without brain typing or medical inference.
- Pecher / Zwaan and grounded cognition: GROUNDING — concepts can be linked to situations, perception, spatial structure, action and contrast while preserving movement back to abstraction.

## Core stance: no frictionless learner
Do not divide users into `normal` and `special-needs` learning paths. Human cognition varies across people, tasks, representations, contexts and time.

Difficulty is evidence to investigate, not a verdict about the learner.

Never persist fixed identity labels such as `visual learner`, `poor memory`, `unmotivated`, `bad at languages`, or diagnostic guesses.

## Durable Core
The canonical learning history remains independent of the current UI and independent of any current cognitive theory.

1. `nodes`
   - Arbitrary-depth learning hierarchy.
   - Area / Thread / Topic are views, not hard database limits.

2. `sessions`
   - Containers for deliberate learning periods.
   - Full timestamps, node context, content, source position and duration.

3. `records`
   - Append-first Atomic Learning Records.
   - Each record owns a full ISO timestamp.
   - Examples: session_start, session_end, gotit, question, surprise, distinction, revisit, thought, reflection, connection, workspace_snapshot, grounding, learning_state.
   - Older thinking is not overwritten because current thinking changed.

4. `relations`
   - Typed links between nodes or records.
   - The reason for a relation may be stored because `why` is part of the learner's thinking.

## Cognitive Extensions
Cognitive models live beside, not inside, the Durable Core.

### Cognitive v4 extension
Stores:
- workspace snapshots
- annotations
- low-confidence hypotheses
- grounding routes
- model versions

### Cognitive v5 growth extension
Stores:
- optional effort/ease state marks
- process notes
- versioned candidate patterns
- model versions

Extensions may be replaced in the future without rewriting historical Core evidence.

## External Working Memory
Long-form reading and complex problem solving require resumable mental context. A workspace snapshot may preserve:
- current claim/problem
- concepts currently being held
- unresolved questions
- source position
- next return point
- optional friction markers
- optional grounding routes

The goal is to restore *mental context*, not merely a page number.

## Grounding Engine
A concept may have optional routes into:
- concrete situation / example
- visual or spatial representation
- action, manipulation, experiment or production
- comparison, contrast or exception

Grounding is not a replacement for abstraction. The desired capability is:

`abstract <-> concrete`

Repeated questions without a grounding route may generate a low-confidence `grounding_candidate`. This is a prompt to try another representation, never a learner-type judgment.

## Cognitive Friction Engine
When learning stalls, possible friction categories include conceptual, representation, working-memory, retrieval, attention shift, activation, effort, emotional, environmental, contextual and unknown.

`unknown` is a first-class state.

The engine stores evidence and tentative hypotheses separately.

## Language Precision Engine
Broad self-statements such as `I always forget this`, `I am bad at physics`, or `I cannot understand this` remain preserved verbatim.

The engine may surface one quiet specification prompt such as:
- Which part, specifically?
- Always, or in particular situations?
- What happens when you try?

Specification creates new evidence; it does not overwrite the original statement.

## Transformation Trace Engine
For each session, meaningful sequences can be reconstructed from Atomic Records.

Example:
`question -> grounding -> distinction -> own example -> gotit`

Repeated sequences may become versioned candidate patterns. Candidate patterns remain hypotheses and can be weakened by later contradictory evidence.

## Incubation / Open Loop Engine
Questions and revisits that remain unresolved are preserved as open loops rather than treated as failures.

Later insight or distinction on the same node can form a possible incubation / re-encounter chain.

Elapsed time is part of the evidence because every event is located at a unique datetime point.

## Effort-to-Ease Engine
`Got it` is not treated as the end of learning.

The user may optionally record a state only when something noticeably changes from effortful to easier or more natural. Repeated state marks can support tentative effort-to-ease traces.

The system must never force a rating after every session.

## Pattern Engine
The Pattern Engine works from durable evidence and reconstructible traces.

It may examine:
- repeated transformation sequences
- grounding followed by later distinction/insight
- question -> revisit -> later insight
- effort -> ease changes
- context-sensitive differences

Patterns must include model version, evidence count, and uncertainty. They are not permanent learner profiles.

## Growth View — How You Changed
Growth is broader than time spent or test score.

Possible observations include:
- questions becoming more specific
- more distinctions being noticed
- more explicit connections being created
- unresolved questions being revisited
- abstract ideas gaining concrete grounding routes
- previously effortful processing becoming easier
- richer external working-memory snapshots

The Growth View is a projection of historical evidence, not a separate source of truth.

## Data portability and upgrade contract
Portable bundles include:
- Durable Core
- Cognitive v4 extension
- Cognitive v5 extension
- compatibility metadata

### Non-negotiable upgrade rules
1. UI is replaceable; evidence is not.
2. Durable IDs, timestamps and original source records survive redesigns.
3. New features are additive whenever possible.
4. Later interpretations, reframes and hypotheses never destroy original evidence.
5. Derived analyses are versioned and rebuildable.
6. Unknown fields must survive export/import where practical.
7. Migrations are explicit and recorded.
8. Before a destructive schema change, preserve a raw snapshot.
9. Backward compatibility is a product feature.
10. Frequent upgrades should enrich old data rather than invalidate it.

## Master rule
**Evidence is durable. Hypotheses are replaceable. UI is replaceable.**
