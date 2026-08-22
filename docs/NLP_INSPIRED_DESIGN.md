# NLP-inspired design principles for Learning OS

Learning OS borrows a small number of useful design heuristics associated with Neuro-Linguistic Programming (NLP), without treating NLP as a scientifically validated theory of learning or therapy.

The purpose is not to make the app a coach, therapist, or persuasion system. The purpose is to improve how the system represents learning experiences and helps the user notice alternative interpretations.

## 1. The map is not the territory
A stored note, label, score, or interpretation is a representation of an experience, not the experience itself.

System consequences:
- Never treat one self-rating or one record as the final truth about ability.
- Preserve the original observation separately from later interpretations.
- Allow multiple interpretations of the same learning event.
- Prefer language such as `current view`, `working interpretation`, or `in this context` over permanent labels.

## 2. Separate observation from interpretation
Example:
- Observation: `I answered 4 of 10 correctly.`
- Interpretation: `I do not understand irregular verbs.`

Store these separately whenever possible.

This helps Learning OS avoid turning temporary performance into identity.

## 3. Reframing as an optional cognitive move
A difficulty can sometimes be viewed from another useful frame.

Example:
- `I failed this question.`
- Alternative frame: `This question exposed the exact boundary of my current model.`

The app should never force positive reframing or overwrite the user's own description. A reframe is a second possible view, not a correction of the first.

Atomic record types may include:
- `reframe`
- `alternative_view`
- `context_shift`

Relations may include:
- `reframes`
- `contrasts_with`
- `applies_in_context`

## 4. Flexibility over one correct strategy
If one learning method repeatedly produces confusion, the system can help surface alternatives without declaring one universal learning style.

Examples:
- explanation -> example
- example -> diagram
- reading -> speaking
- abstract rule -> concrete case
- whole -> parts
- parts -> whole

Do not infer fixed VAK / visual-auditory-kinesthetic learner identities. Instead record which representations or actions were useful in which specific contexts.

## 5. Chunking up and chunking down
Learning can move between levels.

Chunk down:
`English > Pronunciation > v/f > voicing > one minimal pair`

Chunk up:
`v/f > voiced/unvoiced contrast > phonological contrasts > pronunciation`

The hierarchy must therefore support arbitrary depth and easy movement between specific examples and larger concepts.

## 6. Outcome and evidence are different
A desired outcome should be stored separately from evidence that it has been reached.

Example:
- Outcome: `hear the difference between v and f naturally`
- Evidence: `correctly distinguish 9 of 10 unfamiliar examples`

This prevents vague goals from being mistaken for learning progress.

## 7. State and context are metadata, not identity
If useful and voluntarily recorded, a learning event may carry contextual metadata such as:
- location
- surrounding activity
- perceived energy
- perceived concentration
- before/after another activity

The engine may later detect patterns, but it must not convert temporary states into permanent labels about the person.

## 8. Preserve choice
Prompts should open possibilities rather than pressure the user.

Useful quiet prompts include:
- `Another way to see this?`
- `What changes if the context changes?`
- `More specific?`
- `What larger idea might this belong to?`
- `What would count as evidence?`

These prompts should appear sparingly and be dismissible.

## Underground support
The durable model should be able to support, even when the UI does not expose everything yet:
- observation vs interpretation
- original thought vs later reframe
- multiple perspectives on one record
- arbitrary chunk depth
- context-dependent strategy history
- outcome + evidence links
- state/context metadata

All such additions must be append-first or migration-safe so older data remains valid.
