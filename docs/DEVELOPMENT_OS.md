# Development OS v1.0 — Learning OS Engineering Policy

Status: Adopted for new work; implementation of teacher-facing learning engine remains a separate milestone.

## Purpose
Combine Ponytail's minimum-necessary-code heuristic, design-os usability discipline, and Evidence Gate verification for Learning OS and future Reading OS integrations.

## Decision sequence
1. Inspect current architecture, data contracts, and tests before changing code.
2. State one observable learner/teacher outcome and the smallest scope that achieves it.
3. Reuse current modules and records when semantics match; do not force unrelated domains into a shared abstraction.
4. Keep the user interface calm, accessible, and usable on iPad/iPhone and classroom projectors.
5. Implement the smallest coherent change, with tests for normal, boundary, and failure cases.
6. Report evidence: changed files, tests run, results, unverified areas, rollback strategy.

## Non-negotiable protections
- Preserve original learning records, stable IDs, timestamps, export/import compatibility and model versions.
- Keep stored evidence separate from inferred learner hypotheses; never equate error patterns with clinical diagnoses or motivation.
- Introduce school, teacher, learner and administrator access controls before storing student data in a multi-user service.
- Isolate each school's data; use least-privilege roles and audit high-impact actions.
- Never omit privacy, accessibility, security, migration, or regression tests merely to reduce lines of code.
- Do not claim a feature is tested or deployed without corresponding evidence.

## Relationship to existing Learning OS
The current app is a personal, browser-based learning-history system with Durable Core (nodes, sessions, records, relations) and versioned cognitive extensions. Preserve that product and its backups.

A future teacher-first platform needs an additive, separately versioned **Learning Engine** with four responsibilities:
- Response Analysis: grade against explicit rubrics and tag observable misconceptions, retaining uncertainty.
- Next Question Selection: select items using mastery evidence, prerequisites, and teacher constraints.
- Review Scheduling: choose revisits based on retrieval history, spacing, and configurable limits.
- Domain Adapters: high-school physics first; Reading OS later. Keep subject-specific grading outside the core engine.

Do not treat existing personal-learning records as student submissions without a deliberate migration or mapping contract.

## Evidence Gate for every change
| Gate | Minimum evidence |
| --- | --- |
| Scope | Requirement, existing behavior, risk and smallest-change rationale |
| Design | Screen states, accessibility, teacher workflow when applicable |
| Data | Schema compatibility, migration and backup behavior |
| Verification | Exact executed checks with pass/fail results |
| Release | Clear unverified areas and rollback instructions |

## Initial implementation milestones
1. Define versioned domain contracts for Item, Attempt, Analysis, LearnerState, ReviewDue, Recommendation and AuditEvent.
2. Add pure, deterministic response-analysis / question-selection / scheduling modules and unit tests with controlled clocks.
3. Implement a small high-school physics prototype covering force diagrams and equations for two interacting objects.
4. Offer a teacher review and override path; record why an item was recommended.
5. Integrate Reading OS through an adapter after contract tests pass.
6. Add authentication, tenant isolation, authorization, audit logs and operational testing before any real-school deployment.

## Minimum-change rule
Prefer deleting duplication or changing an existing function over introducing a new abstraction, **only if** the resulting behavior and contracts remain clear. A smaller diff is a means, not a quality metric.

## Reporting template
- Outcome:
- Files changed:
- Reuse / new abstractions:
- Tests actually executed:
- Risks and unverified behavior:
- Next safe increment:
