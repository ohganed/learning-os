# Grounding Cognition Layer

Learning OS treats Grounding Cognition (Pecher / Zwaan and the broader grounded-cognition tradition) as a design lens, not as a claim that every concept is reducible to sensorimotor representation.

## Principle

A concept should be allowed to connect across multiple representations:

- verbal / symbolic
- concrete situation and example
- visual / spatial structure
- action / experiment / manipulation
- comparison / contrast / exception
- personal or environmental context when useful

The system should support movement in both directions:

`abstract <-> concrete`

Grounding is therefore an additional route to understanding, not a replacement for abstraction.

## Durable data

Grounding observations are additive evidence. They never overwrite a Learning Node or an Atomic Learning Record.

Each grounding record has its own stable id, timestamp, nodeId/sessionId context, schemaVersion, and optional fields for situation, visual/spatial representation, action, and contrast.

The core learning history remains independent of the grounding model. Future engines may reinterpret or replace grounding hypotheses without rewriting historical events.

## Grounding Engine

The engine may notice repeated question events on a node that has no saved grounding route and create a low-confidence `grounding_candidate` hypothesis.

This must never be translated into a learner label such as “visual learner,” “kinesthetic learner,” or a diagnosis. It only means that another representation may be worth trying for this concept in this context.

## UI rule

Grounding fields are optional and live below the ordinary learning surface. The user should not be required to fill out a modality checklist for every session.

## Relationship to other underground layers

- Working Memory: grounding can externalize complex relationships and reduce the amount that must be actively held.
- Langer / distinction: contrast is one grounding route.
- Grinder: vague verbal formulations can be specified into observable situations and processes.
- Bandler: changes following a grounding shift can become candidate transformation patterns.
- Jantzen / cognitive diversity: multiple routes are available without assigning fixed learner types.
- Kurashita / External Mind: grounded representations can become durable external thinking objects.

## Compatibility rule

Evidence is durable. Hypotheses are replaceable. UI is replaceable.

Never destroy old learning records because a future cognitive theory or implementation changes.