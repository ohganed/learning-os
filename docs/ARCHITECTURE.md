# Learning OS Architecture v3

## Product principle
The surface should stay quiet. The underground system should become richer over time.

Learning OS is not a study timer. It is a durable record of how knowledge, questions, distinctions, connections, and thoughts develop through time.

## Intellectual foundations translated into system behavior
- Bennett: TIME — where did a finite part of life become learning?
- Todd: HOW — what learning patterns actually work for this person?
- Toyama: BECOMING — ideas may incubate, disappear, reappear, and change.
- Kurashita: EXTERNAL MIND — small records, thoughts, and links become tools for thinking.
- Langer: MINDFUL DISTINCTION — notice difference, context, alternative views, and avoid premature closure.

## Underground model
The durable core is split into four stores:

1. `nodes`
   - Arbitrary-depth learning hierarchy.
   - Example: English > Pronunciation > v/f > voiced/unvoiced contrast.
   - UI labels such as Area / Thread / Topic are views, not hard database limits.

2. `sessions`
   - Containers for periods of deliberate learning.
   - Start/end timestamps, node context, content, position, duration.

3. `records`
   - Append-first Atomic Learning Records.
   - Each record owns a full ISO timestamp.
   - Types include: session_start, session_end, gotit, question, surprise, distinction, revisit, thought, reflection, connection.
   - Older thinking should not be overwritten merely because current thinking changed.

4. `relations`
   - Typed links between learning nodes or records.
   - A relation may include `why`, because the reason for a connection is part of the user's thinking.

## Views derived from the same data
- Learning Map: what am I learning?
- Timeline: what happened at a particular point in time?
- Thoughts & Connections: how is my external mind developing?
- Where your time went: what did a selected period of life become?

These views must be projections of the durable core, not separate databases.

## Upgrade rule
Never make a UI representation the canonical data model. UI will change frequently; durable IDs, timestamps, records, nodes, sessions, and relations must survive those changes.
