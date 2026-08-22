# Grinder / Bandler design layer for Learning OS

## Purpose
Learning OS uses selected process ideas from the work of John Grinder and Richard Bandler as design lenses, not as a claim that NLP as a whole is a scientifically validated theory of learning or therapy.

The emphasis here is specifically on Grinder's linguistic precision, modeling, calibration, context, process-over-content, and preservation of choice; and on Bandler's attention to transformations and the differences that change results.

The app must not become a coach that imposes interpretations. It should become better at recovering structure from vague language, observing learning processes, and helping the user generate distinctions and choices.

## 1. Language is a map, not the learning territory
A sentence written by the learner is a representation of experience. Do not silently promote it into an objective fact or identity claim.

Example:
`I am bad at English pronunciation.`

Preserve the original statement verbatim, but allow its experiential structure to be specified:
`English > Pronunciation > connected speech > distinguishing v/f in unfamiliar words`

The original statement remains part of history. Specification creates additional records; it does not overwrite the learner's words.

## 2. Meta-Model-inspired Specification Engine
When language loses useful information through broad generalization, missing referents, unspecified processes, comparisons without standards, or vague modal language, Learning OS may offer one quiet precision prompt.

Examples:
- `I don't understand physics.` -> `Which part, specifically?`
- `Pronunciation is difficult.` -> `What becomes difficult?`
- `I always forget this.` -> `Always, or in particular situations?`
- `This method is better.` -> `Better for what?`
- `I can't do it.` -> `What happens when you try?`

Rules:
- Never interrogate the learner with a chain of questions.
- Never treat the prompt as therapy.
- Preserve the unspecific original language.
- A specification is a new observation/interpretation record linked to the original.
- Prefer one useful question over exhaustive linguistic parsing.

## 3. Separate language levels underground
Where useful, Atomic Learning Records can distinguish:
- `raw_expression`: exactly what the learner said/wrote
- `observation`: directly reported or measured event
- `interpretation`: meaning assigned to an observation
- `generalization`: broader claim inferred from cases
- `question`: missing information or uncertainty
- `specification`: a more precise description
- `alternative_description`: another valid linguistic framing

Do not force the user to select these categories in the surface UI. They are underground distinctions.

## 4. Process over content
Grinder's later New Code work emphasizes process patterns rather than imposing content solutions. Learning OS should therefore ask not only WHAT was learned, but what sequence transformed the learner's state or performance.

Example transformation trace:
`confused -> compared two examples -> noticed contrast -> tried own example -> insight`

This is more reusable than storing only `understood v/f`.

The engine should be able to detect repeated process sequences without claiming causality prematurely.

## 5. Modeling: discover competence before explaining it
When something works unusually well, do not immediately explain why from a theory. First preserve the observable sequence and context.

Possible model record:
- context
- starting state
- task
- sequence of actions/representations
- distinctions noticed
- feedback available
- transition events
- outcome/evidence

Only after repeated evidence should the system propose a candidate pattern.

A candidate pattern remains a hypothesis and can be contradicted by later records.

## 6. Calibration before interpretation
Learning OS should privilege changes that can be observed in its own data:
- question -> distinction
- repeated error -> later correct discrimination
- long hesitation -> later fluent response
- revisit -> insight
- representation change -> performance change

Do not infer hidden psychological states merely because an event occurred. Store uncertainty and confidence with derived patterns.

## 7. Context is part of meaning
A strategy is not globally `good` or `bad`. Store the context in which it appeared useful.

`diagram helped`
is weaker than:
`diagram helped distinguish force directions in inclined-plane problems after verbal explanation had stalled.`

This prevents Learning OS from turning successful episodes into fixed learner types.

## 8. Choice and flexibility are preferred outcomes
The system should not optimize toward one prescribed learning method. A richer repertoire of workable responses in context is preferable.

If the learner is stuck, possible prompts can invite a representation/process shift:
- `More specific?`
- `What changes between these two examples?`
- `Try the opposite case?`
- `Can this be drawn?`
- `Can you produce your own example?`
- `What happens just before you get stuck?`

Suggestions are experiments, not prescriptions.

## 9. Know-nothing principle for the engine
Do not let the engine's previous model of the learner dominate new evidence. Historical patterns can generate hypotheses, but the current event must be allowed to contradict them.

Implementation consequence:
`user_model` should be probabilistic/versioned and derived from durable events, never a permanent profile such as `visual learner`, `poor memory`, or `bad at grammar`.

## 10. Inductive pattern discovery
Where possible, let patterns become visible through experience before naming them. The system can resurface two or three related learning episodes and let the learner notice the common structure.

Only afterward may it offer a tentative label such as:
`Comparison seems to precede many of your distinction events in pronunciation.`

This supports discovery rather than merely delivering a rule.

## 11. Bandler transformation lens
For meaningful transitions, ask underground:
`What changed between state/event A and state/event B?`

Store candidate difference-makers as relations rather than conclusions.

Example:
`? -> minimal-pair comparison -> distinction -> self-produced examples -> gotit`

Across repeated traces, the Pattern Engine may estimate which transformations are associated with useful outcomes for this learner in this context.

## 12. Relation to the rest of Learning OS
- Bennett: finite life-time and where it went.
- Todd: disciplined learning practice and how the learner learns.
- Toyama: incubation, forgetting, re-encounter, emergence.
- Kurashita: externalized atomic thought and connection.
- Langer: novel distinctions, context, alternatives, resistance to premature closure.
- Grinder: linguistic precision, modeling, calibration, context, process, choice.
- Bandler: transformation structure and difference-making changes.

Together these should support a cycle such as:
`Experience -> Capture -> Specify -> Distinguish -> Connect -> Experiment -> Observe change -> Model tentatively -> Revisit`

## Durable data requirements
Future schema versions should be able to add, without breaking old records:
- `raw_expression`
- `linguistic_role`
- `specified_from_record_id`
- `context_snapshot`
- `process_trace`
- `candidate_pattern`
- `pattern_confidence`
- `contradicting_evidence`
- `state_transition`
- `difference_maker`
- `model_version`

All derived interpretations must be reconstructible from durable source records where practical. Never delete historical evidence simply because the model changes.
