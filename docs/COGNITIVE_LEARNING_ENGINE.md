# Cognitive Learning Engine — Learning OS v4 direction

## Purpose
Learning OS should not merely count study sessions. It should preserve enough evidence to help a learner notice how learning actually changes across time, content, representation, context, and cognitive load.

The surface remains quiet. The underground becomes richer.

## Intellectual foundations
- Arnold Bennett — finite life-time: where did a portion of life become learning?
- John Todd — intellectual practice: how is the learner actually learning?
- Shigehiko Toyama — incubation, forgetting, re-encounter, emergence.
- Tadanori Kurashita — external mind, atomic notes, connections, unfinished thought, timestamped development.
- Ellen Langer — mindful learning: novel distinctions, context, alternatives, resistance to premature closure.
- John Grinder — linguistic precision, specification, modeling, calibration, context, process, choice.
- Richard Bandler — transformation structure: what changed between A and B?
- John B. Arden — plasticity lens: focus/effort can, through repeated successful use, become easier and more fluent. Do not equate insight with mastery.
- Cornelia Jantzen — multiple routes to understanding; do not design around a fictional frictionless/standard learner. Treat representation mismatch as a possible source of difficulty.
- Gathercole & Alloway — working memory is a limited mental workspace. Difficulty may be overload rather than lack of intelligence or effort. Externalize what need not be held internally.
- Thomas E. Brown — executive functions form a context-sensitive self-management system. Activation, focus, effort, emotion, memory and action can each become friction points. Do not reduce failure to motivation.
- Daniel G. Amen — use only the broad systems insight that learning state is embodied and context-sensitive. Sleepiness, fatigue, stress, movement and other self-reported conditions may be useful context; do not perform brain typing, SPECT-style diagnosis, or medical inference.

## Core principle: no frictionless learner
Do not divide the product into a normal learner and an accessibility learner.

Difficulty is better represented as a contextual interaction:

`difficulty = f(person, content, representation, prior knowledge, working-memory load, executive-function demand, state, environment, time)`

This is a hypothesis-generating model, not a diagnostic equation.

## Durable event model
Every meaningful learning event owns a full timestamp and can carry optional, additive metadata. Existing records remain valid when new fields are introduced.

Useful future-compatible fields include:
- `raw_expression`
- `representation` (text, audio, diagram, example, comparison, action, whole-context, other)
- `context_snapshot`
- `workspace_snapshot_id`
- `friction_kind`
- `transition_from_record_id`
- `transition_to_record_id`
- `difference_makers`
- `effort_signal`
- `ease_signal`
- `executive_function_signal`
- `derived_by_engine_version`
- `confidence`

Never require all fields. Sparse records are first-class records.

## 1. External Working Memory
For long books and complex problems, Learning OS should reduce unnecessary internal holding demands without reducing intellectual difficulty.

A workspace snapshot may contain:
- current claim/problem
- concepts currently being held
- prerequisites/references
- unresolved questions
- current hypothesis
- connections
- source position/page
- next useful return point

A learner should be able to stop and later restore the *mental context*, not merely reopen a page number.

## 2. Working Memory Guardian
Look for evidence of possible overload without diagnosing it:
- rapid repeated questions
- repeated rereading/returning if measurable
- many unresolved references at once
- abrupt session abandonment after complexity rises
- learner explicitly says "too much to hold"

A quiet intervention may offer to externalize or split the structure. Never say the learner has poor working memory.

## 3. Executive Function Support Layer
Treat these as situational dimensions, not traits:
- activation — getting started / organizing the entry point
- focus — maintaining or shifting attention
- effort — sustaining cognitive energy and alertness
- emotion — emotional interference with learning activity
- memory — using working memory and retrieving what is needed
- action — regulating and adjusting the learning action

The product should reduce operational burden where possible: restore context, preserve open questions, provide a clear return point, and keep side explorations connected to the main thread.

## 4. Cognitive Friction Engine
When learning stalls, preserve the event and look for contextual friction rather than assigning a personal deficit.

Possible friction categories are provisional:
- conceptual
- representation
- working_memory
- retrieval
- attention_shift
- activation
- effort
- emotional
- environment
- unknown

`unknown` is important. The engine is allowed not to know.

## 5. Representation Shift
A learning node can be encountered through multiple representations: text, sound, diagram, comparison, concrete example, self-production/action, or whole context.

Record representation changes around meaningful transitions, e.g.:
`question -> text -> diagram -> distinction -> own example -> gotit`

Do not infer a fixed learning style. A representation that helps one concept today may not help another tomorrow.

## 6. Plasticity / Effort-to-Ease
Do not treat `gotit` as completion.

Track evidence that something formerly effortful becomes easier across re-encounters:
`unclear -> distinction -> understood -> effortful use -> easier use -> stable re-encounter`

Ease is contextual and reversible. It should be inferred tentatively and preferably confirmed through later evidence.

## 7. Incubation and Re-encounter
A gap is not automatically failure. Preserve unresolved questions and unfinished thoughts so that later events can be linked to them.

Potential transformation:
`question(t1) -> interval -> re-encounter(t2) -> distinction/insight(t3)`

The interval itself is not claimed to cause the insight. The system records temporal structure and leaves causality open.

## 8. Connection + Distinction
Knowledge networks need both:
- `How is this connected?`
- `How is this different?`

Typed relations should be preferred over indiscriminate linking when the learner can express the reason: similar_to, contrasts_with, prerequisite_for, example_of, exception_to, reframes, evidence_for, applies_in_context.

AI may surface candidates, but should not create a dense network that the learner never mentally formed.

## 9. Language Precision Layer
Preserve the learner's original wording. If it is broad (`I don't understand physics`), the system may invite one useful specification (`Which part, specifically?`). A more precise description is added, not substituted.

Never turn temporary language into identity metadata such as `bad at memory`, `visual learner`, `unmotivated`, or `poor at mathematics`.

## 10. Pattern Engine
Patterns are derived hypotheses, never canonical facts about the person.

Examples:
- comparison often precedes distinction events in pronunciation
- workspace snapshots are followed by faster resumptions in long-form reading
- a representation shift is frequently present between question and insight for one topic family

Every pattern should retain:
- evidence record IDs
- counter-evidence record IDs
- context scope
- confidence
- engine/model version
- created/updated timestamps

New evidence may weaken or retire a pattern.

## 11. Embodied Learning Context
If the learner voluntarily records state, store it as context only: sleepy, tired, energetic, tense, calm, hungry, etc. Never infer illness, diagnosis, brain region activity, or medical treatment.

The engine may say: `In this material, sessions marked tired have contained more rereading.` It must not say: `Your brain works poorly at night.`

## 12. Growth
Growth is broader than accumulated knowledge. Possible evidence includes:
- a concept becomes easier to use
- vague difficulty becomes precisely specified
- learner finds useful distinctions
- learner creates meaningful connections
- learner can restore and continue complex thought after interruption
- learner develops more than one workable route through a problem
- learner revises an earlier interpretation without erasing it
- learner increasingly notices and manages cognitive friction

This supports a future derived view: `How you changed`.

## Surface rules
Do not expose this engine as a dashboard full of scores. Prefer rare, contextual prompts such as:
- `More specific?`
- `Too much to hold at once?`
- `See it another way?`
- `What changed?`
- `What does this connect to?`
- `What is different?`
- `Save this mental context for later?`

One useful prompt is better than an interrogation.

## Compatibility rules
1. Old source records are never rewritten to fit a new theory.
2. Derived analysis is versioned and rebuildable.
3. Schema evolution is additive whenever possible.
4. Unknown fields must survive export/import.
5. UI state is never canonical learning data.
6. Migrations are explicit and recorded.
7. Before destructive schema change, preserve a raw snapshot.
8. No diagnostic labels are persisted as learner identity.
